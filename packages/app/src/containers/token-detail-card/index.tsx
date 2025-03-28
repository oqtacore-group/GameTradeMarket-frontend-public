import React from 'react';
import {
  CustomWalletConnectorProvider,
  SnackStackProvider,
  SolanaAutoConnectProvider,
} from '@game-trade/lib';
import { Card } from '@game-trade/lib/codegen-types';

import { TokenCardDetailContainer } from './container';

export interface IProps {
  data: {
    nft: Card;
    similarNFTs: Card[] | [];
    gameContract: string;
    nftID: string;
    blockchain: string;
  };
}

export default function TokenCardDetailPage({ data }: IProps) {
  return (
    <CustomWalletConnectorProvider isDebug={true}>
      <SnackStackProvider>
        <SolanaAutoConnectProvider>
          <TokenCardDetailContainer data={data} />
        </SolanaAutoConnectProvider>
      </SnackStackProvider>
    </CustomWalletConnectorProvider>
  );
}
