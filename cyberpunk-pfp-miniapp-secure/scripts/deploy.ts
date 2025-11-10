import { ethers } from "hardhat";

async function main() {
  const USDC = process.env.USDC_BASE_MAINNET!;
  const TREASURY = process.env.TREASURY_WALLET!;
  const Factory = await ethers.getContractFactory("CyberpunkPFP");
  const nft = await Factory.deploy(USDC, TREASURY);
  await nft.waitForDeployment();
  console.log("CyberpunkPFP deployed:", await nft.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
