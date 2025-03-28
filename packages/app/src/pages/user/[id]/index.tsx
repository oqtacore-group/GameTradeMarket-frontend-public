import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useAuthContext, useLoginContext } from '@game-trade/lib';
import { useRouter } from 'next/router';

import { ProfileContainer } from '@/containers/profile';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getServerSideProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['profilePage'],
        nextI18NextConfig
      )),
    },
  };
}

// "user" in pathname matches with Profile component
const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();
  const { onShowLoginWindow } = useLoginContext();

  useEffect(() => {
    if (!isAuthenticated) {
      onShowLoginWindow();
    }
  }, [isAuthenticated]);

  if (!id) {
    return null;
  }

  return <ProfileContainer userId={id as string} />;
};

export default Profile;
