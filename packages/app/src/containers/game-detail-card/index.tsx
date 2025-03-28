import { GameDetailCardContainerWrapper, GameDetailCard } from './style';
import { GameCardQuery, useGamesListQuery, useGameCardQuery } from '@game-trade/lib/codegen-types';
import { useRouter } from 'next/router';
import { TitleGameItem } from './item-game-title';
import { GameDetailCardContent } from './content';
import { ItemDevelopersBlog } from './item-developers-blog';
import { GameBlogPostsProvider, routes } from '@game-trade/lib';
import { Reviews } from './reviews';
import { ItemCards } from '@/containers/game-detail-card/item-token-cards';
import { BreadCrumbs } from '@game-trade/ui';
import React from 'react';
import { BuyingCoinProvider } from '@game-trade/lib/providers/buying-coin';
import { BuyingCoin } from '@/containers/game-detail-card/buying-coin';
import { i18next } from '@game-trade/lib/services/i18n/index.js';

export interface IProps {
  serverSideData?: {
    gameCard: GameCardQuery;
    gameCode?: string;
  };
}

export default function GameDetailCardContainer({ serverSideData }: IProps) {
  const router = useRouter();
  const { gameName } = router.query;

  const { data: dataGameList } = useGamesListQuery({
    variables: {
      name: gameName as string,
    },
  });

  const game = dataGameList?.games?.edges.node && dataGameList?.games?.edges.node[0];

  const { data: getDataGameCard } = useGameCardQuery({
    variables: { code: game?.code as string },
    fetchPolicy: 'no-cache',
    returnPartialData: true,
  });

  const gameCard =
    typeof window === 'undefined' ? serverSideData?.gameCard.gameCard : getDataGameCard?.gameCard;

  const gameCode = typeof window === 'undefined' ? serverSideData?.gameCode : game?.code;

  return (
    <GameDetailCard>
      <BreadCrumbs
        crumbs={[
          {
            label: `${i18next.t('translation.breadCrumbs.games', { ns: 'elements' })}`,
            href: routes.games,
          },
          {
            label:
              game?.name || `${i18next.t('translation.breadCrumbs.noName', { ns: 'elements' })}`,
            href: null,
          },
        ]}
      />
      <GameDetailCardContainerWrapper>
        <TitleGameItem gameName={game?.name} verify={gameCard?.is_partner} />

        <GameDetailCardContent gameCard={gameCard} gameCode={gameCode} game={game} />

        <BuyingCoinProvider>
          <BuyingCoin currencies={gameCard && gameCard.currencies} gameCode={gameCode} />
        </BuyingCoinProvider>

        <GameBlogPostsProvider>
          <ItemDevelopersBlog gameCode={gameCode} />
        </GameBlogPostsProvider>

        <ItemCards game={game} />

        <Reviews gameCode={gameCode} />
      </GameDetailCardContainerWrapper>
    </GameDetailCard>
  );
}
