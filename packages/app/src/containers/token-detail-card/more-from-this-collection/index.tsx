import React from 'react';
import { CarouselTokensCard } from '@game-trade/ui';
import { Card } from '@game-trade/lib/src/codegen-types';

import { WrapperCarousel, WrapperHeadline, Headline } from './style';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameName: string | undefined;
  data: Card[];
}

export const Carousel = (props: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const { gameName, data } = props;

  return (
    <WrapperCarousel>
      <WrapperHeadline>
        <Headline>{t('moreCollection')}</Headline>
      </WrapperHeadline>

      <CarouselTokensCard data={data} gameName={gameName} />
    </WrapperCarousel>
  );
};
