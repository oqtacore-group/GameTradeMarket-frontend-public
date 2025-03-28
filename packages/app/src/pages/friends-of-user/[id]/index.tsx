import React, { useEffect } from 'react';
import { NextPage } from 'next';

import { useAuthContext, useLoginContext } from '@game-trade/lib';
import { FriendsOfUserContainer } from '@/containers/friends-of-user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['profilePage', 'friendsOfUser'],
        nextI18NextConfig
      )),
    },
  };
}

const FriendsOfUser: NextPage = () => {
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();
  const { onShowLoginWindow } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      onShowLoginWindow();
    }
  }, [isAuthenticated]);

  return isAuthenticated ? <FriendsOfUserContainer /> : null;
};

export default FriendsOfUser;
