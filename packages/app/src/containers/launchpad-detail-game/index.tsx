import React from 'react';
import { CustomWalletConnectorProvider } from '@game-trade/lib';

import LaunchpadDetailGameContainer, { IProps } from './container';
import { WindowLaunchpadProvider } from '@game-trade/lib/providers/launchpad';

export default function LaunchpadDetailGamePage({ serverSideData }: IProps) {
  return (
    <CustomWalletConnectorProvider isDebug={true}>
      <WindowLaunchpadProvider>
        <LaunchpadDetailGameContainer serverSideData={serverSideData} />
      </WindowLaunchpadProvider>
    </CustomWalletConnectorProvider>
  );
}
