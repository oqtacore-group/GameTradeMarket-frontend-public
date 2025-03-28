import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@game-trade/lib/codegen-types';
import { routes } from '@game-trade/lib';
// import IconHeartSmallSvg from '@game-trade/app/public/imgs/icon_heart_small.svg';
// import IconHeartSmallFilledSvg from '@game-trade/app/public/imgs/icon_heart_small_filled.svg';

import {
  TokenCardWrapper,
  TokenImage,
  TokenDescription,
  GameName,
  TokenName,
  Stroke,
  PriceAndLikesWrapper,
  // Like,
  Wrapper,
} from './style';
import { ImageComponent, PriceComponent } from '../../../index';
import { ItemListBuyButton } from './item-list-buy-button';

interface IProps {
  tokenCard: Card;
  gameName: string;
  isNormalColumns?: boolean;
}

export const TokenCard = (props: IProps) => {
  const { tokenCard, gameName, isNormalColumns } = props;
  const { picture: pictureInitial, price, name, coin_info } = tokenCard;

  const [picture, setPicture] = useState<any>(pictureInitial);
  const [cachedGameName] = useState(gameName);

  return (
    <Wrapper>
      <Link
        href={{
          pathname: `${routes.marketplace}${routes.token}/[network]/[gameContract]/[tokenCardId]`,
        }}
        as={`${routes.marketplace}${routes.token}/${tokenCard.blockchain}/${tokenCard.contract}/${tokenCard?.token_value}`}
        passHref={true}>
        <a
          href={`${routes.marketplace}${routes.token}/${tokenCard.blockchain}/${tokenCard.contract}/${tokenCard?.token_value}`}>
          <TokenCardWrapper>
            <ImageComponent
              layout="fill"
              objectFit="contain"
              link={picture}
              alt={name}
              LCP={false}
              setImage={setPicture}
              styleWrapper={TokenImage}
            />

            <TokenDescription>
              <div>
                <GameName>{cachedGameName}</GameName>
                <TokenName>{name}</TokenName>
              </div>

              <Stroke />

              <PriceAndLikesWrapper>
                <PriceComponent
                  coinLogo={coin_info?.logo}
                  fontSize={isNormalColumns ? '14px' : '12px'}
                  price={Number(price)}
                  blockchain={tokenCard?.blockchain}
                  usdPrice={coin_info?.usd_price}
                  isDetailLogoSize={false}
                />
                {Number(price) > 0 && (
                  <ItemListBuyButton
                    card={tokenCard}
                    fontSize={isNormalColumns ? '14px' : '12px'}
                  />
                )}
                {}
                {/*  {tokenCard?.is_my_like ? <IconHeartSmallFilledSvg /> : <IconHeartSmallSvg />}*/}
                {/*  {tokenCard?.likes_count || 0}*/}
                {/*</Like>*/}
              </PriceAndLikesWrapper>
            </TokenDescription>
          </TokenCardWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};
