import { ethers, upgrades } from "hardhat";

async function main() {
  const tokenAddress = "0x054546"; // This will come from your original deployment script

  const TestTokenFactory = await ethers.getContractFactory("TestToken");
  const upgraded = await upgrades.upgradeProxy(tokenAddress, TestTokenFactory);
  console.log("Contract upgraded at address:", upgraded.getAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
