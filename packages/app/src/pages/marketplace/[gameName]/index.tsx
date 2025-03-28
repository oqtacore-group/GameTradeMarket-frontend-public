import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { MarketplaceContainer } from '@/containers/marketplace';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import nextI18NextConfig from '@game-trade/config/next/i18next.js';
import {
  GamesListDocument,
  GamesListQuery,
  GamesListQueryVariables,
  GetSsrGameTokenCardsDocument,
  GetSsrGameTokenCardsQuery,
  GetSsrGameTokenCardsQueryVariables,
  GameTokenFiltersDocument,
  GameTokenFiltersQuery,
  GameTokenFiltersQueryVariables,
  GameTokenFacetsQuery,
  GameTokenFacetsQueryVariables,
  GameTokenFacetsDocument,
} from '@game-trade/lib/codegen-types';
import { api, DEFAULT_GAME_CODE } from '@game-trade/lib';
import { IMetaTags } from '@/core-layout/interfaces';
import { IGameItem } from '@game-trade/ui/components/filters-tokens-items/form/blocks/game';
import { getMetaTags } from '@game-trade/ui/modifiers/get-meta-tags';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getServerSideProps(ctx: any) {
  const gameCode = ctx?.query?.gameCode ? ctx?.query?.gameCode : DEFAULT_GAME_CODE;

  let gameList, game, gameTokenFilters, gameTokenFacets, gameTokenCards, title, description;
  let metaTags: IMetaTags;

  if (!gameList) {
    const { data: dataGameList } = await api.query<GamesListQuery, GamesListQueryVariables>({
      query: GamesListDocument,
      fetchPolicy: 'no-cache',
      variables: { first: 500, offset: 0 },
    });
    gameList = dataGameList;

    game =
      gameList.games?.edges.node?.length &&
      gameList.games?.edges?.node.find((item) => item.code === gameCode);

    const { data: dataGameTokenFilters } = await api.query<
      GameTokenFiltersQuery,
      GameTokenFiltersQueryVariables
    >({
      query: GameTokenFiltersDocument,
      fetchPolicy: 'no-cache',
    });

    gameTokenFilters = dataGameTokenFilters;

    const { data: dataGameTokenFacets } = await api.query<
      GameTokenFacetsQuery,
      GameTokenFacetsQueryVariables
    >({
      query: GameTokenFacetsDocument,
      variables: game ? { gameCode: game?.code as string } : { gameCode: '' },
      fetchPolicy: 'no-cache',
    });

    gameTokenFacets = dataGameTokenFacets;

    const { data: dataGameTokenCards } = await api.query<
      GetSsrGameTokenCardsQuery,
      GetSsrGameTokenCardsQueryVariables
    >({
      query: GetSsrGameTokenCardsDocument,
      variables: game ? { gameCode: game?.code as string, first: 5 } : undefined,
      fetchPolicy: 'no-cache',
    });

    gameTokenCards = dataGameTokenCards;

    title = game ? `${game?.name} game items` : 'There is no such game';
    description = game
      ? `Discover, buy, sell and trade ${game?.name} in-game NFT items`
      : 'Discover, buy, sell and trade NFT items';
    metaTags = getMetaTags({
      title,
      ogTitle: title,
      ogDescription: description,
      description,
      host: ctx.resolvedUrl,
    });

    return {
      props: {
        // ...(await serverSideTranslations(ctx?.locale, ['common'], nextI18NextConfig)),
        serverSideData: {
          gameList,
          gameTokenFacets,
          gameTokenFilters,
          gameTokenCards,
          game: game as IGameItem,
        },
        ...(await serverSideTranslations(
          ctx.locale ?? ctx.defaultLocale,
          ['marketplacePage'],
          nextI18NextConfig
        )),
        metaTags,
      },
    };
  }
}

function MarketplacePage({
  serverSideData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MarketplaceContainer serverSideData={serverSideData} />;
}

export default MarketplacePage;
