import { useEffect } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

import { api, DEFAULT_GAME_CODE } from '@game-trade/lib';
import {
  GamesListDocument,
  GamesListQuery,
  GamesListQueryVariables,
  GetDetailGameTokenCardQuery,
  GetDetailGameTokenCardQueryVariables,
  GetDetailGameTokenCardDocument,
} from '@game-trade/lib/codegen-types';

export async function getServerSideProps(ctx: any) {
  const { gameName: gameNameQuery, tokenCardId } = ctx.query;
  const gameCode = gameNameQuery
    ? ((gameNameQuery as string).replace(/-/g, '_').toUpperCase() as string)
    : DEFAULT_GAME_CODE;

  const { data: dataGameList } = await api.query<GamesListQuery, GamesListQueryVariables>({
    query: GamesListDocument,
    fetchPolicy: 'no-cache',
    variables: {
      gameCode: gameCode,
    },
  });

  const game = dataGameList.games?.edges?.node && dataGameList.games?.edges?.node[0];

  const { data: dataGameTokenCard } = await api.query<
    GetDetailGameTokenCardQuery,
    GetDetailGameTokenCardQueryVariables
  >({
    query: GetDetailGameTokenCardDocument,
    variables: { id: tokenCardId, gameCode: game?.code },
  });

  const card = dataGameTokenCard?.gameTokenCard;

  return {
    redirect: {
      destination: `/marketplace/token/${card?.blockchain}/${card?.contract}/${card?.token_value}`,
      permanent: true,
    },
    props: {
      serverSideData: {
        card,
      },
    },
  };
}

function RedirectPage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  useEffect(() => {
    router.push(
      '/marketplace/nft-card/[network]/[gameContract]/[tokenCardId]',
      `/marketplace/token/${serverSideData?.card?.blockchain}/${serverSideData?.card?.contract}/${serverSideData?.card?.token_value}`
    );
  });
  return <></>;
}

export default RedirectPage;
