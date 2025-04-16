const { ethers } = require("hardhat");


async function main() {

    const tokenAddress ="0x152F60112ad0B6c82Af292Ce0952EC0beB4FF97f";
    const recipient ="0x4804f9097235Cb8470d7a808f96e13AFd4257984" ;
    const amount = await ethers.parseUnits("100", 18);

    const Token = await ethers.getContractFactory("LegendToken");
    const token = await Token.attach(tokenAddress);
    const [deployer] = await ethers.getSigners();

    console.log(`Transferring ${amount} LGD to`, recipient);
    const tx = await token.transfer(recipient, amount);
    await tx.wait();

    console.log("Transfer complete!");

}

main()
     .then(() => process.exit(0))
     .catch((error) => {
        console.error(error);
        process.exit(1);
     });