import React from 'react';
import type { NextPage } from 'next';

import { RoadmapContainer } from '@/containers/roadmap';
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

  const googleProductInformationJSONLD = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://gametrade.market/#organization',
      name: 'GameTrade Market',
      legalName: 'GameTrade SA',
      url: 'https://gametrade.market/roadmap/',
      logo: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
      description: description,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'technical support',
        email: 'support@gametrade.market',
      },
      founders: {
        '@type': 'Person',
        name: 'Gleb Doykhen',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Chemin de la Chenalette 36, c/o GAVA Gestion & Conseils Giuseppe Alfieri',
        addressLocality: 'Prangins',
        addressRegion: 'Vaud',
        postalCode: '1197',
        addressCountry: 'Switzerland',
      },
      sameAs: [
        'https://twitter.com/GameTradeMarket',
        'https://discord.gg/gametrade',
        'https://www.linkedin.com/company/gametrade-market/',
        'https://gametrademarket.medium.com/',
        'https://calendly.com/gametrademarket/',
        'https://www.youtube.com/@gametrademarket9235',
      ],
    },
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      '@id': 'https://gametrade.market/#website',
      url: 'https://gametrade.market/roadmap/',
      name: 'GameTrade Market',
      image: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
      description: description,
      mainEntity: {
        '@context': 'http://schema.org',
        '@type': 'localBusiness',
        name: 'Gametrade Market',
        image: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Chemin de la Chenalette 36, c/o GAVA Gestion & Conseils Giuseppe Alfieri',
          addressLocality: 'Prangins',
          addressRegion: 'Vaud',
          postalCode: '1197',
          addressCountry: 'Switzerland',
        },
      },
    },
  ];

  return {
    props: {
      metaTags,
      googleProductInformationJSONLD,
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['roadmapPage'],
        nextI18NextConfig
      )),
    },
  };
}

const Roadmap: NextPage = () => <RoadmapContainer />;

export default Roadmap;
