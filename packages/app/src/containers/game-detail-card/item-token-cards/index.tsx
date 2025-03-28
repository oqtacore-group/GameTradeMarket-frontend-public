import {
  SubHeadline,
  ButtonViewAll,
  CardsCarouselWrapper,
} from '@/containers/game-detail-card/style';
import { routes } from '@game-trade/lib';
import Link from 'next/link';
import { Card, useGetGameTokenCardsQuery } from '@game-trade/lib/codegen-types';
import React from 'react';
import { CarouselTokensCard } from '@game-trade/ui';
import { useTranslation } from 'next-i18next';

interface IProps {
  game?: any;
}

export const ItemCards = ({ game }: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.carousel' });
  const { data: getDataListTokensCards } = useGetGameTokenCardsQuery({
    variables: {
      offset: 0,
      first: 20,
      gameCode: game?.code,
    },
  });

  const dataListTokensCards = getDataListTokensCards || null;
  const listTokensCards = dataListTokensCards?.gameTokenCards?.edges?.node;

  if (!listTokensCards || !listTokensCards.length || !game || !game.name) return <></>;

  return (
    <CardsCarouselWrapper>
      <h3>{t('title')}</h3>

      <SubHeadline>
        <p>{t('subTitle')}</p>
        {game && (
          <Link
            href={{ pathname: routes.marketplaceGameName }}
            as={`${routes.marketplace}/${encodeURIComponent(
              game.name.replace(/\s+/g, '-')
            )}?gameCode=${encodeURIComponent(game.code.replaceAll(/\s/g, '_'))}`}
            passHref={true}>
            <ButtonViewAll>{t('view')}</ButtonViewAll>
          </Link>
        )}
      </SubHeadline>

      <CarouselTokensCard data={listTokensCards as Card[]} gameName={game.name} />
    </CardsCarouselWrapper>
  );
};
