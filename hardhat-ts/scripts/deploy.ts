// tslint:disable-next-line: no-implicit-dependencies
import { ethers } from 'hardhat';

async function main() {
  const NFT = await ethers.getContractFactory('Action');
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log('NFT Contract Deployed at ' + nft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});