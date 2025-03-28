import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuthContext, useLoginContext } from '@game-trade/lib';

import { AccountContainer } from '@/containers/account';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

const Account: NextPage = () => {
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();
  const { onShowLoginWindow } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      onShowLoginWindow();
    }
  }, [isAuthenticated]);

  return <AccountContainer />;
};

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['accountPage'],
        nextI18NextConfig
      )),
    },
  };
}

export default Account;
