import Image from 'next/image';
import React from 'react';
import {
  WhatAreNftBlockWrapper,
  ImagesWrapper,
  ImageWrapper,
  Card,
  TextWrapper,
  TextContent,
  ImageCardWrapper,
} from './style';
import { HeadlineGradient, Headline, ShadowBorder } from '../style';
import { COLORS } from '@game-trade/ui';
import nftWindUpCatImg from '@root/public/imgs/about-us/nft_wind-up_cat.webp';
import nftPickaxeImg from '@root/public/imgs/about-us/nft_pickaxe.webp';
import nftElixirImg from '@root/public/imgs/about-us/nft_elixir.webp';
import nftWeaponsImg from '@root/public/imgs/about-us/nft_weapons.webp';
import { useTranslation } from 'next-i18next';

export const WhatAreNftBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.whatAreNftBlock' });

  return (
    <WhatAreNftBlockWrapper>
      <ImagesWrapper>
        <ImageWrapper justifyContent={true}>
          <Image layout={'intrinsic'} src={nftWindUpCatImg} alt="nft wind up cat" />
        </ImageWrapper>
        <ImageWrapper>
          <Image layout={'responsive'} src={nftPickaxeImg} alt="nft pickaxe" />
          <Image layout={'responsive'} src={nftElixirImg} alt="nft elixir" />
        </ImageWrapper>
        <ImageWrapper>
          <Card>
            <ShadowBorder color={COLORS.shadowPurple} item={1} />
            <ShadowBorder color={COLORS.shadowPurple} item={2} />
            <ImageCardWrapper>
              <Image
                layout="fill"
                objectFit="contain"
                src={
                  'https://storage.gametrade.market/images/GALAXY_FIGHT_CLUB/0x3702f4c46785bbd947d59a2516ac1ea30f2babf2/617612.webp'
                }
                alt={'nft-card image'}
                unoptimized={true}
                priority={true}
              />
            </ImageCardWrapper>
          </Card>
          <div>
            <Image layout={'responsive'} src={nftWeaponsImg} alt="nft weapons" />
          </div>
        </ImageWrapper>
      </ImagesWrapper>
      <TextWrapper>
        <TextContent>
          <HeadlineGradient>
            {t('headline.part_1')} <br /> {t('headline.part_2')}
          </HeadlineGradient>
          <Headline data-text={t('subHeadline')}>{t('subHeadline')}</Headline>
          <p>{t('description')}</p>
        </TextContent>
      </TextWrapper>
    </WhatAreNftBlockWrapper>
  );
};
