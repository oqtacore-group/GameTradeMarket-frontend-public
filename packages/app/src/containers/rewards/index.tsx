import {
  MediaWrapper,
  Mission,
  Points,
  SubText,
  SubHeadline,
  SubDescription,
  Wrapper,
  About,
  ImageWrapper,
  FrameShadow,
  Task,
  Tasks,
  Text,
  ButtonBuy,
  ButtonClaim,
  Headline,
  Description,
  WrapperButtons,
  WrapperTarget,
  Community,
  Activity,
  Follow,
  WrapperTouch,
  ClaimAndEnjoy,
  Images,
  CatImage,
  WrapperNftSymbol,
  Utility,
  BackgroundWrapper,
} from './style';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

import CatMain from '@root/public/imgs/rewards/cat_main.png';
import Cat1 from '@root/public/imgs/rewards/cat_1.png';
import Cat3 from '@root/public/imgs/rewards/cat_3.png';
import Background from '@root/public/imgs/rewards/background.png';
import SvgTarget from '@root/public/imgs/rewards/target.svg';
import SvgTouch from '@root/public/imgs/rewards/touch.svg';
import SvgNftSymbol from '@root/public/imgs/rewards/nft_symbol.svg';
import SvgGTMLogo from '@root/public/imgs/rewards/GTM_logo.svg';
import { SvgDiamond, SvgDiscord, SvgIconHeartFilled, SvgTwitter } from '@game-trade/icons';

export interface IServerSideProps {
  cats: any;
}

export const RewardsContainer = ({ serverSideData }: { serverSideData: IServerSideProps }) => {
  return (
    <Wrapper>
      <About>
        <ImageWrapper>
          <Image layout="fill" objectFit="cover" src={CatMain} alt="cat gtm main" />
          <FrameShadow number={1} />
          <FrameShadow number={2} />
        </ImageWrapper>
        <Text>
          <Headline data-text="What are GTM NFTs?">What are GTM NFTs?</Headline>
          <Description>
            GTM NFTs - carefully designed and created by GameTrade for our users to enjoy benefits
            and exclusive features on our platform. By buying GTM NFT you invest in our development
            which will help us make a better product for you. Over 300 assets are designed to make
            the NFTs as unique as possible, while remaining consistent with the theme of gaming. You
            can influence the development of our project by letting us know what features you want
            to see on the platform or letting us know what doesn’t work and needs fixing.
          </Description>
          <WrapperButtons>
            <Link href={`/rewards/stats`}>
              <ButtonClaim disabled={true}>Claim for free</ButtonClaim>
            </Link>
            <Link href={`/marketplace`}>
              <ButtonBuy>Buy NFT</ButtonBuy>
            </Link>
          </WrapperButtons>
        </Text>
      </About>
      <Tasks>
        <SubText>
          <SubHeadline data-text="Complete tasks">Complete tasks</SubHeadline>
          <SubDescription>
            When all tasks are completed, the "Claim NFT" button will be available and you will be
            able to take the cat to your wallet
          </SubDescription>
        </SubText>
        <MediaWrapper>
          <Task number={1}>
            <Mission pathFill={true}>
              <SvgIconHeartFilled />
              Like item on GameTrade marketplace (x1 per friend - max 10)
            </Mission>
            <Points>
              + 3 <SvgDiamond />
            </Points>
          </Task>

          <Task number={2}>
            <Mission>
              <SvgDiscord />
              Send messages on the GameTrade Discord
            </Mission>
            <Points>1/∞</Points>
          </Task>

          <Task number={3}>
            <Mission>
              <SvgTwitter />
              Link Twitter to your profile
            </Mission>
            <Points>
              1/1 <SvgDiamond />
            </Points>
          </Task>
          <WrapperTarget>
            <SvgTarget />
          </WrapperTarget>
        </MediaWrapper>
      </Tasks>
      <Community>
        <MediaWrapper>
          <Activity>
            <SvgDiscord /> Be active!
          </Activity>
          <Follow>
            <SvgGTMLogo /> Follow the events!
          </Follow>

          <WrapperTouch>
            <SvgTouch />
          </WrapperTouch>
        </MediaWrapper>
        <SubText>
          <SubHeadline data-text="Be active in the community">
            Be active in the community
          </SubHeadline>
          <SubDescription>Be active in Discord and follow the events from GameTrade</SubDescription>
        </SubText>
      </Community>
      <ClaimAndEnjoy>
        <SubText>
          <SubHeadline data-text="Claim Your NFT and enjoy">Claim Your NFT and enjoy</SubHeadline>
          <SubDescription>
            Get your GameTrade cat, put it on the avatar on GameTrade market and get additional
            features on the platform
          </SubDescription>
        </SubText>
        <MediaWrapper>
          <Images>
            <CatImage>
              <ImageWrapper>
                <Image layout="fill" objectFit="cover" src={Cat3} alt="cat random" />
                <FrameShadow number={1} min={true} />
                <FrameShadow number={2} min={true} />
              </ImageWrapper>
            </CatImage>

            <CatImage>
              <ImageWrapper>
                <Image layout="fill" objectFit="cover" src={Cat1} alt="cat random" />
                <FrameShadow number={1} min={true} />
                <FrameShadow number={2} min={true} />
              </ImageWrapper>
            </CatImage>

            <CatImage>
              <ImageWrapper>
                <Image layout="fill" objectFit="cover" src={CatMain} alt="cat random" />
                <FrameShadow number={1} min={true} />
                <FrameShadow number={2} min={true} />
              </ImageWrapper>
            </CatImage>
          </Images>
          <WrapperNftSymbol>
            <SvgNftSymbol />
          </WrapperNftSymbol>
        </MediaWrapper>
      </ClaimAndEnjoy>
      <Utility>
        <MediaWrapper>
          <BackgroundWrapper>
            <ImageWrapper>
              <Image layout="fill" objectFit="cover" src={Background} alt="background" />
            </ImageWrapper>
          </BackgroundWrapper>
        </MediaWrapper>
        <SubText>
          <SubHeadline data-text="Utility GT Cats">Utility GT Cats</SubHeadline>
          <SubDescription>
            We are working very hard to make the best product for you! We don’t wanna reveal all our
            cards in the deck from the very start however as a tease you will be able to get
            discounts, exclusive customizability, tournament participation and more.
          </SubDescription>
        </SubText>
      </Utility>
    </Wrapper>
  );
};
