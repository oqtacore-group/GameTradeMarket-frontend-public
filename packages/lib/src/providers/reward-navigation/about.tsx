import React from 'react';
import {
  ModalHeader,
  ModalContent,
  Title,
  WrapperContent,
  ContentAbout,
  LeftContent,
  RightContent,
  Headline,
  Description,
} from './style';
import { Button } from '@game-trade/ui';

export const About = () => {
  return (
    <ModalContent>
      <ModalHeader>
        <Title>About GTM NFT</Title>
      </ModalHeader>
      <WrapperContent>
        <LeftContent>
          <Headline>What are GTM NFTs?</Headline>
          <Description>
            GTM NFTs - carefully designed and created by GameTrade for our users to enjoy benefits
            and exclusive features on our platform. By buying GTM NFT you invest in our development
            which will help us make a better product for you. Over 300 assets are designed to make
            the NFTs as unique as possible, while remaining consistent with the theme of gaming. You
            can influence the development of our project by letting us know what features you want
            to see on the platform or letting us know what doesn’t work and needs fixing.
          </Description>
        </LeftContent>
        <RightContent>
          <ContentAbout>
            <Headline>Different types of GTM NFTs?</Headline>
            <Description>
              There is 3 types of GTM NFTs: common, rare and legendary. The rarer the type, the
              greater utility (benefits and features for the owner).
            </Description>
          </ContentAbout>

          <ContentAbout>
            <Headline>Utilities of GTM NFTs?</Headline>
            <Description>
              We are working very hard to make the best product for you! We don’t wanna reveal all
              our cards in the deck from the very start however as a tease you will be able to get
              discounts, exclusive customizability, tournament participation and more.
            </Description>
          </ContentAbout>

          <ContentAbout>
            <Button>View GTM NFT Collection info</Button>
          </ContentAbout>
        </RightContent>
      </WrapperContent>
    </ModalContent>
  );
};
