import React from 'react';
import { CustomWalletConnectorProvider } from '@game-trade/lib';

import { WalletList } from './list';

export default function WalletProfileTab() {
  return (
    <CustomWalletConnectorProvider isDebug={false}>
      <WalletList />
    </CustomWalletConnectorProvider>
  );
}
