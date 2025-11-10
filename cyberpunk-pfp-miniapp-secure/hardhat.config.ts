import { config as dotenv } from "dotenv"; dotenv();
import "@nomicfoundation/hardhat-toolbox";

module.exports = {
  solidity: "0.8.21",
  networks: {
    baseMainnet: { url: process.env.RPC_BASE_MAINNET, accounts: [process.env.DEPLOYER_PK || ""] },
    baseSepolia: { url: process.env.RPC_BASE_SEPOLIA, accounts: [process.env.DEPLOYER_PK || ""] },
  },
};
