const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const weiAmount = await ethers.provider.getBalance(deployer.address);
    
    console.log("Account balance:",  ethers.formatEther(weiAmount), "ETH");
  
    const Token = await ethers.getContractFactory("LegendToken");
    const token = await Token.deploy();
    await token.waitForDeployment(); // Ensures the contract is fully deployed 
    const tokenAddress = await token.getAddress()
    console.log("Token address:", tokenAddress);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
  });