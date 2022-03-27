/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MyNFTContract, MyNFTContractInterface } from "../MyNFTContract";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTx",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_uriPrefix",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_maxHoldableItems",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_additionalSupply",
        type: "uint256",
      },
    ],
    name: "incrementMaxSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxHoldableItems",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmountPerTx",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "merkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "mintForAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revealed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "saleStatus",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cost",
        type: "uint256",
      },
    ],
    name: "setCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTx",
        type: "uint256",
      },
    ],
    name: "setMaxMintAmountPerTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_merkleRoot",
        type: "bytes32",
      },
    ],
    name: "setMerkleRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setRevealed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_saleStatus",
        type: "uint256",
      },
    ],
    name: "setSaleStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uriPrefix",
        type: "string",
      },
    ],
    name: "setUriPrefix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uriSuffix",
        type: "string",
      },
    ],
    name: "setUriSuffix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setWhitelistMintEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "uriPrefix",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "uriSuffix",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "_merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "whitelistMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "whitelistMintEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040819052600060808190526200001b91600b91620001d5565b5060408051808201909152600580825264173539b7b760d91b60209092019182526200004a91600c91620001d5565b506012805462ffffff191660011790553480156200006757600080fd5b5060405162002dab38038062002dab8339810160408190526200008a9162000348565b865187908790620000a3906000906020850190620001d5565b508051620000b9906001906020840190620001d5565b505050620000d6620000d06200010760201b60201c565b6200010b565b6001600755600d859055600e849055600f8390556010819055620000fa826200015d565b505050505050506200043d565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6006546001600160a01b03163314620001bc5760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640160405180910390fd5b8051620001d190600b906020840190620001d5565b5050565b828054620001e39062000400565b90600052602060002090601f01602090048101928262000207576000855562000252565b82601f106200022257805160ff191683800117855562000252565b8280016001018555821562000252579182015b828111156200025257825182559160200191906001019062000235565b506200026092915062000264565b5090565b5b8082111562000260576000815560010162000265565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620002a357600080fd5b81516001600160401b0380821115620002c057620002c06200027b565b604051601f8301601f19908116603f01168101908282118183101715620002eb57620002eb6200027b565b816040528381526020925086838588010111156200030857600080fd5b600091505b838210156200032c57858201830151818301840152908201906200030d565b838211156200033e5760008385830101525b9695505050505050565b600080600080600080600060e0888a0312156200036457600080fd5b87516001600160401b03808211156200037c57600080fd5b6200038a8b838c0162000291565b985060208a0151915080821115620003a157600080fd5b620003af8b838c0162000291565b975060408a0151965060608a0151955060808a0151945060a08a0151915080821115620003db57600080fd5b50620003ea8a828b0162000291565b92505060c0880151905092959891949750929550565b600181811c908216806200041557607f821691505b602082108114156200043757634e487b7160e01b600052602260045260246000fd5b50919050565b61295e806200044d6000396000f3fe6080604052600436106102675760003560e01c806370a0823111610144578063b88d4fde116100b6578063e0a808531161007a578063e0a80853146106f1578063e985e9c514610711578063efbd73f41461075a578063f29f15af1461077a578063f2fde38b1461079a578063f9020e33146107ba57600080fd5b8063b88d4fde14610658578063c87b56dd14610678578063d2cab05614610698578063d5abeb01146106ab578063db4bec44146106c157600080fd5b806394354fd01161010857806394354fd0146105ba57806395d89b41146105d0578063a0712d68146105e5578063a22cb465146105f8578063b071401b14610618578063b767a0981461063857600080fd5b806370a0823114610527578063715018a6146105475780637cb647591461055c5780637ec4a6591461057c5780638da5cb5b1461059c57600080fd5b80633557ad2e116101dd57806351830227116101a157806351830227146104845780635503a0e8146104a45780635c975abb146104b957806362b99ad4146104d35780636352211e146104e85780636caede3d1461050857600080fd5b80633557ad2e146103ec5780633ccfd60b1461040257806342842e0e14610417578063438b63001461043757806344a0d68a1461046457600080fd5b806316ba10e01161022f57806316ba10e01461034157806316c38b3c1461036157806318160ddd146103815780631d11f88c1461039657806323b872dd146103b65780632eb4a7ab146103d657600080fd5b806301ffc9a71461026c57806306fdde03146102a1578063081812fc146102c3578063095ea7b3146102fb57806313faede61461031d575b600080fd5b34801561027857600080fd5b5061028c61028736600461219c565b6107d0565b60405190151581526020015b60405180910390f35b3480156102ad57600080fd5b506102b6610822565b6040516102989190612211565b3480156102cf57600080fd5b506102e36102de366004612224565b6108b4565b6040516001600160a01b039091168152602001610298565b34801561030757600080fd5b5061031b610316366004612259565b61094e565b005b34801561032957600080fd5b50610333600d5481565b604051908152602001610298565b34801561034d57600080fd5b5061031b61035c36600461230f565b610a64565b34801561036d57600080fd5b5061031b61037c366004612368565b610aa5565b34801561038d57600080fd5b50610333610ae2565b3480156103a257600080fd5b5061031b6103b1366004612224565b610af2565b3480156103c257600080fd5b5061031b6103d1366004612383565b610b30565b3480156103e257600080fd5b5061033360095481565b3480156103f857600080fd5b5061033360105481565b34801561040e57600080fd5b5061031b610b61565b34801561042357600080fd5b5061031b610432366004612383565b610d58565b34801561044357600080fd5b506104576104523660046123bf565b610d73565b60405161029891906123da565b34801561047057600080fd5b5061031b61047f366004612224565b610e54565b34801561049057600080fd5b5060125461028c9062010000900460ff1681565b3480156104b057600080fd5b506102b6610e83565b3480156104c557600080fd5b5060125461028c9060ff1681565b3480156104df57600080fd5b506102b6610f11565b3480156104f457600080fd5b506102e3610503366004612224565b610f1e565b34801561051457600080fd5b5060125461028c90610100900460ff1681565b34801561053357600080fd5b506103336105423660046123bf565b610f95565b34801561055357600080fd5b5061031b61101c565b34801561056857600080fd5b5061031b610577366004612224565b611052565b34801561058857600080fd5b5061031b61059736600461230f565b611081565b3480156105a857600080fd5b506006546001600160a01b03166102e3565b3480156105c657600080fd5b50610333600f5481565b3480156105dc57600080fd5b506102b66110be565b61031b6105f3366004612224565b6110cd565b34801561060457600080fd5b5061031b61061336600461241e565b611232565b34801561062457600080fd5b5061031b610633366004612224565b61123d565b34801561064457600080fd5b5061031b610653366004612368565b61126c565b34801561066457600080fd5b5061031b610673366004612451565b6112b0565b34801561068457600080fd5b506102b6610693366004612224565b6112e8565b61031b6106a63660046124cd565b6113c6565b3480156106b757600080fd5b50610333600e5481565b3480156106cd57600080fd5b5061028c6106dc3660046123bf565b600a6020526000908152604090205460ff1681565b3480156106fd57600080fd5b5061031b61070c366004612368565b611673565b34801561071d57600080fd5b5061028c61072c36600461254c565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b34801561076657600080fd5b5061031b610775366004612576565b6116b9565b34801561078657600080fd5b5061031b610795366004612224565b611722565b3480156107a657600080fd5b5061031b6107b53660046123bf565b611751565b3480156107c657600080fd5b5061033360115481565b60006001600160e01b031982166380ac58cd60e01b148061080157506001600160e01b03198216635b5e139f60e01b145b8061081c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461083190612599565b80601f016020809104026020016040519081016040528092919081815260200182805461085d90612599565b80156108aa5780601f1061087f576101008083540402835291602001916108aa565b820191906000526020600020905b81548152906001019060200180831161088d57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166109325760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061095982610f1e565b9050806001600160a01b0316836001600160a01b031614156109c75760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610929565b336001600160a01b03821614806109e357506109e3813361072c565b610a555760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610929565b610a5f83836117ec565b505050565b6006546001600160a01b03163314610a8e5760405162461bcd60e51b8152600401610929906125d4565b8051610aa190600c9060208401906120ed565b5050565b6006546001600160a01b03163314610acf5760405162461bcd60e51b8152600401610929906125d4565b6012805460ff1916911515919091179055565b6000610aed60085490565b905090565b6006546001600160a01b03163314610b1c5760405162461bcd60e51b8152600401610929906125d4565b80600e54610b2a919061261f565b600e5550565b610b3a338261185a565b610b565760405162461bcd60e51b815260040161092990612637565b610a5f838383611951565b6006546001600160a01b03163314610b8b5760405162461bcd60e51b8152600401610929906125d4565b60026007541415610bde5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610929565b6002600755600073640450989230f4aa2700f327d096eee8141298606064610c0747600a612688565b610c1191906126bd565b604051600081818185875af1925050503d8060008114610c4d576040519150601f19603f3d011682016040523d82523d6000602084013e610c52565b606091505b5050905080610c6057600080fd5b600073ec0326683904fcba72f7c265e4047f30884152f46064610c8447600a612688565b610c8e91906126bd565b604051600081818185875af1925050503d8060008114610cca576040519150601f19603f3d011682016040523d82523d6000602084013e610ccf565b606091505b5050905080610cdd57600080fd5b6000610cf16006546001600160a01b031690565b6001600160a01b03164760405160006040518083038185875af1925050503d8060008114610d3b576040519150601f19603f3d011682016040523d82523d6000602084013e610d40565b606091505b5050905080610d4e57600080fd5b5050600160075550565b610a5f838383604051806020016040528060008152506112b0565b60606000610d8083610f95565b905060008167ffffffffffffffff811115610d9d57610d9d612283565b604051908082528060200260200182016040528015610dc6578160200160208202803683370190505b509050600160005b8381108015610ddf5750600e548211155b15610e4a576000610def83610f1e565b9050866001600160a01b0316816001600160a01b03161415610e375782848381518110610e1e57610e1e6126d1565b602090810291909101015281610e33816126e7565b9250505b82610e41816126e7565b93505050610dce565b5090949350505050565b6006546001600160a01b03163314610e7e5760405162461bcd60e51b8152600401610929906125d4565b600d55565b600c8054610e9090612599565b80601f0160208091040260200160405190810160405280929190818152602001828054610ebc90612599565b8015610f095780601f10610ede57610100808354040283529160200191610f09565b820191906000526020600020905b815481529060010190602001808311610eec57829003601f168201915b505050505081565b600b8054610e9090612599565b6000818152600260205260408120546001600160a01b03168061081c5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610929565b60006001600160a01b0382166110005760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610929565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b031633146110465760405162461bcd60e51b8152600401610929906125d4565b6110506000611af1565b565b6006546001600160a01b0316331461107c5760405162461bcd60e51b8152600401610929906125d4565b600955565b6006546001600160a01b031633146110ab5760405162461bcd60e51b8152600401610929906125d4565b8051610aa190600b9060208401906120ed565b60606001805461083190612599565b806000811180156110e05750600f548111155b6111235760405162461bcd60e51b8152602060048201526014602482015273496e76616c6964206d696e7420616d6f756e742160601b6044820152606401610929565b600e548161113060085490565b61113a919061261f565b11156111585760405162461bcd60e51b815260040161092990612702565b60105461116433610f95565b106111815760405162461bcd60e51b815260040161092990612730565b8180600d546111909190612688565b3410156111d55760405162461bcd60e51b8152602060048201526013602482015272496e73756666696369656e742066756e64732160681b6044820152606401610929565b60125460ff16156112285760405162461bcd60e51b815260206004820152601760248201527f54686520636f6e747261637420697320706175736564210000000000000000006044820152606401610929565b610a5f3384611b43565b610aa1338383611b80565b6006546001600160a01b031633146112675760405162461bcd60e51b8152600401610929906125d4565b600f55565b6006546001600160a01b031633146112965760405162461bcd60e51b8152600401610929906125d4565b601280549115156101000261ff0019909216919091179055565b6112ba338361185a565b6112d65760405162461bcd60e51b815260040161092990612637565b6112e284848484611c4f565b50505050565b6000818152600260205260409020546060906001600160a01b03166113675760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610929565b6000611371611c82565b9050600081511161139157604051806020016040528060008152506113bf565b8061139b84611c91565b600c6040516020016113af9392919061278d565b6040516020818303038152906040525b9392505050565b826000811180156113d95750600f548111155b61141c5760405162461bcd60e51b8152602060048201526014602482015273496e76616c6964206d696e7420616d6f756e742160601b6044820152606401610929565b600e548161142960085490565b611433919061261f565b11156114515760405162461bcd60e51b815260040161092990612702565b60105461145d33610f95565b1061147a5760405162461bcd60e51b815260040161092990612730565b8380600d546114899190612688565b3410156114ce5760405162461bcd60e51b8152602060048201526013602482015272496e73756666696369656e742066756e64732160681b6044820152606401610929565b601254610100900460ff166115305760405162461bcd60e51b815260206004820152602260248201527f5468652077686974656c6973742073616c65206973206e6f7420656e61626c65604482015261642160f01b6064820152608401610929565b336000908152600a602052604090205460ff16156115905760405162461bcd60e51b815260206004820152601860248201527f4164647265737320616c726561647920636c61696d65642100000000000000006044820152606401610929565b6040516bffffffffffffffffffffffff193360601b16602082015260009060340160405160208183030381529060405280519060200120905061160a858580806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250506009549150849050611d8f565b6116475760405162461bcd60e51b815260206004820152600e60248201526d496e76616c69642070726f6f662160901b6044820152606401610929565b336000818152600a60205260409020805460ff1916600117905561166b9087611b43565b505050505050565b6006546001600160a01b0316331461169d5760405162461bcd60e51b8152600401610929906125d4565b60128054911515620100000262ff000019909216919091179055565b6006546001600160a01b031633146116e35760405162461bcd60e51b8152600401610929906125d4565b600e54826116f060085490565b6116fa919061261f565b11156117185760405162461bcd60e51b815260040161092990612702565b610aa18183611b43565b6006546001600160a01b0316331461174c5760405162461bcd60e51b8152600401610929906125d4565b601155565b6006546001600160a01b0316331461177b5760405162461bcd60e51b8152600401610929906125d4565b6001600160a01b0381166117e05760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610929565b6117e981611af1565b50565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061182182610f1e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166118d35760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610929565b60006118de83610f1e565b9050806001600160a01b0316846001600160a01b031614806119195750836001600160a01b031661190e846108b4565b6001600160a01b0316145b8061194957506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b031661196482610f1e565b6001600160a01b0316146119cc5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201526839903737ba1037bbb760b91b6064820152608401610929565b6001600160a01b038216611a2e5760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610929565b611a396000826117ec565b6001600160a01b0383166000908152600360205260408120805460019290611a62908490612851565b90915550506001600160a01b0382166000908152600360205260408120805460019290611a9090849061261f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60005b81811015610a5f57611b5c600880546001019055565b611b6e83611b6960085490565b611da5565b80611b78816126e7565b915050611b46565b816001600160a01b0316836001600160a01b03161415611be25760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610929565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b611c5a848484611951565b611c6684848484611dbf565b6112e25760405162461bcd60e51b815260040161092990612868565b6060600b805461083190612599565b606081611cb55750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611cdf5780611cc9816126e7565b9150611cd89050600a836126bd565b9150611cb9565b60008167ffffffffffffffff811115611cfa57611cfa612283565b6040519080825280601f01601f191660200182016040528015611d24576020820181803683370190505b5090505b841561194957611d39600183612851565b9150611d46600a866128ba565b611d5190603061261f565b60f81b818381518110611d6657611d666126d1565b60200101906001600160f81b031916908160001a905350611d88600a866126bd565b9450611d28565b600082611d9c8584611ecc565b14949350505050565b610aa1828260405180602001604052806000815250611f78565b60006001600160a01b0384163b15611ec157604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611e039033908990889088906004016128ce565b602060405180830381600087803b158015611e1d57600080fd5b505af1925050508015611e4d575060408051601f3d908101601f19168201909252611e4a9181019061290b565b60015b611ea7573d808015611e7b576040519150601f19603f3d011682016040523d82523d6000602084013e611e80565b606091505b508051611e9f5760405162461bcd60e51b815260040161092990612868565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611949565b506001949350505050565b600081815b8451811015611f70576000858281518110611eee57611eee6126d1565b60200260200101519050808311611f30576040805160208101859052908101829052606001604051602081830303815290604052805190602001209250611f5d565b60408051602081018390529081018490526060016040516020818303038152906040528051906020012092505b5080611f68816126e7565b915050611ed1565b509392505050565b611f828383611fab565b611f8f6000848484611dbf565b610a5f5760405162461bcd60e51b815260040161092990612868565b6001600160a01b0382166120015760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610929565b6000818152600260205260409020546001600160a01b0316156120665760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610929565b6001600160a01b038216600090815260036020526040812080546001929061208f90849061261f565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b8280546120f990612599565b90600052602060002090601f01602090048101928261211b5760008555612161565b82601f1061213457805160ff1916838001178555612161565b82800160010185558215612161579182015b82811115612161578251825591602001919060010190612146565b5061216d929150612171565b5090565b5b8082111561216d5760008155600101612172565b6001600160e01b0319811681146117e957600080fd5b6000602082840312156121ae57600080fd5b81356113bf81612186565b60005b838110156121d45781810151838201526020016121bc565b838111156112e25750506000910152565b600081518084526121fd8160208601602086016121b9565b601f01601f19169290920160200192915050565b6020815260006113bf60208301846121e5565b60006020828403121561223657600080fd5b5035919050565b80356001600160a01b038116811461225457600080fd5b919050565b6000806040838503121561226c57600080fd5b6122758361223d565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156122b4576122b4612283565b604051601f8501601f19908116603f011681019082821181831017156122dc576122dc612283565b816040528093508581528686860111156122f557600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561232157600080fd5b813567ffffffffffffffff81111561233857600080fd5b8201601f8101841361234957600080fd5b61194984823560208401612299565b8035801515811461225457600080fd5b60006020828403121561237a57600080fd5b6113bf82612358565b60008060006060848603121561239857600080fd5b6123a18461223d565b92506123af6020850161223d565b9150604084013590509250925092565b6000602082840312156123d157600080fd5b6113bf8261223d565b6020808252825182820181905260009190848201906040850190845b81811015612412578351835292840192918401916001016123f6565b50909695505050505050565b6000806040838503121561243157600080fd5b61243a8361223d565b915061244860208401612358565b90509250929050565b6000806000806080858703121561246757600080fd5b6124708561223d565b935061247e6020860161223d565b925060408501359150606085013567ffffffffffffffff8111156124a157600080fd5b8501601f810187136124b257600080fd5b6124c187823560208401612299565b91505092959194509250565b6000806000604084860312156124e257600080fd5b83359250602084013567ffffffffffffffff8082111561250157600080fd5b818601915086601f83011261251557600080fd5b81358181111561252457600080fd5b8760208260051b850101111561253957600080fd5b6020830194508093505050509250925092565b6000806040838503121561255f57600080fd5b6125688361223d565b91506124486020840161223d565b6000806040838503121561258957600080fd5b823591506124486020840161223d565b600181811c908216806125ad57607f821691505b602082108114156125ce57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000821982111561263257612632612609565b500190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b60008160001904831182151516156126a2576126a2612609565b500290565b634e487b7160e01b600052601260045260246000fd5b6000826126cc576126cc6126a7565b500490565b634e487b7160e01b600052603260045260246000fd5b60006000198214156126fb576126fb612609565b5060010190565b6020808252601490820152734d617820737570706c792065786365656465642160601b604082015260600190565b60208082526037908201527f416c726561647920617070726f616368656420746865206d6178696d756d206e60408201527f756d626572206f6620686f6c6461626c65206974656d73000000000000000000606082015260800190565b6000845160206127a08285838a016121b9565b8551918401916127b38184848a016121b9565b8554920191600090600181811c90808316806127d057607f831692505b8583108114156127ee57634e487b7160e01b85526022600452602485fd5b808015612802576001811461281357612840565b60ff19851688528388019550612840565b60008b81526020902060005b858110156128385781548a82015290840190880161281f565b505083880195505b50939b9a5050505050505050505050565b60008282101561286357612863612609565b500390565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000826128c9576128c96126a7565b500690565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090612901908301846121e5565b9695505050505050565b60006020828403121561291d57600080fd5b81516113bf8161218656fea26469706673582212201f7357cca24523a29056653ea3fcc3e8d0ac6d40fb9e2b42317c17a12d92843864736f6c63430008090033";

