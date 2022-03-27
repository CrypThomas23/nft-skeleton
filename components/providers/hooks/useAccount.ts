import { ExternalProvider } from "@ethersproject/providers/lib/web3-provider";
import { useEffect } from "react";
import useSWR from "swr";
import { ethers } from "ethers";


export interface IAccountData {
  data: string;
  error: any;
  isAdmin: boolean;
}

const adminAddresses = {
  "0x2597d2254b58de8467e979ce5f19a689beab14ef3a0f19ea2a808d115da97059": true,
};

export const handler =
  (web3: ethers.providers.Web3Provider, provider: ExternalProvider) => (): IAccountData => {
    const { data, mutate, error } = useSWR(
      () => (web3 ? "web3/accounts" : null),
      async () => {
        const accounts = await web3.listAccounts();
        const account = accounts[0];

        if (!account) {
          throw new Error(
            "Cannot retreive an account. Please refresh the browser."
          );
        }

        return account;
      }
    );

    useEffect(() => {
      const mutator = (accounts) => mutate(accounts[0] ?? null);
      // @ts-ignore
      provider?.on("accountsChanged", mutator);

      return () => {
        // @ts-ignore
        provider?.removeListener("accountsChanged", mutator);
      };
    }, [provider]);

    return {
      data,
      error,
      isAdmin: (data && adminAddresses[ethers.utils.keccak256(data)]) ?? false,
    };
  };
