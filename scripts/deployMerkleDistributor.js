require('dotenv').config()
require('@nomiclabs/hardhat-ethers')
const {ethers, hre} = require('hardhat')

async function main() {
    const MerkleDistributor = await ethers.getContractFactory('MerkleDistributor')
    console.log("deploying merkleDistributor")
    const merkleDistributor = await MerkleDistributor.deploy('0x65D3A76B37599523115526793C739A0305D77a6D', '0x9b062234df59241f931afddb63dd961238d4256fe88705c8d9a0c3d535c19df6')
    console.log(merkleDistributor)
    await merkleDistributor.deployed()
    console.log(`merkleDistributor deployed at ${merkleDistributor.address}`)

    await hre.run("verify:verify", {
        address: merkleDistributor.address, contract: "../contracts/MerkleDistributor.sol:MerkleDistributor"
    })
}

main()
    // eslint-disable-next-line no-process-exit
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        // eslint-disable-next-line no-process-exit
        process.exit(1)
    })
