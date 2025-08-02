const hre = require("hardhat");

async function main() {
  const GameUserMarketplace = await hre.ethers.getContractFactory("GameUserMarketplace");
  const contract = await GameUserMarketplace.deploy();
  await contract.waitForDeployment();
  console.log("✅ Contract address (Monad):", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
