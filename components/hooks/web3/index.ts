import { IAccountData } from "@components/providers/hooks/useAccount";
import { INetworkData } from "@components/providers/hooks/useNetwork";
import { useHooks } from "@components/providers/web3";

interface EnhanceData {
  isEmpty: boolean;
  hasInitialResponse: boolean;
}

const _isEmpty = (data): boolean => {
  return (
    data == null ||
    data === "" ||
    (Array.isArray(data) && data.length === 0) ||
    (data.constructor === Object && Object.keys(data).length === 0)
  );
};

const enhanceHook = (swrRes) => {
  const { data, error } = swrRes;
  const hasInitialResponse = !!(data || error);
  const isEmpty = hasInitialResponse && _isEmpty(data);

  return {
    ...swrRes,
    isEmpty,
    hasInitialResponse,
  };
};

export const useNetwork = () => {
  const swrRes: INetworkData & EnhanceData = enhanceHook(
    useHooks((hooks) => hooks.useNetwork)()
  );
  return {
    network: swrRes.data,
    targetNetwork: swrRes.targetNetwork,
    isSupported: swrRes.isSupported,
    isEmpty: swrRes.isEmpty,
    hasInitialResponse: swrRes.hasInitialResponse,
  };
};

export const useAccount = () => {
  const swrRes: IAccountData & EnhanceData = enhanceHook(
    useHooks((hooks) => hooks.useAccount)()
  );
  return {
    address: swrRes.data,
    isAdmin: swrRes.isAdmin,
    isEmpty: swrRes.isEmpty,
    hasInitialResponse: swrRes.hasInitialResponse,
  };
};

export const useWalletInfo = () => {
  const account = useAccount();
  const network = useNetwork();

  const isConnecting =
    !account.hasInitialResponse && !network.hasInitialResponse;

  return {
    account,
    network,
    isConnecting,
    hasConnectedAccount: !!account.address,
    hasConnectedWalletToTargetNetwork: !!(
      account.address && network.isSupported
    ),
  };
};
