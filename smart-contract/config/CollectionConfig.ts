import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME
  // Please DO NOT change it manually!
  contractName: "MyNFTContract",
  tokenName: "My NFT Contract",
  tokenSymbol: "MNC",
  hiddenMetadataUri: "ipfs://__CID__/hidden.json",
  urlPrefix: "ipfs://__CID__/",
  maxSupply: 10,
  maxHoldableItems: 7,
  whitelistSale: {
    price: 0,
    maxMintAmountPerTx: 1,
    additionalSupply: 0,
    saleStatus: 1,
  },
  phaseOneSale: {
    price: 0.7,
    maxMintAmountPerTx: 7,
    additionalSupply: 10,
    saleStatus: 2,
  },
  phaseTwoSale: {
    price: 0.8,
    maxMintAmountPerTx: 7,
    additionalSupply: 40,
    saleStatus: 3,
  },
  phaseThreeSale: {
    price: 0.9,
    maxMintAmountPerTx: 7,
    additionalSupply: 40,
    saleStatus: 4,
  },
  contractAddress: "",
  openSeaLink: "",
  raribleLink: "",
  whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
