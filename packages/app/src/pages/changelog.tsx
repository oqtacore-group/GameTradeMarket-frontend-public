import React from 'react';
import type { NextPage } from 'next';

import { ChangelogContainer } from '@/containers/changelog';
import { IMetaTags } from '@/core-layout/interfaces';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getStaticProps(context: any) {
  const title = 'NFT in-game items marketplace';
  const description =
    'Discover, buy, sell and trade in-game NFTs. GameTrade is a specialized and convenient marketplace for trading virtual in-game NFTs.';

  const metaTags: IMetaTags = {
    title: title,
    ogTitle: title,
    ogDescription: description,
    description: description,
    ogImage: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
    ogUrl: `https://${
      process.env.PATHNAME_PREFIX ? process.env.PATHNAME_PREFIX : ''
    }gametrade.market`,
  };

  return {
    props: {
      metaTags,
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['changelogPage'],
        nextI18NextConfig
      )),
    },
  };
}

const Changelog: NextPage = () => <ChangelogContainer />;

export default Changelog;
