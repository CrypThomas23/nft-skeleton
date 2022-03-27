import { utils } from "ethers";
import CollectionConfig from "../config/CollectionConfig";
import NftContractProvider from "../lib/NftContractProvider";

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const phaseOneSalePrice = utils.parseEther(
    CollectionConfig.phaseOneSale.price.toString()
  );
  if (!(await (await contract.cost()).eq(phaseOneSalePrice))) {
    console.log(
      `Updating the token price to ${CollectionConfig.phaseOneSale.price} ETH...`
    );

    await (await contract.setCost(phaseOneSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (
    !(await (
      await contract.maxMintAmountPerTx()
    ).eq(CollectionConfig.phaseOneSale.maxMintAmountPerTx))
  ) {
    console.log(
      `Updating the max mint amount per TX for Phase 1 to: ${CollectionConfig.phaseOneSale.maxMintAmountPerTx}...`
    );

    await (
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.phaseOneSale.maxMintAmountPerTx
      )
    ).wait();
  }

  const maxSupplyAlreadySetted =
    (await contract.maxSupply()).toNumber() >=
    CollectionConfig.maxSupply +
      CollectionConfig.whitelistSale.additionalSupply +
      CollectionConfig.phaseOneSale.additionalSupply;
  // Increment max supply
  if (
    CollectionConfig.phaseOneSale.additionalSupply > 0 &&
    !maxSupplyAlreadySetted
  ) {
    console.log(
      `Increment the max supply with ${CollectionConfig.phaseOneSale.additionalSupply}...`
    );

    await (
      await contract.incrementMaxSupply(
        CollectionConfig.phaseOneSale.additionalSupply
      )
    ).wait();
  }

  // Set sale status (if needed)
  if (
    !(await contract.saleStatus()).eq(CollectionConfig.phaseOneSale.saleStatus)
  ) {
    console.log(
      `Setting the sale status ${CollectionConfig.phaseOneSale.saleStatus}...`
    );

    await await contract.setSaleStatus(
      CollectionConfig.phaseOneSale.saleStatus
    );
  }

  // Unpause the contract (if needed)
  if (await contract.paused()) {
    console.log("Unpausing the contract...");

    await (await contract.setPaused(false)).wait();
  }

  console.log("Phase 1 sale is now open!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
