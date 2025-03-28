import { InferGetServerSidePropsType } from 'next';
import { api } from '@game-trade/lib';
import {
  GamesListDocument,
  GamesListQuery,
  GamesListQueryVariables,
  GameCardQuery,
  GameCardQueryVariables,
  GameCardDocument,
} from '@game-trade/lib/codegen-types';
import { IMetaTags } from '@/core-layout/interfaces';
import { Product, WithContext } from 'schema-dts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';
import React from 'react';
import dynamic from 'next/dynamic';

const GameDetailCardPage = dynamic(() => import('@/containers/game-detail-card'), { ssr: true });

export async function getServerSideProps(ctx: any) {
  const { gameName } = ctx.query;

  const { data: dataGameList } = await api.query<GamesListQuery, GamesListQueryVariables>({
    query: GamesListDocument,
    fetchPolicy: 'no-cache',
    variables: {
      name: gameName as string,
    },
  });

  const game = dataGameList.games?.edges.node && dataGameList.games?.edges.node[0];

  const { data: dataGameCard } = await api.query<GameCardQuery, GameCardQueryVariables>({
    query: GameCardDocument,
    fetchPolicy: 'no-cache',
    variables: { code: game?.code },
  });

  const gameCard = dataGameCard?.gameCard ? dataGameCard?.gameCard : undefined;
  const reviewCount = gameCard?.count_review;
  const reviewRating = gameCard?.rating;
  const floorPrice = gameCard?.floor_price;

  const title = `${gameName}` || 'NFT game collection';
  const description = `${
    (gameCard && gameCard.description?.replace(/(\r\n|\n|\r)/gm, ' ').substring(0, 170)) ||
    `${gameName} is the legends of NFT collections. A lot of items, cool pictures it is all about ${gameName}`
  }`;
  const descriptionMeta = `${
    (gameCard && gameCard.description?.replace(/(\r\n|\n|\r)/gm, ' ')) ||
    `${gameName} is the legends of NFT collections. A lot of items, cool pictures it is all about ${gameName}`
  }`;

  const metaTags: IMetaTags = {
    title,
    ogTitle: title,
    ogDescription: descriptionMeta,
    description,
    ogImage: `${gameCard?.logo || ''}`,
    ogUrl: `https://${
      process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
    }gametrade.market/games/${gameName}`,
    host: ctx.resolvedUrl,
  };

  const googleProductInformationJSONLD: WithContext<Product> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: [gameCard?.logo || ''],
    description: descriptionMeta,
    brand: {
      '@type': 'Brand',
      name: title,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewRating ? reviewRating : 4,
      reviewCount: reviewCount ? reviewCount : 1,
    },
    offers: {
      '@type': 'Offer',
      url: `https://${
        process.env.NEXT_PUBLIC_PATHNAME_PREFIX ? process.env.NEXT_PUBLIC_PATHNAME_PREFIX : ''
      }gametrade.market/games/${gameName}`,
      priceCurrency: 'USD',
      price: floorPrice ? floorPrice : 0,
      availability:
        !floorPrice || floorPrice === '0'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      priceValidUntil: `${new Date().getFullYear() + 1}`,
    },
  };

  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale ?? ctx.defaultLocale,
        ['gamePage'],
        nextI18NextConfig
      )),
      serverSideData: {
        gameCard: dataGameCard,
        gameCode: game?.code ? game?.code : '',
      },
      metaTags,
      googleProductInformationJSONLD,
    },
  };
}

function GameCardIdPage({
  serverSideData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <GameDetailCardPage serverSideData={serverSideData} />;
}

export default GameCardIdPage;
