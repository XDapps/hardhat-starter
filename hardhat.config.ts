import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
dotenvConfig({ path: resolve(__dirname, "./.env") });

import { HardhatUserConfig } from "hardhat/types";
import { NetworkUserConfig } from "hardhat/types";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-network-helpers";
import "@openzeppelin/hardhat-upgrades";
import "@typechain/hardhat";
import "hardhat-gas-reporter";


const MNEMONIC = process.env.MNEMONIC || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const sgbURL: string = "https://songbird-api.flare.network/ext/C/rpc";
const flareURL: string = "https://flare-api.flare.network/ext/bc/C/rpc";


function createInfuraConfig(network: string, chainId: number): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainId,
    url,
    gas: 2100000,
    gasPrice: 9000000000
  };
}
function createInfuraForkConfig(network: string, chainId: number): NetworkUserConfig {
  const url: string = "https://" + network + ".infura.io/v3/" + INFURA_API_KEY;
  return {
    forking: {
      url: url
    },
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainId,
    gas: 2100000,
    url,
    gasPrice: 9000000000
  };
}
function createCustomRPCConfig(chainId: number, rpcURL: string): NetworkUserConfig {
  const url: string = rpcURL;
  return {
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainId,
    url
  };
}
function createCustomRPCForkConfig(chainId: number, rpcURL: string): NetworkUserConfig {
  const url: string = rpcURL;
  return {
    forking: {
      url: url
    },
    accounts: {
      count: 10,
      initialIndex: 0,
      mnemonic: MNEMONIC,
      path: "m/44'/60'/0'/0",
    },
    url,
    chainId: chainId
  };
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      //  forking: {
      //   url: "https://goerli.infura.io/v3/33f6cca2bd884901ac2b121e9f479ebc"
      //  },
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 31337,
    },
    eth: createInfuraConfig("mainnet", 1),
    ethfork: createInfuraForkConfig("mainnet", 1),
    goerli: createInfuraConfig("goerli", 5),
    goerlifork: createInfuraForkConfig("goerli", 5),
    mumbai: createInfuraConfig("polygon-mumbai", 80001),
    mumbaifork: createInfuraForkConfig("polygon-mumbai", 80001),
    polygon: createInfuraConfig("polygon-mainnet", 137),
    polygonfork: createInfuraForkConfig("polygon-mainnet", 137),
    sepolia: createInfuraConfig("sepolia", 11155111),
    sepoliafork: createInfuraForkConfig("sepolia", 11155111),
    sb: createCustomRPCConfig(19, sgbURL),
    sbfork: createCustomRPCForkConfig(19, sgbURL),
    flare: createCustomRPCConfig(14, flareURL),
    flarefork: createCustomRPCForkConfig(14, flareURL)
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000
          }
        }
      }
    ],
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
  }
};

export default config;
