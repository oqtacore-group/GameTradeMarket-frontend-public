import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';

import { URLS } from './chains';

const getChain = () => {
  const result = Object.keys(URLS).reduce<{ [chainId: number]: string }>((accumulator, chainId) => {
    accumulator[Number(chainId)] = URLS[Number(chainId)][0];
    return accumulator;
  }, {});
  return result;
};

export const [walletConnect, hooks] = initializeConnector<any>(
  (actions: any) =>
    new WalletConnect(actions, {
      rpc: getChain(),
    }),
  Object.keys(URLS).map((chainId) => Number(chainId))
);
