import { IWeb3State } from "../web3";
import { handler as createAccountHook } from "./useAccount";
import { handler as createNetworkHook } from "./useNetwork";

export const setupHooks = ({ web3Provider, provider }: Partial<IWeb3State>) => {
  return {
    useAccount: createAccountHook(web3Provider, provider),
    useNetwork: createNetworkHook(web3Provider, provider),
  };
};
