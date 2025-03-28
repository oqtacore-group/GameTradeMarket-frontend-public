import type { AppProps } from 'next/app';
import { SafeHydrate } from '@game-trade/ui';

import { Layout } from './layout';

export const CoreLayout = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout {...pageProps}>
      <SafeHydrate>
        <Component {...pageProps} />
      </SafeHydrate>
    </Layout>
  );
};
