import Image from 'next/image';
import BgAnimationGif from '@root/public/imgs/about-us/bg_animation.gif';
import { BackgroundAnimationComponent } from './style';
import React from 'react';

export const BackgroundAnimation = () => {
  return (
    <BackgroundAnimationComponent>
      <Image layout="fill" objectFit="cover" src={BgAnimationGif} alt="background space" />
    </BackgroundAnimationComponent>
  );
};
