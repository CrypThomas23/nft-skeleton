import { useWalletInfo } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers/web3";
import { showShortAdress } from "@utils/short-address";
import React, { useEffect, useState } from "react";

export default function ConnectButton() {
  const [buttonText, setButtonText] = useState<string>("");
  const { connectToMetamask, requireToInstallMetamask } = useWeb3();
  const { hasConnectedAccount, account } = useWalletInfo();
  const { isWeb3Loading } = useWeb3();
  

  useEffect(() => {
    const getButtonText = (): string => {
      if (isWeb3Loading) {
        return "Loading...";
      }
      if (requireToInstallMetamask) {
        return "Install Metamask";
      }
      if (hasConnectedAccount) {
        return `${showShortAdress(account.address)}`;
      }
      return "Connect";
    };

    setButtonText(getButtonText());
  }, [
    requireToInstallMetamask,
    hasConnectedAccount,
    account.address,
    isWeb3Loading,
  ]);
  return <button onClick={connectToMetamask}>{buttonText}</button>;
}
