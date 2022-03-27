import { utils } from "ethers";
import CollectionConfig from "../config/CollectionConfig";
import NftContractProvider from "../lib/NftContractProvider";

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const phaseTwoSalePrice = utils.parseEther(
    CollectionConfig.phaseTwoSale.price.toString()
  );
  if (!(await (await contract.cost()).eq(phaseTwoSalePrice))) {
    console.log(
      `Updating the token price to ${CollectionConfig.phaseTwoSale.price} ETH...`
    );

    await (await contract.setCost(phaseTwoSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (
    !(await (
      await contract.maxMintAmountPerTx()
    ).eq(CollectionConfig.phaseTwoSale.maxMintAmountPerTx))
  ) {
    console.log(
      `Updating the max mint amount per TX for Phase 2 to ${CollectionConfig.phaseTwoSale.maxMintAmountPerTx}...`
    );

    await (
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.phaseTwoSale.maxMintAmountPerTx
      )
    ).wait();
  }

  const maxSupplyAlreadySetted =
    (await contract.maxSupply()).toNumber() >=
    CollectionConfig.maxSupply +
      CollectionConfig.whitelistSale.additionalSupply +
      CollectionConfig.phaseOneSale.additionalSupply +
      CollectionConfig.phaseTwoSale.additionalSupply;
  // Increment max supply
  if (
    CollectionConfig.phaseTwoSale.additionalSupply > 0 &&
    !maxSupplyAlreadySetted
  ) {
    console.log(
      `Increment the max supply with ${CollectionConfig.phaseTwoSale.additionalSupply}...`
    );

    await (
      await contract.incrementMaxSupply(
        CollectionConfig.phaseTwoSale.additionalSupply
      )
    ).wait();
  }

  // Set sale status (if needed)
  if (
    !(await contract.saleStatus()).eq(CollectionConfig.phaseTwoSale.saleStatus)
  ) {
    console.log(
      `Setting the sale status ${CollectionConfig.phaseTwoSale.saleStatus}...`
    );

    await await contract.setSaleStatus(
      CollectionConfig.phaseTwoSale.saleStatus
    );
  }

  // Unpause the contract (if needed)
  if (await contract.paused()) {
    console.log("Unpausing the contract...");

    await (await contract.setPaused(false)).wait();
  }

  console.log("Phase 2 sale is now open!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
