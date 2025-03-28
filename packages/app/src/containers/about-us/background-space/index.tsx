import Image from 'next/image';
import React from 'react';
import { BackgroundSpaceStyle } from './style';
import BgSpaceImg from '@root/public/imgs/about-us/bg_space.webp';
import BgSpaceMobileImg from '@root/public/imgs/about-us/bg_space-mobile.webp';

export const BackgroundSpace = () => {
  return (
    <BackgroundSpaceStyle>
      <Image layout="fill" objectFit="cover" src={BgSpaceImg} alt="background space" />
      <Image layout="fill" objectFit="cover" src={BgSpaceMobileImg} alt="background space mobile" />
    </BackgroundSpaceStyle>
  );
};
