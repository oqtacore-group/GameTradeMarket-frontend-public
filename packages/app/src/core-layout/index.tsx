import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import {
  AuthProvider,
  LoginProvider,
  LogsProvider,
  NotificationsProvider,
  api,
  sendReportWebVitals,
} from '@game-trade/lib';

import { Layout } from './layout';
import ErrorBoundary from '@game-trade/ui/errors/ErrorBoundary';

export function CoreLayout({ Component, pageProps }: AppProps) {
  useEffect(() => {
    sendReportWebVitals();
  }, []);
  return (
    <ApolloProvider client={api}>
      <AuthProvider>
        <LoginProvider>
          <LogsProvider>
            <NotificationsProvider>
              <Layout {...pageProps}>
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </Layout>
            </NotificationsProvider>
          </LogsProvider>
        </LoginProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
