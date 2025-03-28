import { InferGetServerSidePropsType } from 'next';
import { GamesListContainer } from '@/containers/games-list';
import { api } from '@game-trade/lib';
import {
  GetCatalogGamesDocument,
  GetCatalogGamesQuery,
  GetCatalogGamesQueryVariables,
  GetGameFiltersDocument,
  GetGameFiltersQuery,
  GetGameFiltersQueryVariables,
} from '@game-trade/lib/codegen-types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

export async function getServerSideProps(context: any) {
  const gameName = context?.query?.gameName;

  let gamesCards;
  let filters;

  if (typeof window === 'undefined') {
    const { data: dataFilters } = await api.query<
      GetGameFiltersQuery,
      GetGameFiltersQueryVariables
    >({
      query: GetGameFiltersDocument,
      fetchPolicy: 'no-cache',
    });
    filters = dataFilters;

    const { data: dataCatalogGames } = await api.query<
      GetCatalogGamesQuery,
      GetCatalogGamesQueryVariables
    >({
      query: GetCatalogGamesDocument,
      fetchPolicy: 'no-cache',
      variables: { name: gameName },
    });
    gamesCards = dataCatalogGames;
  }

  return {
    props: {
      serverSideData: {
        gamesCards,
        filters,
      },
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['gamesPage'],
        nextI18NextConfig
      )),
    },
  };
}

function GamesListPage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <GamesListContainer serverSideData={serverSideData} />;
}

export default GamesListPage;
