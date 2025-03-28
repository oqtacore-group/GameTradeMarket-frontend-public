import React from 'react';
import NeonDistrict from '@root/public/imgs/developers/neon-district.png';
import CardBracketsSvg from '@root/public/imgs/developers/card_brackets.svg';
import CardCloudSvg from '@root/public/imgs/developers/card_cloud.svg';
import CardCodeSvg from '@root/public/imgs/developers/card_code.svg';
import CardCssSvg from '@root/public/imgs/developers/card_css.svg';
import IconAnonymousSvg from '@root/public/imgs/developers/icon_anonymous.svg';
import IconGamepadSvg from '@root/public/imgs/developers/icon_gamepad.svg';
import IconCollaborationSvg from '@root/public/imgs/developers/icon_collaboration.svg';
import IconGameGuidesSvg from '@root/public/imgs/developers/game_guides.svg';
import IconAnonymousStatisticalDataSvg from '@root/public/imgs/developers/anonymous_statistical_data.svg';
import IconRegularAMASessionsAndOnlineEventsSvg from '@root/public/imgs/developers/regular_AMA_sessions_and_online_events.svg';
import IconWalletSvg from '@root/public/imgs/home/wallet.svg';

import {
  DevelopersWrapper,
  ContentMain,
  TextWrapper,
  Text,
  HeadlineMain,
  Headline,
  ButtonWithUs,
  ImagesWrapper,
  FirstColumn,
  SecondColumn,
  LastColumn,
  ImageWrapper,
  PageBlock,
  WindowButtons,
  Card,
  CardCss,
  CardBrackets,
  CardCloud,
  CardCode,
  ShadowBorderEdgePurple,
  Features,
  FeaturesWrapper,
  ListFeature,
  WrapperHeadline,
} from './style';
import { BackgroundBinary } from './background-binary';
import { BackgroundFeature } from './background-feature';
import Link from 'next/link';
import { GridImageTextComponent, IContent } from '@game-trade/ui/elements/grid-image-text';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

const features: IContent[] = [
  {
    icon: <IconGamepadSvg />,
    title: 'feature_1.title',
    description: 'feature_1.description',
  },
  {
    icon: <IconGameGuidesSvg />,
    title: 'feature_2.title',
    description: 'feature_2.description',
  },
  {
    icon: <IconCollaborationSvg />,
    title: 'feature_3.title',
    description: 'feature_3.description',
  },
  {
    icon: <IconAnonymousSvg />,
    title: 'feature_4.title',
    description: 'feature_4.description',
  },
  {
    icon: <IconWalletSvg />,
    title: 'feature_5.title',
    description: 'feature_5.description',
  },
  {
    icon: <IconRegularAMASessionsAndOnlineEventsSvg />,
    title: 'feature_6.title',
    description: 'feature_6.description',
  },
  {
    icon: <IconAnonymousStatisticalDataSvg />,
    title: 'feature_7.title',
    description: 'feature_7.description',
    list: {
      title: 'feature_7.title_2',
      points: [
        'feature_7.points_1',
        'feature_7.points_2',
        'feature_7.points_3',
        'feature_7.points_4',
      ],
      description: 'feature_7.description_2',
    },
  },
];

export const DevelopersContainer = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation' });

  return (
    <PageBlock>
      <BackgroundBinary />
      <DevelopersWrapper>
        <ContentMain>
          <TextWrapper>
            <Text>
              <HeadlineMain data-text={t('headTitle_1')}>{t('headTitle_1')}</HeadlineMain>
              <p>{t('headText_1')} </p>
              <Link href={`https://pyaa5fmmk7v.typeform.com/to/ovJK1j0k`}>
                <ButtonWithUs>{t('button')}</ButtonWithUs>
              </Link>
            </Text>
            <Text>
              <HeadlineMain data-text={t('headTitle_2')}>{t('headTitle_2')}</HeadlineMain>
              <p>{t('headText_2')}</p>
            </Text>
          </TextWrapper>
          <ImagesWrapper>
            <FirstColumn>
              <Card>
                <WindowButtons>
                  <span />
                  <span />
                  <span />
                </WindowButtons>
                <ShadowBorderEdgePurple type={1} />
                <ShadowBorderEdgePurple type={2} />
                <ImageWrapper>
                  <Image layout={'intrinsic'} src={NeonDistrict} alt="neon district" />
                </ImageWrapper>
              </Card>

              <CardCss>
                <ImageWrapper>
                  <CardCssSvg />
                </ImageWrapper>
              </CardCss>
            </FirstColumn>

            <SecondColumn>
              <CardBrackets>
                <ImageWrapper>
                  <CardBracketsSvg />
                </ImageWrapper>
              </CardBrackets>
              <CardCode>
                <ImageWrapper>
                  <CardCodeSvg />
                </ImageWrapper>
              </CardCode>
            </SecondColumn>

            <LastColumn>
              <CardCloud>
                <ImageWrapper>
                  <CardCloudSvg />
                </ImageWrapper>
              </CardCloud>
            </LastColumn>
          </ImagesWrapper>
        </ContentMain>
        <FeaturesWrapper>
          <BackgroundFeature />
          <Features>
            <WrapperHeadline>
              <Headline data-text={t('feature')}>{t('feature')}</Headline>
            </WrapperHeadline>
            <ListFeature>
              <GridImageTextComponent items={features} />
            </ListFeature>
          </Features>
        </FeaturesWrapper>
      </DevelopersWrapper>
    </PageBlock>
  );
};
