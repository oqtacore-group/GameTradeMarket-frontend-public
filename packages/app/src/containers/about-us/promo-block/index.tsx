import React from 'react';
import {
  WrapperContent,
  Headline,
  TextWrapper,
  MascotWrapper,
  ExploreButton,
  Mascot,
  LineBreakHeadlineMobile,
  LineBreakHeadline,
} from './style';
import { routes } from '@game-trade/lib';
import MascotSvg from '@root/public/imgs/about-us/mascot-gtm.svg';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

export const PromoBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.promoBlock' });
  return (
    <WrapperContent>
      <TextWrapper>
        <Headline>
          {t('headline.part_1')} <LineBreakHeadlineMobile /> {t('headline.part_2')}{' '}
          <LineBreakHeadline /> {t('headline.part_3')}
          <LineBreakHeadlineMobile /> {t('headline.part_4')} <span>{t('headline.part_5')}</span>
        </Headline>
        <p>
          {t('description.part_1')} <br /> {t('description.part_2')}
        </p>
        <Link href={routes.marketplace}>
          <ExploreButton>{t('explore')}</ExploreButton>
        </Link>
      </TextWrapper>
      <MascotWrapper>
        <Mascot>
          <MascotSvg />
        </Mascot>
      </MascotWrapper>
    </WrapperContent>
  );
};
