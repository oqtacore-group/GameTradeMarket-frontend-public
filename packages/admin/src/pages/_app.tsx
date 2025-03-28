import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider, LoginProvider, LogsProvider, api } from '@game-trade/lib';
import { useAuthContext } from '@game-trade/lib/providers/auth';
import '@game-trade/ui/src/styles/font.css';

import { GlobalStyleApp } from '@/core-layout/style';
import { CoreLayout } from '@/core-layout';
import { LoginContainer } from '@/containers/login';
import { SidebarProvider } from '@/providers/sidebar';

const theme = {};

const MainRouteSelector: React.FC<{ props: AppProps }> = ({ props }) => {
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();

  return !isAuthenticated ? <LoginContainer /> : <CoreLayout {...props} />;
};

const App = (props: AppProps) => {
  return (
    <>
      <GlobalStyleApp />

      <ThemeProvider theme={theme}>
        <ApolloProvider client={api}>
          <AuthProvider>
            <LoginProvider>
              <LogsProvider>
                <SidebarProvider>
                  <MainRouteSelector props={props} />
                </SidebarProvider>
              </LogsProvider>
            </LoginProvider>
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default App;
