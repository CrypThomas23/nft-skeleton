import { ExternalProvider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setupHooks } from "../hooks/setupHooks";
import { ethers } from "ethers";
import { NftContractType } from "smart-contract/lib/NftContractProvider";
import CollectionConfig from "smart-contract/config/CollectionConfig";

const ContractAbi = require("smart-contract/artifacts/contracts/" +
  CollectionConfig.contractName +
  ".sol/" +
  CollectionConfig.contractName +
  ".json").abi;

export interface IWeb3State {
  provider: ExternalProvider;
  web3Provider: ethers.providers.Web3Provider;
  contract: NftContractType;
  isWeb3Loading: boolean;
  hooks: any;
  contractAddress: string;
}

interface IWeb3Context extends IWeb3State {
  requireToInstallMetamask: boolean;
  connectToMetamask: () => void;
}

const Web3Context = createContext<IWeb3Context | null>(null);

const createWeb3State = ({
  web3Provider,
  provider,
  contract,
  isWeb3Loading,
}: Omit<IWeb3State, "hooks" | "contractAddress">) => {
  const contractAddress = CollectionConfig.contractAddress;
  return {
    web3Provider,
    provider,
    contract,
    isWeb3Loading,
    contractAddress,
    hooks: setupHooks({ web3Provider, provider }),
  };
};

export default function Web3Provider({ children }: PropsWithChildren<{}>) {
  const [web3Api, setWeb3Api] = useState<IWeb3State>(
    createWeb3State({
      provider: null,
      web3Provider: null,
      contract: null,
      isWeb3Loading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = (await detectEthereumProvider()) as ExternalProvider;
      if (provider?.isMetaMask) {
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const contract = new ethers.Contract(
          CollectionConfig.contractAddress!,
          ContractAbi,
          web3Provider
        ) as NftContractType;
        setWeb3Api(
          createWeb3State({
            provider,
            web3Provider,
            contract,
            isWeb3Loading: false,
          })
        );
      } else {
        setWeb3Api((api) => ({ ...api, isWeb3Loading: false }));
        console.error("Please install metamask");
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo<IWeb3Context>(() => {
    const { web3Provider, isWeb3Loading } = web3Api;
    const requireToInstallMetamask = !isWeb3Loading && !web3Provider;
    return {
      ...web3Api,
      requireToInstallMetamask,
      connectToMetamask: () => connectToWallet(web3Provider, requireToInstallMetamask),
    };
  }, [web3Api]);

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
  const { hooks } = useWeb3();
  return cb(hooks);
}

async function connectToWallet(provider: ethers.providers.Web3Provider, requireToInstallMetamask: boolean) {
  if (requireToInstallMetamask) {
    window.open(process.env.METAMASK_INSTALL_URL, '_blank').focus()
  }

  if (!provider) {
    console.error(
      "Cannot connect to Metamask, try to reload your browser please"
    );
    return;
  }

  try {
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    await signer.getAddress();
  } catch {
    location.reload();
  }
}
