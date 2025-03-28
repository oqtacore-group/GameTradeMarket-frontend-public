import Image from 'next/image';
import React from 'react';
import { BackgroundStreet } from './style';
import BgStreetAboutImg from '@root/public/imgs/about-us/bg_street_about.webp';

export const BackgroundStreetAboutUs = () => {
  return (
    <BackgroundStreet>
      <Image
        src={BgStreetAboutImg}
        layout="fill"
        alt="background street about"
        objectFit="cover"
        quality={100}
      />
    </BackgroundStreet>
  );
};
