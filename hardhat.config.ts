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

const chainIds = {
  coston: 16,
  ganache: 1337,
  goerli: 5,
  hardhat: 31337,
  kovan: 42,
  mainnet: 1,
  rinkeby: 4,
  ropsten: 3,
  songbird: 19,
  flare: 14,
  mumbai: 80001,
  xrpEVM: 1440001
};

const MNEMONIC = process.env.MNEMONIC || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
const INFURA_API_KEY = process.env.INFURA_API_KEY || "";
const COSTON_RPC_URL = process.env.COSTON_RPC_URL_HTTP || "";
const sgbURL: string = "https://songbird-api.flare.network/ext/C/rpc";
const flareURL: string = "http://54.205.157.186:9650/ext/bc/C/rpc";
const costonURL: string = "https://coston-api.flare.network/ext/bc/C/rpc";
const mumbaiURL: string = "https://polygon-mumbai-bor.publicnode.com";


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
      chainId: chainIds.hardhat,
    },
    eth: createInfuraConfig("mainnet", 1),
    ethfork: createInfuraForkConfig("mainnet", 1),
    goerli: createInfuraConfig("goerli", 5),
    goerlifork: createInfuraForkConfig("goerli", 5),
    kovan: createInfuraConfig("kovan", 42),
    kovanfork: createInfuraForkConfig("kovan", 42),
    sepolia: createInfuraConfig("sepolia", 11155111),
    sepoliafork: createInfuraForkConfig("sepolia", 11155111),
    ropsten: createInfuraConfig("ropsten", 3),
    ropstenfork: createInfuraForkConfig("ropsten", 3),
    sb: createCustomRPCConfig(19, sgbURL),
    sbFork: createCustomRPCForkConfig(19, sgbURL),
    coston: createCustomRPCConfig(16, costonURL),
    flare: createCustomRPCConfig(14, flareURL),
    mumbai: createCustomRPCConfig(80001, mumbaiURL)
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
