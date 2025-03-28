import type { FC, ReactNode } from 'react';
import React, { createContext, useMemo } from 'react';

import { ConnectionProvider, WalletProvider, useLocalStorage } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { WalletModalProvider as ReactUIWalletModalProvider } from '@solana/wallet-adapter-react-ui';

export interface SolanaAutoConnectContextState {
  autoConnect: boolean;
  setAutoConnect(autoConnect: boolean): void;
}

export const SolanaAutoConnectContext = createContext<SolanaAutoConnectContextState>(
  {} as SolanaAutoConnectContextState
);

export const SolanaAutoConnectProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);

  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network]);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={true}>
        <ReactUIWalletModalProvider>
          <SolanaAutoConnectContext.Provider value={{ autoConnect, setAutoConnect }}>
            {children}
          </SolanaAutoConnectContext.Provider>
        </ReactUIWalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
