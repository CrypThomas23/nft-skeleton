import { utils } from "ethers";
import CollectionConfig from "../config/CollectionConfig";
import NftContractProvider from "../lib/NftContractProvider";

async function main() {
  // Attach to deployed contract
  const contract = await NftContractProvider.getContract();

  // Update sale price (if needed)
  const phaseThreeSale = utils.parseEther(
    CollectionConfig.phaseThreeSale.price.toString()
  );
  if (!(await (await contract.cost()).eq(phaseThreeSale))) {
    console.log(
      `Updating the token price to ${CollectionConfig.phaseThreeSale.price} ETH...`
    );

    await (await contract.setCost(phaseThreeSale)).wait();
  }

  // Update max amount per TX (if needed)
  if (
    !(await (
      await contract.maxMintAmountPerTx()
    ).eq(CollectionConfig.phaseThreeSale.maxMintAmountPerTx))
  ) {
    console.log(
      `Updating the max mint amount per TX for Phase 3 to ${CollectionConfig.phaseThreeSale.maxMintAmountPerTx}...`
    );

    await (
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.phaseThreeSale.maxMintAmountPerTx
      )
    ).wait();
  }

  const maxSupplyAlreadySetted =
    (await contract.maxSupply()).toNumber() >=
    CollectionConfig.maxSupply +
      CollectionConfig.whitelistSale.additionalSupply +
      CollectionConfig.phaseOneSale.additionalSupply +
      CollectionConfig.phaseTwoSale.additionalSupply +
      CollectionConfig.phaseThreeSale.additionalSupply;
  // Increment max supply
  if (
    CollectionConfig.phaseThreeSale.additionalSupply > 0 &&
    !maxSupplyAlreadySetted
  ) {
    console.log(
      `Increment the max supply with ${CollectionConfig.phaseThreeSale.additionalSupply}...`
    );

    await (
      await contract.incrementMaxSupply(
        CollectionConfig.phaseThreeSale.additionalSupply
      )
    ).wait();
  }

  // Set sale status (if needed)
  if (
    !(await contract.saleStatus()).eq(
      CollectionConfig.phaseThreeSale.saleStatus
    )
  ) {
    console.log(
      `Setting the sale status ${CollectionConfig.phaseThreeSale.saleStatus}...`
    );

    await await contract.setSaleStatus(
      CollectionConfig.phaseThreeSale.saleStatus
    );
  }

  // Unpause the contract (if needed)
  if (await contract.paused()) {
    console.log("Unpausing the contract...");

    await (await contract.setPaused(false)).wait();
  }

  console.log("Phase 3 sale is now open!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
