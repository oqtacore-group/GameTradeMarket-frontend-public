import { TitleGameItemsWrapper, TitleGameName, TitleGameItemsCount } from './style';
import { routes } from '@game-trade/lib';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameName: string | undefined | null;
  itemsCount: number | undefined | null;
  loading?: boolean;
}

export const TitleGameItems = (props: IProps) => {
  const { t } = useTranslation('marketplacePage', { keyPrefix: 'translation' });

  const { gameName = '', itemsCount = 0 } = props;

  return (
    <TitleGameItemsWrapper>
      <Link
        href={{ pathname: `${routes.games}/[gameName]` }}
        as={`${routes.games}/${gameName?.replace(/\s+/g, '-')}`}
        passHref={true}>
        <TitleGameName>{gameName}</TitleGameName>
      </Link>
      {!!itemsCount && <TitleGameItemsCount>{`${itemsCount} ${t('items')}`}</TitleGameItemsCount>}
    </TitleGameItemsWrapper>
  );
};
