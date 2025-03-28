import Image from 'next/image';
import React from 'react';
import { BackgroundBinaryStyle } from './style';
import BgBinaryImg from '@root/public/imgs/developers/bg_binary.webp';
import BgBinaryMobileImg from '@root/public/imgs/developers/bg_binary-mobile.webp';

export const BackgroundBinary = () => {
  return (
    <BackgroundBinaryStyle>
      <Image layout="fill" objectFit="cover" src={BgBinaryImg} alt="background binary" />
      <Image
        layout="fill"
        objectFit="cover"
        src={BgBinaryMobileImg}
        alt="background binary mobile"
      />
    </BackgroundBinaryStyle>
  );
};
