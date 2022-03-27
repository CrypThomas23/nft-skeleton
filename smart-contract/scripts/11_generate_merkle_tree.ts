import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import CollectionConfig from "./../config/CollectionConfig";

async function main() {
  // Check configuration
  if (CollectionConfig.whitelistAddresses.length < 1) {
    throw (
      "\x1b[31merror\x1b[0m " +
      "The whitelist is empty, please add some addresses to the configuration."
    );
  }

  // Build the Merkle Tree
  const leafNodes = CollectionConfig.whitelistAddresses.map((addr) =>
    keccak256(addr)
  );
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = "0x" + merkleTree.getRoot().toString("hex");

  console.log('RootHash: ', rootHash)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
