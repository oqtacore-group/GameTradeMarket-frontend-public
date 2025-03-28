import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import { useAuthContext, useLoginContext } from '@game-trade/lib';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ManageFriendsContainer } from '@/containers/manage-friends';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['manageFriendsPage'],
        nextI18NextConfig
      )),
    },
  };
}

const ManageFriends: NextPage = () => {
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();
  const { onShowLoginWindow } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      onShowLoginWindow();
    }
  }, [isAuthenticated]);

  return <ManageFriendsContainer />;
};

export default ManageFriends;
