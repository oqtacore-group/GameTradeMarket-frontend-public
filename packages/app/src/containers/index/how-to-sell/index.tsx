import WalletSvg from '@root/public/imgs/home/wallet.svg';
import GamePadSvg from '@root/public/imgs/home/gamepad.svg';
import ListSvg from '@root/public/imgs/home/list.svg';
import NftSvg from '@root/public/imgs/home/nft.svg';
import { Title, SubTitle } from '../style';
import {
  HowToSellWrapper,
  Step,
  StepWrapper,
  Line,
  ImageWrapper,
  Description,
  TextWrapper,
} from './style';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'next-i18next';

const steps = [
  {
    subTitle: 'setUpYourWallet.headline',
    img: <WalletSvg />,
    description: 'setUpYourWallet.description',
    width: null,
    line: true,
  },
  {
    subTitle: 'playAnNFTgame.headline',
    img: <GamePadSvg />,
    description: 'playAnNFTgame.description',
    width: null,
    line: true,
  },
  {
    subTitle: 'earnNFTitems.headline',
    img: <NftSvg />,
    description: 'earnNFTitems.description',
    width: 45,
    line: true,
  },
  {
    subTitle: 'listItemForSale.headline',
    img: <ListSvg />,
    description: 'listItemForSale.description',
    width: null,
    line: false,
  },
];

export const HowToSell = () => {
  const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <HowToSellWrapper>
      <Title data-text={t('playAndEarn')}>{t('playAndEarn')}</Title>
      <StepWrapper>
        {steps.map((item, index) => {
          if (isTablet) {
            return (
              <Step key={index} width={item.width}>
                <ImageWrapper>
                  {item.img}
                  {item.line && <Line />}
                </ImageWrapper>
                <TextWrapper>
                  <SubTitle>{t(item.subTitle)}</SubTitle>
                  <Description>{t(item.description)}</Description>
                </TextWrapper>
              </Step>
            );
          }

          return (
            <Step key={index} width={item.width}>
              <SubTitle>{t(item.subTitle)}</SubTitle>
              <ImageWrapper>
                {item.img}
                {item.line && <Line />}
              </ImageWrapper>
              <Description>{t(item.description)}</Description>
            </Step>
          );
        })}
      </StepWrapper>
    </HowToSellWrapper>
  );
};
