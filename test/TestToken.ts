import { expect } from "chai";
import { ethers } from "hardhat";



describe("Deployment", async function () {
  let testAddress = "";
  // Contracts are deployed using the first signer/account by default
  it("Should Deploy The Contract", async function () {
    const [owner] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", owner.address);
    const TestTokenFactory = await ethers.getContractFactory("TestToken");
    const contract = await TestTokenFactory.deploy("Test Token", "TT");
    testAddress = await contract.getAddress();
    console.log("Contract deployed to address:", testAddress);
    console.log("Checking balance before mint");
    const balance = await contract.balanceOf(testAddress);
    console.log("Balance before mint:", balance);
    expect(balance).to.equal(0);

 
    const formattedAmount = ethers.parseEther("10000");
    await contract.mint(owner.address, formattedAmount);
    const balance2 = await contract.balanceOf(owner.address);
    expect(balance2).to.equal(formattedAmount);
    console.log("Contract deployed to address:", await contract.getAddress());
  });

});
