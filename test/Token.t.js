const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LegendToken", function () {
  let LegendToken, legendToken, deployer, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers
    LegendToken = await ethers.getContractFactory("LegendToken");
    [deployer, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    legendToken = await LegendToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the correct name and symbol", async function () {
      expect(await legendToken.name()).to.equal("Legend");
      expect(await legendToken.symbol()).to.equal("LGD");
    });

    it("Should set the correct decimals", async function () {
      expect(await legendToken.decimals()).to.equal(18);
    });

    it("Should mint the total supply to the deployer", async function () {
      const totalSupply = ethers.parseUnits("220000000000", 18); // 220 billion * 10^18
      expect(await legendToken.totalSupply()).to.equal(totalSupply);
      expect(await legendToken.balanceOf(deployer.address)).to.equal(totalSupply);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const amount = ethers.parseUnits("1000", 18); // 1000 tokens

      // Transfer 1000 tokens from deployer to addr1
      await legendToken.transfer(addr1.address, amount);
      expect(await legendToken.balanceOf(addr1.address)).to.equal(amount);
      expect(await legendToken.balanceOf(deployer.address)).to.equal(
        ethers.parseUnits("220000000000", 18) - amount
      );

      // Transfer 500 tokens from addr1 to addr2
      await legendToken.connect(addr1).transfer(addr2.address, ethers.parseUnits("500", 18));
      expect(await legendToken.balanceOf(addr1.address)).to.equal(ethers.parseUnits("500", 18));
      expect(await legendToken.balanceOf(addr2.address)).to.equal(ethers.parseUnits("500", 18));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialBalance = await legendToken.balanceOf(addr1.address);
      await expect(
        legendToken.connect(addr1).transfer(deployer.address, 1) // addr1 has 0 tokens
      ).to.be.revertedWithCustomError(legendToken, "ERC20InsufficientBalance");
      expect(await legendToken.balanceOf(addr1.address)).to.equal(initialBalance);
    });
  });
});