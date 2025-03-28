import React from 'react';
import type { NextPage } from 'next';

import { PolicyContainer } from '@/containers/policy';
import { SolanaAutoConnectProvider } from '@game-trade/lib';

const Policy: NextPage = () => (
  <SolanaAutoConnectProvider>
    <PolicyContainer />
  </SolanaAutoConnectProvider>
);

export default Policy;
