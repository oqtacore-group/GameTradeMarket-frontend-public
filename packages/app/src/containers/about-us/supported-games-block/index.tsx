import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  WrapperText,
  ButtonVisitPage,
  SupportedGames,
  GamesWrapper,
  Game,
  WrapperImage,
  GameTitle,
  ShadowBorderFill,
  Additional,
} from './style';
import { Headline } from '../style';
import gameAxieInfinityImg from '@root/public/imgs/about-us/game_axie-infinity.webp';
import gameNeonDistrictImg from '@root/public/imgs/about-us/game_neon-district.webp';
import gameTownStarImg from '@root/public/imgs/about-us/game_town-star.webp';
import gameSpiderTanksImg from '@root/public/imgs/about-us/game_spider-tanks.webp';
import gameMirandusImg from '@root/public/imgs/about-us/game_mirandus.webp';
import gameFortifiedImg from '@root/public/imgs/about-us/game_fortified.webp';
import gameLostRelicsImg from '@root/public/imgs/about-us/game_lost-relics.webp';
import { routes } from '@game-trade/lib';

const games = [
  {
    image: gameAxieInfinityImg,
    title: 'Axie Infinity',
  },
  {
    image: gameNeonDistrictImg,
    title: 'Neon District',
  },
  {
    image: gameTownStarImg,
    title: 'Town Star',
  },
  {
    image: gameSpiderTanksImg,
    title: 'Spider Tanks',
  },
  {
    image: gameMirandusImg,
    title: 'Mirandus',
  },
  {
    image: gameFortifiedImg,
    title: 'Fortified',
  },
  {
    image: gameLostRelicsImg,
    title: 'Lost Relics',
  },
];

export const SupportedGamesBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.supportedGames' });
  return (
    <SupportedGames>
      <WrapperText>
        <Headline data-text={t('headline')}>{t('headline')}</Headline>
        <p>{t('description')}</p>
        <Additional>{t('additional')}</Additional>
        <Link href={routes.developers} passHref={true}>
          <ButtonVisitPage>{t('visitPage')}</ButtonVisitPage>
        </Link>
      </WrapperText>
      <GamesWrapper>
        {games.map((game) => {
          return (
            <Game key={game.title}>
              {game.image && (
                <WrapperImage>
                  <Image
                    layout="responsive"
                    objectFit="contain"
                    src={game.image}
                    alt={game.title}
                  />
                  <ShadowBorderFill />
                </WrapperImage>
              )}
              <GameTitle>{game.title}</GameTitle>
            </Game>
          );
        })}
        <Game key="And_dozens_of_other_games">
          <GameTitle>{t('otherGames')}</GameTitle>
        </Game>
      </GamesWrapper>
    </SupportedGames>
  );
};
