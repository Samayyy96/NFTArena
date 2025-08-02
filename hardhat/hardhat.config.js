// filepath: c:\Users\vedan\OneDrive\Desktop\hardhat starter\hardhat.config.js
require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    monad: {
      url: "https://monad-testnet.g.alchemy.com/v2/UPG4IHbFy8xexrPBdypWJ", // Replace with actual Monad RPC
      chainId: 10143, // Replace with Monad's chain ID
      accounts: [process.env.PRIVATE_KEY]
    },
     sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/AqqqcnFwTM8aaKzQEyLxw`,
      chainId: 11155111, // Sepolia's chain ID
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
