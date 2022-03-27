interface SaleConfig {
  price: number;
  maxMintAmountPerTx: number;
  additionalSupply: number;
  saleStatus: number;
}
export default interface CollectionConfigInterface {
  contractName: string;
  tokenName: string;
  tokenSymbol: string;
  hiddenMetadataUri: string;
  urlPrefix: string;
  maxSupply: number;
  maxHoldableItems: number;
  whitelistSale: SaleConfig;
  phaseOneSale: SaleConfig;
  phaseTwoSale: SaleConfig;
  phaseThreeSale: SaleConfig;
  contractAddress: string | null;
  whitelistAddresses: string[];
  openSeaLink: string | null;
  raribleLink: string | null;
}
