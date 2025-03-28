import React from 'react';
import {
  ModalHeader,
  ModalContent,
  Title,
  SubTitle,
  WrapperRules,
  Rule,
  WrapperImage,
  Content,
  Headline,
  Description,
} from './style';
import Claim from '@root/public/imgs/rewards/claim.svg';
import Active from '@root/public/imgs/rewards/active.svg';
import NFT from '@root/public/imgs/rewards/nft_symbol.svg';
import Regenerate from '@root/public/imgs/rewards/regenerate.svg';
import Regeneration from '@root/public/imgs/rewards/regeneration.svg';

export const Rules = () => {
  return (
    <ModalContent padding={true}>
      <ModalHeader padding={true}>
        <Title>GTM NFT claim rules</Title>
        <SubTitle>Only 1 NFT can be claimed per account</SubTitle>
      </ModalHeader>
      <WrapperRules>
        <Rule>
          <WrapperImage>
            <Claim />
          </WrapperImage>
          <Content>
            <Headline>Claim 10 000</Headline>
            <Description>
              The total supply to claim is 10000. It is possible to claim our NFT within 7 days, but
              you can take as long as you wish to complete your tasks. However the longer you take
              the higher the chance that you might miss out on our rare NFT’s.
            </Description>
          </Content>
        </Rule>

        <Rule>
          <WrapperImage>
            <Active />
          </WrapperImage>
          <Content>
            <Headline>Stay active</Headline>
            <Description>
              If you will not visit GameTrade website for more than a week, then the NFT you are
              trying to claim will be detached from your account and offered to other users trying
              that are claiming GTM NFTs, so stay active and don’t miss on your chance to get a free
              NFT from us.
            </Description>
          </Content>
        </Rule>

        <Rule>
          <WrapperImage>
            <NFT />
          </WrapperImage>
          <Content>
            <Headline>Free NFT</Headline>
            <Description>
              Once you have all the required actions completed you can claim your free NFT.
            </Description>
          </Content>
        </Rule>

        <Rule>
          <WrapperImage>
            <Regenerate />
          </WrapperImage>
          <Content>
            <Headline>Regenerate it</Headline>
            <Description>
              If you are unhappy with the NFT that is possible to claim, you can regenerate it.
              Regeneration will give you a new randomly generated one. It could be useful as a rarer
              type might be generated or the one that is more visually appealing to you.
            </Description>
          </Content>
        </Rule>

        <Rule>
          <WrapperImage>
            <Regeneration />
          </WrapperImage>
          <Content>
            <Headline>Regeneration</Headline>
            <Description>
              Regeneration costs 25 points. You can regenerate the NFT once after completing the
              required tasks. To regenerate more times you can get extra points by doing additional
              unlimited actions. Additional unlimited action are unlocked once the required tasks
              are completed and 25 points are already earned.
            </Description>
          </Content>
        </Rule>
      </WrapperRules>
    </ModalContent>
  );
};
