import React from 'react';

import { DevelopersContainer } from '@/containers/developers';

import { IMetaTags } from '@/core-layout/interfaces';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getStaticProps(context: any) {
  const metaTags: IMetaTags = {
    title: 'Developers',
    ogTitle: 'Developers',
    ogDescription:
      'We are always looking at all new and promising projects. Before adding a game to our platform, we research its gameplay, game economy and community.',
    description:
      'We are always looking at all new and promising projects. Before adding a game to our platform, we research its gameplay, game economy and community.',
    ogImage: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
    ogUrl: `https://${
      process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
    }gametrade.market`,
  };

  return {
    props: {
      metaTags,
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['aboutUsPage'],
        nextI18NextConfig
      )),
    },
  };
}

function DevelopersPage() {
  return <DevelopersContainer />;
}

export default DevelopersPage;
