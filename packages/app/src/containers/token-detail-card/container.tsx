import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { IProps } from './index';
import * as Style from './style';

import { routes, trackEventsPixel } from '@game-trade/lib';

import { BreadCrumbs } from '@game-trade/ui';
import { Info } from './nft-info';
import { Properties } from './properties';
import { Levels } from './levels';
// import { ItemComments } from './comments';
import { Carousel } from './more-from-this-collection';
// import { ItemPrice } from './price-chart';

export const TokenCardDetailContainer = ({ data }: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const { nft, similarNFTs, nftID } = data;

  useEffect(() => {
    if (nft) {
      trackEventsPixel('ViewContent', {
        content_type: 'card',
        content_ids: `${nft.game_code}/${nftID}`,
        value: nft?.coin_info?.usd_price,
        currency: 'USD',
      });
    }
  }, [nft]);

  return (
    <main>
      <BreadCrumbs
        crumbs={[
          { label: t('breadCrumbs.marketplace'), href: routes.marketplaceDefaultGameName },
          {
            label: nft?.game_name || t('breadCrumbs.noName'),
            href: nft?.game_name
              ? routes.marketplace +
                '/' +
                nft?.game_name.replaceAll(/\s/g, '-') +
                '?gameCode=' +
                encodeURIComponent(nft?.game_name.replaceAll(/\s/g, '_').toUpperCase())
              : null,
          },
          { label: nft?.name || '', href: null },
        ]}
      />

      <Style.WrapperComponents>
        {nft && (
          <Info nft={nft} game={{ name: nft?.game_name || '', code: nft?.game_code || '' }} />
        )}
        {!!nft?.levels?.length && <Levels data={nft.levels} />}
        {!!nft?.props?.length && (
          <Style.WrapperProperties>
            <Properties data={nft?.props} />

            {/*<ItemComments*/}
            {/*  itemId={nft?.id as string}*/}
            {/*  comments={nft?.comments}*/}
            {/*  getGameTokenCardsLazyQuery={getGameTokenCardsLazyQuery}*/}
            {/*/>*/}
          </Style.WrapperProperties>
        )}

        {!!similarNFTs?.length && <Carousel gameName={nft?.game_name || ''} data={similarNFTs} />}
      </Style.WrapperComponents>
    </main>
  );
};
