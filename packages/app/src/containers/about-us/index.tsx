import React from 'react';
import { AboutUsWrapper } from './style';
import { BackgroundAnimation } from './background-animation';
import { BackgroundSpace } from './background-space';
import { PromoBlock } from './promo-block';
import { WhatAreNftBlock } from './what-are-nft-block';
import { BackgroundStreetAboutUs } from './background-street-about-us';
import { AboutUsBlock } from './about-us-block';
import { BackedByBlock } from './backed-by-block';
import { FeaturesBlock } from './features-block';
import { BackgroundStreetSupported } from './background-street-supported';
import { SupportedGamesBlock } from './supported-games-block';

export const AboutUsContainer = () => {
  return (
    <>
      <BackgroundAnimation />

      <BackgroundSpace />

      <AboutUsWrapper>
        <PromoBlock />

        <WhatAreNftBlock />

        <BackgroundStreetAboutUs />

        <AboutUsBlock />

        <BackedByBlock />

        <FeaturesBlock />

        <BackgroundStreetSupported />

        <SupportedGamesBlock />
      </AboutUsWrapper>
    </>
  );
};
