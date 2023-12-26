import { ethers } from "hardhat";

async function main() {
  const tokenName = "Test Token";
  const tokenSymbol = "TT";

  const TestTokenFactory = await ethers.getContractFactory("TestToken");
  const contract = await TestTokenFactory.deploy(tokenName, tokenSymbol);
  const testAddress = await contract.getAddress();
  console.log("Contract deployed to address:", testAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
