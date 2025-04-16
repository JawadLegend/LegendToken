require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const ALCHEMY_SEPOLIA_URL=process.env.ALCHEMY_SEPOLIA_URL ;
const SEPOLIA_PRIVATE_KEY=process.env.SEPOLIA_PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork: "hardhat",
  networks: {
      hardhat: {
          chainId: 31337,
      },
      localhost: {
          chainId: 31337,
      },
      sepolia: {
          url: ALCHEMY_SEPOLIA_URL,
          accounts: SEPOLIA_PRIVATE_KEY !== undefined ? [SEPOLIA_PRIVATE_KEY] : [],
      
          saveDeployments: true,
          chainId: 11155111,
      },
},
}