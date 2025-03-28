import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next';

import { api } from '@game-trade/lib';
import {
  GamesListDocument,
  GamesListQuery,
  GamesListQueryVariables,
} from '@game-trade/lib/codegen-types';

export async function getServerSideProps(ctx: any) {
  const { network, gameContract } = ctx.query;

  const { data: dataGameList } = await api.query<GamesListQuery, GamesListQueryVariables>({
    query: GamesListDocument,
    fetchPolicy: 'no-cache',
    variables: {
      contract: gameContract as string,
      blockchain: network as string,
    },
  });

  if (dataGameList?.games?.edges?.node && dataGameList?.games?.edges?.node?.length !== 0) {
    const gameName = dataGameList?.games?.edges?.node[0].name.replace(/\s+/g, '-');

    return {
      redirect: {
        destination: `/games/${gameName}`,
        permanent: true,
      },
      props: {
        serverSideData: {
          gameName,
        },
      },
    };
  } else {
    return {
      redirect: {
        destination: `/games`,
        permanent: true,
      },
    };
  }
}

function RedirectPage({ serverSideData }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  useEffect(() => {
    router.push('/games/[gameName]', `/games/${serverSideData.gameName}`);
  });
  return <></>;
}

export default RedirectPage;
