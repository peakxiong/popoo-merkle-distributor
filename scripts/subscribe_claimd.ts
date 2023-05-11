import {ethers} from "ethers"
import {load} from "ts-dotenv";
import {HttpNetworkConfig} from "hardhat/src/types/config";
import MD_abi from "./MerkelDistributor";
import her from "hardhat";
import {reportTransferEvent} from "./request_factory";

const env = load({
    PK_POPOO: String,
    MD_ADDRESS: String,
});
const hardhat_config = her.config.networks["bsc_testnet"] as HttpNetworkConfig;
const provider = new ethers.providers.JsonRpcProvider("url" in hardhat_config ? hardhat_config.url : "");

async function listenEvent() {
    const wallet = new ethers.Wallet(env.PK_POPOO, provider)
    const contract = new ethers.Contract(env.MD_ADDRESS, MD_abi, provider)
    const contractSign = contract.connect(wallet)

    contractSign.on("Claimed", (index, account, amount, event) => {
        const data = {
            "index": index.toString(),
            "account": account,
            "amount": amount.toString(),
            "txHash": event.transactionHash,
            "event": JSON.stringify(event)
        }
        console.log(data)
        reportTransferEvent(data).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    });
}

if (require.main === module) {
    listenEvent().catch((error) => {
        console.log(error);
        process.exitCode = 1;
    });
}