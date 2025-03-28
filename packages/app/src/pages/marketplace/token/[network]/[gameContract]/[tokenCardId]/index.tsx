import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { IMetaTags } from '@/core-layout/interfaces';

import {
  GetGameSimilarTokenCardsDocument,
  GetGameSimilarTokenCardsQuery,
  GetGameSimilarTokenCardsQueryVariables,
  GetDetailGameTokenCardQuery,
  GetDetailGameTokenCardDocument,
  GetDetailGameTokenCardQueryVariables,
  Card,
} from '@game-trade/lib/codegen-types';
import nextI18NextConfig from '@game-trade/config/next/i18next.js';
import { api, routes } from '@game-trade/lib';

const TokenCardDetailPage = dynamic(() => import('@/containers/token-detail-card'), { ssr: true });

export async function getServerSideProps(ctx: any) {
  const { gameContract, tokenCardId, network } = ctx.query;

  let similarNFTs: Card[] | [] = [],
    nft: Card;

  nft = await getNFTbyValue(tokenCardId, gameContract, network);

  if (!nft) {
    nft = await getNFTbyId(tokenCardId, gameContract);
  }

  if (nft) {
    similarNFTs = await getSimilarNFTs(nft?.id);
  }

  const { googleProductInformationJSONLD, metaTags } = getGoogleInfo(nft, ctx.resolvedUrl);

  return {
    props: {
      ...(await serverSideTranslations(
        ctx.locale ?? ctx.defaultLocale,
        ['tokenCardIdPage', 'accountPage'],
        nextI18NextConfig
      )),
      data: {
        nft,
        similarNFTs,
        gameContract,
        nftID: tokenCardId,
        blockchain: network,
      },
      redirectToTokenValue: !nft,
      metaTags,
      googleProductInformationJSONLD: googleProductInformationJSONLD
        ? googleProductInformationJSONLD
        : {},
    },
  };
}

function TokenCardIdPage({
  data,
  redirectToTokenValue,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (redirectToTokenValue) {
    return (
      <div style={{ textAlign: 'center', marginTop: '15rem' }}>
        <h2>There is no such token</h2>
        <p>
          <Link href={routes.marketplaceDefaultGameName}>
            <a>Go to Marketplace</a>
          </Link>
        </p>
      </div>
    );
  }
  return <TokenCardDetailPage data={data} />;
}

export default TokenCardIdPage;

async function getNFTbyValue(tokenValue: string, contract: string, blockchain: string) {
  const { data } = await api.query<
    GetDetailGameTokenCardQuery,
    GetDetailGameTokenCardQueryVariables
  >({
    query: GetDetailGameTokenCardDocument,
    fetchPolicy: 'no-cache',
    variables: { tokenValue, contract, blockchain },
  });

  return data?.gameTokenCard as Card;
}

async function getNFTbyId(id: string, contract: string) {
  const { data } = await api.query<
    GetDetailGameTokenCardQuery,
    GetDetailGameTokenCardQueryVariables
  >({
    query: GetDetailGameTokenCardDocument,
    fetchPolicy: 'no-cache',
    variables: { id, contract },
  });

  return data.gameTokenCard as Card;
}

async function getSimilarNFTs(id: string) {
  const { data } = await api.query<
    GetGameSimilarTokenCardsQuery,
    GetGameSimilarTokenCardsQueryVariables
  >({
    query: GetGameSimilarTokenCardsDocument,
    fetchPolicy: 'no-cache',
    variables: {
      offset: 0,
      first: 20,
      id,
    },
  });
  return data.gameSimilarTokenCards.edges.node as Card[];
}

function getGoogleInfo(card: any, host: string) {
  const gameName = card?.game_name;
  const title = `${gameName} - ${card?.name}` || 'NFT collection';
  const blockchain = card?.blockchain?.replace('_', ' ');
  const description = `${
    (card && card.description?.replace(/(\r\n|\n|\r)/gm, ' ')) ||
    `${card?.name} is the coolest item in the GameTrade Market.
    It's the legend of NFT items for the ${gameName} game. This token exists on the ${blockchain} blockchain`
  }`;
  const usdPrice = card?.coin_info?.usd_price;

  const metaTags: IMetaTags = {
    title,
    ogTitle: title,
    ogDescription: description,
    description,
    ogImage: `${card?.picture || ''}`,
    ogUrl: `https://${process.env.NEXT_PUBLIC_PATHNAME_PREFIX}gametrade.market/${blockchain}/${card?.contract}/${card?.token_value}`,
    host,
  };

  let googleProductInformationJSONLD;
  if (card) {
    googleProductInformationJSONLD = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${card?.name}`,
      image: [card?.picture || ''],
      description,
      mpn: card?.token_value,
      brand: {
        '@type': 'Brand',
        name: gameName || '',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4,
        bestRating: 5,
        reviewCount: 1,
      },
      offers: {
        '@type': 'Offer',
        url: `https://${process.env.NEXT_PUBLIC_PATHNAME_PREFIX}gametrade.market/${blockchain}/${card?.contract}/${card?.token_value}`,
        priceCurrency: 'USD',
        price: usdPrice ? usdPrice : 0,
        availability:
          usdPrice != null ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        priceValidUntil: `${new Date().getFullYear() + 1}`,
        seller: {
          '@type': 'Organization',
          name: 'Gametrade Market',
        },
      },
    };
  }

  return { googleProductInformationJSONLD, metaTags };
}
