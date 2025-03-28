import type { Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect';

export type TConnector = 'MetaMask' | 'WalletConnect';
export interface IPropsCustomWalletConnectorProvider {
  isDebug?: boolean;
  children: any;
}

export interface IWalletConnectorProps {
  currentConnector: string;
  connector: MetaMask | WalletConnect;
  setConnector: (connector: TConnector) => void;
  activateConnector: (connector?: TConnector) => void;
  deactivateConnector: (connector?: TConnector) => void;
  accounts: ReturnType<Web3ReactHooks['useAccounts']>;
  account: ReturnType<Web3ReactHooks['useAccount']>;
  provider: ReturnType<Web3ReactHooks['useProvider']>;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  chainId: ReturnType<Web3ReactHooks['useChainId']>;
  error: ReturnType<Web3ReactHooks['useError']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
}
