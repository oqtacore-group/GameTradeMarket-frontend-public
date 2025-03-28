import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { routes } from '@game-trade/lib';

import {
  GameCardWrapper,
  GameImageContainer,
  GameInfo,
  Price,
  PriceRatingWrapper,
  GameName,
  BorderLine,
  Rating,
  RatingCount,
  PillsWrapper,
  Pills,
  Wrapper,
  RatingModal,
  GameCardImageWrapper,
  ShopItems,
} from './style';
import { SvgStar, SvgStarFill } from '@game-trade/icons';
import { GameCard, GameCardContract } from '@game-trade/lib/codegen-types';
import moment from 'moment';
import { ImageComponent, PriceComponent } from '../../../index';
import { BlockchainIconComponent } from '../../../modifiers/get-blockchain-icon-and-text';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export const GameCardItem = ({ gameCard }: { gameCard: GameCard }) => {
  const { t } = useTranslation('modifier', { keyPrefix: 'translation.price' });
  const {
    media_links,
    name,
    floor_price,
    contracts,
    release_date,
    blockchainNames,
    rating,
    genres,
    picture_url,
    count_review,
    items_on_sale,
  } = gameCard;
  const [picture, setPicture] = useState<string | undefined | null>();
  const [release] = useState(release_date ? moment(release_date, 'YYYY-MM-DD').valueOf() : '');
  const [releaseUTC] = useState(release_date ? moment(release_date).valueOf() : '');
  const [overdueNewness] = useState(
    release_date ? moment(release_date, 'YYYY-MM-DD').add(1, 'M').valueOf() : ''
  );
  const [nowDate] = useState(moment && moment().valueOf());

  useEffect(() => {
    if (picture_url) setPicture(picture_url);
    if (media_links[0] && !picture_url) setPicture(media_links[0].link);
  }, [media_links]);

  const getRating = () => {
    const ratings = [];
    for (let i = 0; i < rating && i < 5; i++) {
      ratings.push(<SvgStarFill key={Math.random() + i} />);
    }
    if (ratings.length < 5) {
      for (let i = ratings.length; i < 5; i++) {
        ratings.push(<SvgStar key={Math.random() + i} />);
      }
    }
    return ratings;
  };

  const getBlockchains = (contracts: GameCardContract[]) => {
    const blockchains: string[] = [];
    contracts.forEach((item) => {
      if (!blockchains.includes(item.blockchain)) blockchains.push(item.blockchain);
    });
    return blockchains.map((item) => (
      <BlockchainIconComponent key={Math.random() + item} blockchain={item} pills={true} />
    ));
  };

  const notAvailable = !Number(floor_price) && release_date && Number(releaseUTC) > Number(nowDate);

  return (
    <Wrapper>
      <Link
        href={{ pathname: `${routes.games}/[gameName]` }}
        as={`${routes.games}/${(name as string).replace(/\s+/g, '-')}`}
        passHref={true}>
        <a href={`${routes.games}/${(name as string).replace(/\s+/g, '-')}`}>
          <GameCardWrapper>
            <GameImageContainer>
              <PillsWrapper>
                {genres &&
                  genres?.length > 0 &&
                  genres.map((item) => {
                    return (
                      <Pills key={item.code} svg={false} color={'white'}>
                        {item.name}
                      </Pills>
                    );
                  })}
                {getBlockchains(contracts)}
                {nowDate.toString() >= release.toString() &&
                  nowDate.toString() <= overdueNewness.toString() && (
                    <Pills newGame={true} svg={false} color={'pink'}>
                      {t('new')}
                    </Pills>
                  )}
                <Pills style={{ color: 'white', padding: '0px 10px' }} svg={true} color={'pink'}>
                  On sale: {items_on_sale} items
                </Pills>
              </PillsWrapper>
              <GameCardImageWrapper>
                <ImageComponent
                  link={picture}
                  alt={name}
                  LCP={false}
                  setImage={setPicture}
                  styleWrapper={{
                    height: '250px',
                    margin: '2px',
                  }}
                />
                <Link
                  href={{ pathname: routes.marketplaceGameName }}
                  as={`${routes.marketplace}/${name}?gameCode=${encodeURIComponent(
                    name?.replaceAll(/\s/g, '_').toUpperCase() ?? ''
                  )}`}
                  passHref={true}>
                  <ShopItems>
                    <a>Shop items</a>
                  </ShopItems>
                </Link>
              </GameCardImageWrapper>
              {}
              {/*  <Index*/}
              {/*    loader={() => picture}*/}
              {/*    layout="fill"*/}
              {/*    objectFit="cover"*/}
              {/*    src={picture}*/}
              {/*    alt={name || 'game`s image'}*/}
              {/*    unoptimized={true}*/}
              {/*    priority={true}*/}
              {/*    onError={() => setPicture(null)}*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <EmptyTokenImageWrapper>*/}
              {/*    <IconEmptyItemImageSvg />*/}
              {/*  </EmptyTokenImageWrapper>*/}
              {/*)}*/}
            </GameImageContainer>

            <GameInfo>
              <div>
                <GameName>{name}</GameName>
              </div>

              <BorderLine />

              <PriceRatingWrapper>
                <Price>
                  {!notAvailable && (
                    <PriceComponent
                      fontSize={'14px'}
                      price={floor_price}
                      onlyCrypto={true}
                      blockchain={blockchainNames[0]}
                      floorPrice={true}
                      isGame={true}
                    />
                  )}
                  {notAvailable &&
                    `${t('willBeAvailable')} ${moment(release_date).format('MMM YYYY')}`}
                  {/*{!Number(floor_price) &&*/}
                  {/*  Number(nowDate) > Number(releaseUTC) &&*/}
                  {/*  "We don't know the current price yet"*/}
                </Price>
                <Rating>
                  {getRating().map((item) => {
                    return item;
                  })}
                  {Boolean(count_review) && (
                    <>
                      <RatingCount>({count_review})</RatingCount>
                      <RatingModal>
                        {t('numberOfReviews')}: {count_review}
                      </RatingModal>
                    </>
                  )}
                </Rating>
              </PriceRatingWrapper>
            </GameInfo>
          </GameCardWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};
