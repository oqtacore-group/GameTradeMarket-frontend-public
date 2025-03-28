import HeadComponent from '@/core-layout/head';
import React from 'react';
import { IMetaTags } from '@/core-layout/interfaces';
import { useRouter } from 'next/router';

export const HeadMarketplace = ({ gameName }: { gameName: string | null | undefined }) => {
  const router = useRouter();
  const title = `${gameName} game items`;
  const metaTags: IMetaTags = {
    title,
    ogTitle: title,
    ogDescription: `Discover, buy, sell and trade ${gameName} in-game NFT items`,
    description: `Discover, buy, sell and trade ${gameName} in-game NFT items`,
    ogImage: 'https://s3.amazonaws.com/storage.gametrade.market/images/Gametrademarket.webp',
    ogUrl: `https://${
      process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
    }gametrade.market`,
    host: router.asPath,
  };

  return <HeadComponent metaTags={metaTags} />;
};
