import { expect } from "chai";
import { BigNumber, utils } from "ethers";
import { ethers } from "hardhat";
import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import CollectionConfig from "./../config/CollectionConfig";
import ContractArguments from "../config/ContractArguments";
import { NftContractType } from "../lib/NftContractProvider";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

enum SaleType {
  WHITELIST = CollectionConfig.whitelistSale.price,
  PHASE_ONE_SALE = CollectionConfig.phaseOneSale.price,
  PHASE_TWO_SALE = CollectionConfig.phaseTwoSale.price,
  PHASE_THREE_SALE = CollectionConfig.phaseThreeSale.price,
}

const whitelistAddresses = [
  // Hardhat test addresses...
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
  "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
  "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
  "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
  "0xBcd4042DE499D14e55001CcbB24a551F3b954096",
  "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",
  "0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",
  "0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
  "0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",
  "0xcd3B766CCDd6AE721141F452C550Ca635964ce71",
  "0x2546BcD3c84621e976D8185a91A922aE77ECEc30",
  "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E",
  "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
  "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
];

function getPrice(saleType: SaleType, mintAmount: number) {
  return utils.parseEther(saleType.toString()).mul(mintAmount);
}

describe(CollectionConfig.contractName, function () {
  let owner!: SignerWithAddress;
  let whitelistedUser!: SignerWithAddress;
  let teamMember!: SignerWithAddress;
  let investor!: SignerWithAddress;
  let holder!: SignerWithAddress;
  let externalUser!: SignerWithAddress;
  let otherAddresses!: SignerWithAddress[];
  let contract!: NftContractType;

  before(async function () {
    [
      owner,
      whitelistedUser,
      holder,
      externalUser,
      teamMember,
      investor,
      ...otherAddresses
    ] = await ethers.getSigners();
  });

  it("Contract deployment", async function () {
    const Contract = await ethers.getContractFactory(
      CollectionConfig.contractName
    );
    contract = (await Contract.deploy(...ContractArguments)) as NftContractType;

    await contract.deployed();
  });

  it("Check initial data", async function () {
    expect(await contract.name()).to.equal(CollectionConfig.tokenName);
    expect(await contract.symbol()).to.equal(CollectionConfig.tokenSymbol);
    expect(await contract.cost()).to.equal(getPrice(SaleType.WHITELIST, 1));
    expect(await contract.maxSupply()).to.equal(CollectionConfig.maxSupply);
    expect(await contract.maxMintAmountPerTx()).to.equal(
      CollectionConfig.whitelistSale.maxMintAmountPerTx
    );
    expect(await contract.maxHoldableItems()).to.equal(
      CollectionConfig.maxHoldableItems
    );

    expect(await contract.paused()).to.equal(true);
    expect(await contract.whitelistMintEnabled()).to.equal(false);
    expect(await contract.revealed()).to.equal(false);

    await expect(contract.tokenURI(1)).to.be.revertedWith(
      "ERC721Metadata: URI query for nonexistent token"
    );
  });

  it("Before any sale", async function () {
    // Nobody should be able to mint from a paused contract
    await expect(
      contract
        .connect(whitelistedUser)
        .mint(1, { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint(1, [], { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The whitelist sale is not enabled!");
    await expect(
      contract
        .connect(holder)
        .mint(1, { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract
        .connect(holder)
        .whitelistMint(1, [], { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The whitelist sale is not enabled!");
    await expect(
      contract
        .connect(owner)
        .mint(1, { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The contract is paused!");
    await expect(
      contract
        .connect(owner)
        .whitelistMint(1, [], { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("The whitelist sale is not enabled!");

    // The owner should always be able to run mintForAddress
    await (await contract.mintForAddress(3, await owner.getAddress())).wait();
    await (
      await contract.mintForAddress(1, await whitelistedUser.getAddress())
    ).wait();
    await (
      await contract.mintForAddress(1, await teamMember.getAddress())
    ).wait();
    await (
      await contract.mintForAddress(1, await investor.getAddress())
    ).wait();

    // But cannot mint more than the current supply (minted: 6, supply: 10)
    await expect(
      contract.connect(owner).mintForAddress(5, await owner.getAddress())
    ).to.be.revertedWith("Max supply exceeded!");

    // Check balances
    expect(await contract.balanceOf(await owner.getAddress())).to.equal(3);
    expect(
      await contract.balanceOf(await whitelistedUser.getAddress())
    ).to.equal(1);
    expect(await contract.balanceOf(await teamMember.getAddress())).to.equal(1);
    expect(await contract.balanceOf(await investor.getAddress())).to.equal(1);
    expect(await contract.balanceOf(await holder.getAddress())).to.equal(0);
    expect(await contract.balanceOf(await externalUser.getAddress())).to.equal(
      0
    );
    expect(await contract.totalSupply()).to.equal(6);
  });

  it("Whitelist sale", async function () {
    // Build MerkleTree
    const leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, {
      sortPairs: true,
    });
    const rootHash = merkleTree.getRoot();

    // Update the root hash
    await (
      await contract.setMerkleRoot("0x" + rootHash.toString("hex"))
    ).wait();

    // Enable whitelist mint
    await contract.setWhitelistMintEnabled(true);

    const whitelistUserMerkleProof = merkleTree.getHexProof(
      keccak256(await whitelistedUser.getAddress())
    );

    await contract
      .connect(whitelistedUser)
      .whitelistMint(1, whitelistUserMerkleProof, {
        value: getPrice(SaleType.WHITELIST, 1),
      });

    // Trying to mint twice
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint(1, whitelistUserMerkleProof, {
          value: getPrice(SaleType.WHITELIST, 1),
        })
    ).to.be.revertedWith("Address already claimed!");

    // Sending an invalid mint amount
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint(
          await (await contract.maxMintAmountPerTx()).add(1),
          whitelistUserMerkleProof,
          {
            value: getPrice(
              SaleType.WHITELIST,
              await (await contract.maxMintAmountPerTx()).add(1).toNumber()
            ),
          }
        )
    ).to.be.revertedWith("Invalid mint amount!");

    // Pretending to be someone else
    await expect(
      contract.connect(holder).whitelistMint(1, whitelistUserMerkleProof, {
        value: getPrice(SaleType.WHITELIST, 1),
      })
    ).to.be.revertedWith("Invalid proof!");

    // Sending an invalid proof
    await expect(
      contract
        .connect(holder)
        .whitelistMint(
          1,
          merkleTree.getHexProof(keccak256(await holder.getAddress())),
          { value: getPrice(SaleType.WHITELIST, 1) }
        )
    ).to.be.revertedWith("Invalid proof!");

    // Sending no proof at all
    await expect(
      contract
        .connect(holder)
        .whitelistMint(1, [], { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("Invalid proof!");

    // Pause whitelist sale
    await contract.setWhitelistMintEnabled(false);

    // Check balances
    expect(await contract.balanceOf(await owner.getAddress())).to.equal(3);
    expect(
      await contract.balanceOf(await whitelistedUser.getAddress())
    ).to.equal(2);
    expect(await contract.balanceOf(await teamMember.getAddress())).to.equal(1);
    expect(await contract.balanceOf(await investor.getAddress())).to.equal(1);
    expect(await contract.balanceOf(await holder.getAddress())).to.equal(0);
    expect(await contract.balanceOf(await externalUser.getAddress())).to.equal(
      0
    );
    expect(await contract.totalSupply()).to.equal(7);
  });

  it("Phase 1 sale", async function () {
    await contract.setCost(
      utils.parseEther(CollectionConfig.phaseOneSale.price.toString())
    );
    await contract.setMaxMintAmountPerTx(
      CollectionConfig.phaseOneSale.maxMintAmountPerTx
    );
    await contract.incrementMaxSupply(
      CollectionConfig.phaseOneSale.additionalSupply
    );

    await contract.setPaused(false);

    // Mint the maximum number of holdable items - 1
    await contract.connect(holder).mint(CollectionConfig.maxHoldableItems - 1, {
      value: getPrice(
        SaleType.PHASE_ONE_SALE,
        CollectionConfig.maxHoldableItems - 1
      ),
    });

    await contract
      .connect(whitelistedUser)
      .mint(1, { value: getPrice(SaleType.PHASE_ONE_SALE, 1) });

    // Sending insufficient funds
    await expect(
      contract
        .connect(holder)
        .mint(1, { value: getPrice(SaleType.PHASE_ONE_SALE, 1).sub(1) })
    ).to.be.revertedWith("Insufficient funds!");

    // Mint one more item and approach the maximum holdable items limit
    await contract.connect(holder).mint(1, {
      value: getPrice(SaleType.PHASE_ONE_SALE, 1),
    });

    // Cannot hold more than the maxHoldableItems limit
    await expect(
      contract
        .connect(holder)
        .mint(1, { value: getPrice(SaleType.PHASE_ONE_SALE, 1) })
    ).to.be.revertedWith(
      "Already approached the maximum number of holdable items"
    );

    // Sending an invalid mint amount
    await expect(
      contract
        .connect(whitelistedUser)
        .mint(await (await contract.maxMintAmountPerTx()).add(1), {
          value: getPrice(
            SaleType.PHASE_ONE_SALE,
            await (await contract.maxMintAmountPerTx()).add(1).toNumber()
          ),
        })
    ).to.be.revertedWith("Invalid mint amount!");

    // Sending a whitelist mint transaction
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint(1, [], { value: getPrice(SaleType.WHITELIST, 1) })
    ).to.be.revertedWith("Insufficient funds!");

    // Sending a whitelist mint transaction with correct price
    await expect(
      contract
        .connect(whitelistedUser)
        .whitelistMint(1, [], { value: getPrice(SaleType.PHASE_ONE_SALE, 1) })
    ).to.be.revertedWith("The whitelist sale is not enabled!");

    // Pause phase 1 sale
    await contract.setPaused(true);

    expect(await contract.totalSupply()).to.equal(15);
  });

  it("Owner only functions", async function () {
    await expect(
      contract
        .connect(externalUser)
        .mintForAddress(1, await externalUser.getAddress())
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setRevealed(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setCost(utils.parseEther("0.0000001"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setMaxMintAmountPerTx(99999)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setUriPrefix("INVALID_PREFIX")
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setUriSuffix("INVALID_SUFFIX")
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setPaused(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract
        .connect(externalUser)
        .setMerkleRoot(
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        )
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(
      contract.connect(externalUser).setWhitelistMintEnabled(false)
    ).to.be.revertedWith("Ownable: caller is not the owner");
    await expect(contract.connect(externalUser).withdraw()).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Token URI generation", async function () {
    const uriPrefix = "ipfs://__COLLECTION_CID__/";
    const uriSuffix = ".json";

    // Reveal collection
    await contract.setUriPrefix(uriPrefix);
    await contract.setRevealed(true);

    expect(await contract.tokenURI(1)).to.equal(`${uriPrefix}1${uriSuffix}`);
  });

  it("Wallet of owner", async function () {
    expect(await contract.walletOfOwner(await owner.getAddress())).deep.equal([
      BigNumber.from(1),
      BigNumber.from(2),
      BigNumber.from(3),
    ]);
    expect(
      await contract.walletOfOwner(await whitelistedUser.getAddress())
    ).deep.equal([BigNumber.from(4), BigNumber.from(7), BigNumber.from(14)]);
    expect(await contract.walletOfOwner(await holder.getAddress())).deep.equal([
      BigNumber.from(8),
      BigNumber.from(9),
      BigNumber.from(10),
      BigNumber.from(11),
      BigNumber.from(12),
      BigNumber.from(13),
      BigNumber.from(15),
    ]);
    expect(
      await contract.walletOfOwner(await externalUser.getAddress())
    ).deep.equal([]);
    expect(
      await contract.walletOfOwner(await teamMember.getAddress())
    ).deep.equal([BigNumber.from(5)]);
    expect(
      await contract.walletOfOwner(await investor.getAddress())
    ).deep.equal([BigNumber.from(6)]);
  });

  it("Check rest of the sale (phase 2, phase 3)", async function () {
    await contract.setCost(
      utils.parseEther(CollectionConfig.phaseTwoSale.price.toString())
    );
    await contract.setMaxMintAmountPerTx(
      CollectionConfig.phaseTwoSale.maxMintAmountPerTx
    );
    await contract.incrementMaxSupply(
      CollectionConfig.phaseTwoSale.additionalSupply
    );

    await contract.setPaused(false);

    const totalSupply = await contract.totalSupply();
    const maxSupply = await contract.maxSupply();
    const addresses = otherAddresses.slice(
      0,
      (maxSupply.toNumber() - totalSupply.toNumber()) / 5
    );

    // Mint for the max amount of supply
    addresses.map(
      async (address) =>
        await contract.connect(address).mint(5, {
          value: getPrice(SaleType.PHASE_TWO_SALE, 5),
        })
    );

    await expect(
      contract
        .connect(externalUser)
        .mint(1, { value: getPrice(SaleType.PHASE_TWO_SALE, 1) })
    ).to.be.revertedWith("Max supply exceeded!");

    expect(await contract.totalSupply()).to.equal(await contract.maxSupply());
  });

  // it("Supply checks (long)", async function () {
  //   if (process.env.EXTENDED_TESTS === undefined) {
  //     this.skip();
  //   }

  //   const alreadyMinted = 6;
  //   const maxMintAmountPerTx = 1000;
  //   const iterations = Math.floor(
  //     (CollectionConfig.maxSupply - alreadyMinted) / maxMintAmountPerTx
  //   );
  //   const expectedTotalSupply = iterations * maxMintAmountPerTx + alreadyMinted;
  //   const lastMintAmount = CollectionConfig.maxSupply - expectedTotalSupply;
  //   expect(await contract.totalSupply()).to.equal(alreadyMinted);

  //   await contract.setPaused(false);
  //   await contract.setMaxMintAmountPerTx(maxMintAmountPerTx);

  //   await Promise.all(
  //     [...Array(iterations).keys()].map(
  //       async () =>
  //         await contract.connect(whitelistedUser).mint(maxMintAmountPerTx, {
  //           value: getPrice(SaleType.PHASE_TWO_SALE, maxMintAmountPerTx),
  //         })
  //     )
  //   );

  //   // Try to mint over max supply
  //   await expect(
  //     contract.connect(holder).mint(lastMintAmount + 1, {
  //       value: getPrice(SaleType.PHASE_TWO_SALE, lastMintAmount + 1),
  //     })
  //   ).to.be.revertedWith("Max supply exceeded!");

  //   expect(await contract.totalSupply()).to.equal(expectedTotalSupply);

  //   await contract.mint(lastMintAmount, {
  //     value: getPrice(SaleType.PHASE_TWO_SALE, lastMintAmount),
  //   });

  //   await expect(
  //     contract
  //       .connect(whitelistedUser)
  //       .mint(1, { value: getPrice(SaleType.PHASE_TWO_SALE, 1) })
  //   ).to.be.revertedWith("Max supply exceeded!");

  //   expect(await contract.totalSupply()).to.equal(CollectionConfig.maxSupply);
  // });
});
