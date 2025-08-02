const hre = require("hardhat");

async function main() {
  const GameUserMarketplace = await hre.ethers.getContractFactory("GameUserMarketplace");
  const contract = await GameUserMarketplace.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract address (Sepolia):", await contract.getAddress());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
