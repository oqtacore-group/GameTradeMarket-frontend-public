import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';

import { routes, useAuthContext, useLoginContext, parseJwt } from '@game-trade/lib';

import HeadComponent from '../head';
import { Footer } from '../footer';
import { Header } from '../header';
import { OnlineChat } from '../online-chat';
import { CookiesComponent } from '../cookies';
import { EventsOpenseaComponent } from '../events-opensea';
import { MenuProvider } from '../menu/provider';
import { Referral } from '../referral';
import { IPropsLayout } from '../interfaces';
import { RebootStyleApp } from '../reboot-style';
import { GlobalStyleApp } from '../global-style';

import { ImpersonationModeNotification, WrapperBottomBlocks } from './style';
import { LightsWrapper } from '../lights';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import NProgress from '@game-trade/ui/src/elements/nprogress';

export const Layout = (props: IPropsLayout) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    setToken,
    getUserInfoAction,
    authProviderData: { isAuthenticated },
  } = useAuthContext();

  //
  // Set impersonation nft-card if passed
  //

  const {
    asPath,
    events,
    query: { impersonationTokenType, impersonationToken },
  } = useRouter();

  const { query, pathname } = useRouter();
  const { onShowLoginWindow } = useLoginContext();

  //
  // Check if in impersonation mode
  //

  const [isImpersonationMode, setIsImpersonationMode] = useState(false);

  const checkIfImpersonationMode = useCallback(() => {
    const tokenObj = parseJwt(
      typeof window !== 'undefined' ? (localStorage.getItem('token') as string) : null
    );

    return tokenObj?.act;
  }, []);

  useEffect(() => {
    if (impersonationTokenType && impersonationToken) {
      setToken(impersonationTokenType + ' ' + impersonationToken);
      location.href = location.href.split('?')[0];
    }
  }, [impersonationTokenType, impersonationToken]);

  useEffect(() => {
    setIsImpersonationMode(checkIfImpersonationMode());
  }, [isAuthenticated]);

  useEffect(() => {
    setTimeout(() => {
      if (query?.login) {
        onShowLoginWindow();
      }
    }, 0);
  }, [query]);

  //
  // Get user info
  //

  useEffect(() => {
    isAuthenticated && getUserInfoAction();
  }, [isAuthenticated]);

  useEffect(() => {
    events.on('routeChangeStart', NProgress.start);
    events.on('routeChangeComplete', NProgress.done);
    events.on('routeChangeError', NProgress.done);
    return () => {
      events.off('routeChangeStart', NProgress.start);
      events.off('routeChangeComplete', NProgress.done);
      events.off('routeChangeError', NProgress.done);
    };
  }, [events]);

  return (
    <div style={{ position: 'relative' }}>
      {pathname !== routes.marketplaceGameName && (
        <HeadComponent
          metaTags={props.metaTags}
          googleProductInformationJSONLD={props.googleProductInformationJSONLD}
        />
      )}

      {pathname && <LightsWrapper pathname={pathname as string} />}
      <RebootStyleApp />
      <GlobalStyleApp />

      {isImpersonationMode && (
        <ImpersonationModeNotification>
          You are logged as admin in impersonate mode (read only)
        </ImpersonationModeNotification>
      )}

      <MenuProvider>
        <Header />
      </MenuProvider>

      <div style={{ minHeight: 'calc(100vh - 466px)' }}>{props.children}</div>

      <Footer />

      <WrapperBottomBlocks>
        {asPath === '/' && !isMobile && <EventsOpenseaComponent />}
        <CookiesComponent />
      </WrapperBottomBlocks>

      <Referral />

      <OnlineChat />
    </div>
  );
};
