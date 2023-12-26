import { ethers, upgrades } from "hardhat";

async function main() {
  const tokenName = "Test Token Upgradeable";
  const tokenSymbol = "TTU";

  const TestTokenUpgradeableFactory = await ethers.getContractFactory("TestTokenUpgradeable");
  const contract = await upgrades.deployProxy(TestTokenUpgradeableFactory, [tokenName, tokenSymbol], { initializer: 'initializeContract' });
  const testAddress = await contract.getAddress();
  console.log("Contract deployed to address:", testAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
