require("dotenv").config();

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");


module.exports = {
    defaultNetwork: "bsc_testnet",
    networks: {
        localhost: {
            url: process.env.RPC_URL || "http://localhost:8545",
            timeout: 180000000,
            gas: 12000000,
        },
        bsc_testnet: {
            url: "https://data-seed-prebsc-1-s3.binance.org:8545/",
            // url: "https://bsc-testnet.nodereal.io/v1/f7c78bdb88e342a390c4427d49a00701",
            chainId: 97,
            allowUnlimitedContractSize: true,
            accounts: [
                process.env.PK_POPOO,
            ],
        },
        bsc: {
            url: "https://bsc-mainnet.nodereal.io/v1/f7c78bdb88e342a390c4427d49a00701",
            chainId: 56,
        }
    },
    solidity: {
        compilers: [
            {
                version: "0.8.4",
            }, {
                version: "0.8.17",
            }, {
                version: "0.6.6",
            }, {
                version: "0.5.16",
            }, {
                version: "0.6.12",
            }, {
                version: "0.8.0",
            }, {
                version: "0.8.7",
            }, {
                version: "0.6.6",
            }, {
                version: "0.8.2",
            }, {
                version: "0.7.6",
            },
        ],
        settings: {
            optimizer: {
                enabled: false,
                runs: 999999,
            },
        },
    },
    mocha: {
        timeout: 2000000,
    },
    etherscan: {
        apiKey: "HKQ72BFRFXGUUI5JS7WJ8GYXMYF6PSF3AB",
    },
    gasReporter: {
        currency: 'USD',
        gasPriceApi: 'https://api.etherscan.io/api?module=proxy&action=eth_gasPrice',
        token: 'ETH',
    }
};
