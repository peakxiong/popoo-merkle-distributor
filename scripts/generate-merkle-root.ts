import {ethers} from "ethers"
import {getBalances, reportMerkleData} from "./request_factory";
import {parseBalanceMap} from "../src/parse-balance-map";
import her from "hardhat";
import {load} from "ts-dotenv";
import {HttpNetworkConfig} from "hardhat/src/types/config";
import MD_abi from "./MerkelDistributor";
import * as schedule from "node-schedule";


const hardhat_config = her.config.networks["bsc_testnet"] as HttpNetworkConfig;
const provider = new ethers.providers.JsonRpcProvider("url" in hardhat_config ? hardhat_config.url : "");

const env = load({
    PK_POPOO: String,
    MD_ADDRESS: String,
});

function get_random_float() {
    const max = 100
    const min = 30
    const result = Math.random() * (max - min) + min
    return String(result)
}

function gengrate_json() {
    return {
        "0xD98Ab04B56b99C0966742684dB06bF24E326C3db": String(ethers.utils.parseEther(get_random_float()).toBigInt()),
        "0x2917115014beea46CA2d6aD3935c26C21439Fbc2": String(ethers.utils.parseEther(get_random_float()).toBigInt()),
        "0x9E9aD3E273749C91BD2Af49B305B270378683EBD": String(ethers.utils.parseEther(get_random_float()).toBigInt()),
        "0x9F0A64c6956D7205E883ae8A3C19577f1cadD78F": String(ethers.utils.parseEther(get_random_float()).toBigInt()),
        "0xB96cE59522314ACB1502Dc8d3e192995e36439c1": String(ethers.utils.parseEther(get_random_float()).toBigInt()),
        "0x5A553d59435Df0688fd5dEa1aa66C7430541ffB3": String(ethers.utils.parseEther(get_random_float()).toBigInt())
    }
}


async function main() {
    getBalances().then((res: any) => {
        console.log(res)
        if (res.code != 0) throw new Error('Invalid Data')

        console.log(res.data)
        const json = JSON.parse(JSON.stringify(res.data))
        // const json = JSON.parse(JSON.stringify(gengrate_json()))
        if (typeof json !== 'object') throw new Error('Invalid JSON')
        const merkel_json = parseBalanceMap(json)
        console.log(JSON.stringify(merkel_json))
        const wallet = new ethers.Wallet(env.PK_POPOO, provider)
        const contract = new ethers.Contract(env.MD_ADDRESS, MD_abi, wallet)
        contract.setMerkleRoot(merkel_json.merkleRoot).then((tx: any) => {
            tx.wait().then((tx_res: any) => {
                console.log(tx_res)
                reportMerkleData(merkel_json).then((res: any) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err: any) => {
                console.log(err)
            })
        }).catch((err: any) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

main().catch((error) => {
    console.log(error);
});

// if (require.main === module) {
//     schedule.scheduleJob('5 0 * * * *', function () {
//         console.log('scheduleCronstyle:' + new Date());
//         main().catch((error) => {
//             console.log(error);
//         });
//     });
// }