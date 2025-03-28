import Image from 'next/image';
import React from 'react';
import { BackgroundStreet } from './style';
import BgStreetSupportedImg from '@root/public/imgs/about-us/bg_street_supported.webp';
import BgStreetSupportedMobileImg from '@root/public/imgs/about-us/bg_street_supported-mobile.webp';

export const BackgroundStreetSupported = () => {
  return (
    <BackgroundStreet>
      <Image
        layout="fill"
        objectFit="cover"
        alt="background supported"
        quality={100}
        src={BgStreetSupportedImg}
      />
      <Image
        layout="fill"
        objectFit="cover"
        alt="background supported mobile"
        quality={100}
        src={BgStreetSupportedMobileImg}
      />
    </BackgroundStreet>
  );
};
