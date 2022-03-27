import { useEffect } from "react";
import useSWR from "swr";
import { ExternalProvider } from "@ethersproject/providers/lib/web3-provider";
import { ethers } from "ethers";

export interface INetworkData {
  data: string;
  error: any;
  targetNetwork: string;
  isSupported: boolean;
}

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.PUBLIC_TARGET_CHAIN_ID];

export const handler =
  (web3: ethers.providers.Web3Provider, provider: ExternalProvider) =>
  (): INetworkData => {
    const { data, error, mutate } = useSWR(
      () => (web3 ? "web3/network" : null),
      async () => {
        const network = await web3.getNetwork();

        if (!network?.chainId) {
          throw new Error(
            "Cannot retreive network. Please refresh the browser."
          );
        }

        return NETWORKS[network.chainId];
      }
    );

    useEffect(() => {
      // @ts-ignore
      provider?.on("chainChanged", (chainId) => mutate(parseInt(chainId, 16)));
    });

    return {
      data,
      error,
      targetNetwork,
      isSupported: data === targetNetwork,
    };
  };
