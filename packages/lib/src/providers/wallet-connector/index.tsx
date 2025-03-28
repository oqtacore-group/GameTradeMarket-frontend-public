import React, { useState, createContext, useContext, useEffect } from 'react';

import { hooks as metaMaskHooks, metaMask } from '../../connectors/metaMask';
import { hooks as walletConnectHooks, walletConnect } from '../../connectors/walletConnect';

import {
  IWalletConnectorProps,
  TConnector,
  IPropsCustomWalletConnectorProvider,
} from './interfaces';

const CONNECTORS = {
  MetaMask: metaMask,
  WalletConnect: walletConnect,
};

const CONNECTORS_HOOKS = {
  MetaMask: metaMaskHooks,
  WalletConnect: walletConnectHooks,
};

export const WalletConnectorContext = createContext<IWalletConnectorProps>(
  {} as IWalletConnectorProps
);
const Provider = WalletConnectorContext.Provider;
export const useCustomWalletConnectorProvider = () => useContext(WalletConnectorContext);

export const CustomWalletConnectorProvider = ({
  children,
  isDebug,
}: IPropsCustomWalletConnectorProvider) => {
  const [currentConnector, setCurrentConnector] = useState<TConnector>('MetaMask');

  const {
    useChainId,
    useAccounts,
    useAccount,
    useError,
    useIsActivating,
    useIsActive,
    useProvider,
    useENSNames,
  } = CONNECTORS_HOOKS[currentConnector];

  const chainId = useChainId();
  const accounts = useAccounts();
  const account = useAccount();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();
  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  useEffect(() => {
    if (isDebug) {
      // console.log('currentConnector', currentConnector);
      // console.log('account', account);
      // console.log('error', error);
      // console.log('isActive', isActive);
      // console.log('isActivating', isActivating);
    }
    const handleAccountChange = (account: string) => {
      // console.log('metaMask.provider?.on -> accountsChanged', account);
    };

    const handleDisconnect = (code: number, reason: string) => {
      // console.log('metaMask.provider?.on -> disconnect', code, reason);
    };

    CONNECTORS[currentConnector]?.provider?.on('accountsChanged', handleAccountChange);
    CONNECTORS[currentConnector]?.provider?.on('disconnect', handleDisconnect);

    return () => {
      CONNECTORS[currentConnector]?.provider?.off &&
        CONNECTORS[currentConnector]?.provider?.off('accountsChanged', handleAccountChange);
      CONNECTORS[currentConnector]?.provider?.off &&
        CONNECTORS[currentConnector]?.provider?.off('disconnect', handleDisconnect);
    };
  }, [currentConnector, account, error, isActive, provider]);

  const setConnector = (connector: TConnector) => {
    setCurrentConnector(connector);
  };

  const activateConnector = async (connector?: TConnector) => {
    connector && setConnector(connector);
    try {
      await CONNECTORS[connector || currentConnector].activate();
    } catch (e) {
      // console.log('activateConnector', e);
    }
  };

  const deactivateConnector = async (connector?: TConnector) => {
    try {
      await CONNECTORS[connector || currentConnector].deactivate();
    } catch (e) {
      // console.log('deactivateConnector', e);
    }
  };

  const props = {
    currentConnector,
    connector: CONNECTORS[currentConnector],
    setConnector,
    activateConnector,
    deactivateConnector,
    chainId,
    accounts,
    account,
    error,
    isActivating,
    isActive,
    provider,
    ENSNames,
  };

  return <Provider value={{ ...props }}>{children}</Provider>;
};
