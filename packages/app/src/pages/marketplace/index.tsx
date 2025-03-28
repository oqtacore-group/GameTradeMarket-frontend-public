import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';

import { api, DEFAULT_GAME_CODE, DEFAULT_GAME_NAME } from '@game-trade/lib';
import {
  GamesListDocument,
  GamesListQuery,
  GamesListQueryVariables,
} from '@game-trade/lib/codegen-types';

export async function getServerSideProps(ctx: any) {
  const { data } = await api.query<GamesListQuery, GamesListQueryVariables>({
    query: GamesListDocument,
    fetchPolicy: 'no-cache',
    variables: { gameCode: DEFAULT_GAME_CODE },
  });
  const dataGameList = data;
  const game =
    dataGameList?.games?.edges?.node?.length && (dataGameList?.games?.edges?.node[0] as any);
  const gameCode = game.code || DEFAULT_GAME_CODE;
  const gameName = game?.name.replace(/\s+/g, '-') || DEFAULT_GAME_NAME;

  return {
    redirect: {
      destination: `/marketplace/${gameName}?gameCode=${gameCode}`,
      permanent: true,
    },
    props: {
      serverSideData: {
        gameName,
        gameCode,
      },
    },
  };
}

function RedirectPage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  useEffect(() => {
    router.push(
      '/marketplace/[gameName]',
      `/marketplace/${serverSideData.gameName}?gameCode=${serverSideData.gameCode}`
    );
  });
  return <></>;
}

export default RedirectPage;