export class MyNFTContract__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _tokenName: string,
    _tokenSymbol: string,
    _cost: BigNumberish,
    _maxSupply: BigNumberish,
    _maxMintAmountPerTx: BigNumberish,
    _uriPrefix: string,
    _maxHoldableItems: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<MyNFTContract> {
    return super.deploy(
      _tokenName,
      _tokenSymbol,
      _cost,
      _maxSupply,
      _maxMintAmountPerTx,
      _uriPrefix,
      _maxHoldableItems,
      overrides || {}
    ) as Promise<MyNFTContract>;
  }
  getDeployTransaction(
    _tokenName: string,
    _tokenSymbol: string,
    _cost: BigNumberish,
    _maxSupply: BigNumberish,
    _maxMintAmountPerTx: BigNumberish,
    _uriPrefix: string,
    _maxHoldableItems: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _tokenName,
      _tokenSymbol,
      _cost,
      _maxSupply,
      _maxMintAmountPerTx,
      _uriPrefix,
      _maxHoldableItems,
      overrides || {}
    );
  }
  attach(address: string): MyNFTContract {
    return super.attach(address) as MyNFTContract;
  }
  connect(signer: Signer): MyNFTContract__factory {
    return super.connect(signer) as MyNFTContract__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MyNFTContractInterface {
    return new utils.Interface(_abi) as MyNFTContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MyNFTContract {
    return new Contract(address, _abi, signerOrProvider) as MyNFTContract;
  }
}
