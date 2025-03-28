import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import {
  GameCardWrapper,
  GameImageContainer,
  GameInfo,
  GameName,
  PillsWrapper,
  Pills,
  ActionButton,
} from './style';
import { GameCard, GameCardContract } from '@game-trade/lib/codegen-types';
import { routes } from '@game-trade/lib';
import { ImageComponent } from '../../../modifiers/get-image-optimization';
import { BlockchainIconComponent } from '../../../modifiers/get-blockchain-icon-and-text';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export const GameCardSlideHomePage = ({ gameCard }: { gameCard: GameCard }) => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation' });

  const {
    first_media_link,
    name,
    first_contract,
    release_date,
    genres,
    picture_url,
    items_on_sale,
  } = gameCard;
  const [picture, setPicture] = useState<string | undefined | null>();
  const [release] = useState(moment(release_date, 'YYYY-MM-DD').valueOf());
  const [overdueNewness] = useState(moment(release_date, 'YYYY-MM-DD').add(1, 'M').valueOf());
  const [nowDate] = useState(moment().valueOf());

  useEffect(() => {
    if (picture_url) setPicture(picture_url);
    if (first_media_link && !picture_url) setPicture(first_media_link?.link);
  }, [first_media_link]);

  const getBlockchains = (first_contract: GameCardContract) => {
    const blockchains: string[] = [];
    if (first_contract) {
      if (!blockchains.includes(first_contract.blockchain)) {
        blockchains.push(first_contract.blockchain);
      }
      return blockchains.map((item) => (
        <BlockchainIconComponent key={Math.random() + item} blockchain={item} pills={true} />
      ));
    }
  };

  return (
    <GameCardWrapper>
      <GameImageContainer>
        <PillsWrapper>
          {genres &&
            genres?.length > 0 &&
            genres.map((item: any) => {
              return (
                <Pills key={item.code} svg={false} color={'white'}>
                  {item.name}
                </Pills>
              );
            })}
          {getBlockchains(first_contract as any)}
          {nowDate >= release && nowDate <= overdueNewness && (
            <Pills newGame={true} svg={false} color={'pink'}>
              New
            </Pills>
          )}
          <Pills style={{ color: 'white', padding: '0px 10px' }} svg={true} color={'pink'}>
            On sale: {items_on_sale} items
          </Pills>
        </PillsWrapper>
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
      </GameImageContainer>

      <GameInfo>
        <GameName>{name}</GameName>
        <Link href={routes.games + '/' + name?.replace(/\s+/g, '-')}>
          <ActionButton>{t('gameSlide.explore')}</ActionButton>
        </Link>
      </GameInfo>
    </GameCardWrapper>
  );
};
