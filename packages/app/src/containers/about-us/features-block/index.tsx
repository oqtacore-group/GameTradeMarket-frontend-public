import React from 'react';
import { useTranslation } from 'next-i18next';
import { FeaturesBlockWrapper } from './style';
import IconTradeSvg from '@root/public/imgs/about-us/icon_trade.svg';
import IconAuctionSvg from '@root/public/imgs/about-us/icon_auction.svg';
import IconNftWalletsSvg from '@root/public/imgs/about-us/icon_nft-wallets.svg';
import IconCommunitySvg from '@root/public/imgs/about-us/icon_community.svg';
import IconTrustSvg from '@root/public/imgs/about-us/icon_trust.svg';
import IconCustomizabilitySvg from '@root/public/imgs/about-us/icon_customizability.svg';
import { Headline } from '../style';
import { GridImageTextComponent, IContent } from '@game-trade/ui/elements/grid-image-text';

const features: IContent[] = [
  {
    icon: <IconTradeSvg />,
    title: 'buySellTrade.title',
    description: 'buySellTrade.description',
  },
  {
    icon: <IconAuctionSvg />,
    title: 'fixedPriceAuction.title',
    description: 'fixedPriceAuction.description',
  },
  {
    icon: <IconNftWalletsSvg />,
    title: 'multipleCryptoWallets.title',
    description: 'multipleCryptoWallets.description',
  },
  {
    icon: <IconCommunitySvg />,
    title: 'notJust.title',
    description: 'notJust.description',
  },
  {
    icon: <IconTrustSvg />,
    title: 'trust.title',
    description: 'trust.description',
  },
  {
    icon: <IconCustomizabilitySvg />,
    title: 'customizability.title',
    description: 'customizability.description',
  },
];

export const FeaturesBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.features' });
  return (
    <FeaturesBlockWrapper>
      <Headline data-text={t('feature')}>{t('feature')}</Headline>
      <GridImageTextComponent items={features} />
    </FeaturesBlockWrapper>
  );
};
