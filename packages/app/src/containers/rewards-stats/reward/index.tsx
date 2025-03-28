import {
  WrapperReward,
  ImageWrapper,
  Headline,
  Earn,
  RarityWrapper,
  Rarity,
  Available,
  Buttons,
  Regenerate,
} from './style';
import CatDisable from '@root/public/imgs/rewards/cat_disable.png';
import Image from 'next/image';
import React from 'react';
import { Button } from '@game-trade/ui';
import { SvgDiamond, SvgIconRefresh } from '@game-trade/icons';

export const Reward = () => {
  return (
    <WrapperReward>
      <Headline>Your Reward</Headline>
      <ImageWrapper>
        <Image layout="fill" objectFit="cover" src={CatDisable} alt="cat disable" />
      </ImageWrapper>
      <Earn>Earn 6 gems to generate your unique NFT</Earn>
      <RarityWrapper>
        NFT Rarity:
        <Rarity>Legendary</Rarity>
      </RarityWrapper>
      <Available>1500 NFT`s avaiaible for regeneration</Available>
      <Buttons>
        <Button>Reveal</Button>
        <Regenerate>
          <SvgIconRefresh />
          Regenerate 25 <SvgDiamond />
        </Regenerate>
      </Buttons>
    </WrapperReward>
  );
};
