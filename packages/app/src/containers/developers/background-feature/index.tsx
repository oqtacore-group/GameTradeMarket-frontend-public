import Image from 'next/image';
import React from 'react';
import { BackgroundFeatureStyle } from './style';
import BgFeaturesImg from '@root/public/imgs/developers/bg_street_features.webp';

export const BackgroundFeature = () => {
  return (
    <BackgroundFeatureStyle>
      <Image layout="fill" objectFit="cover" src={BgFeaturesImg} alt="background feature" />
    </BackgroundFeatureStyle>
  );
};
