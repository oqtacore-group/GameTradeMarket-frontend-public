import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider } from 'styled-components';

import { CoreLayout } from '@/core-layout';
import '../core-layout/fonts.css';

require('@solana/wallet-adapter-react-ui/styles.css');

const theme = {};

const App = (props: AppProps) => (
  <ThemeProvider theme={theme}>
    <CoreLayout {...props} />
  </ThemeProvider>
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default appWithTranslation(App);
