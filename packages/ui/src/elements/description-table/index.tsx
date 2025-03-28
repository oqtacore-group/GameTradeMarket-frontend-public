import { Item } from './style';
import { PriceComponent } from '../../modifiers/get-price';
import React from 'react';
import { ALIGN, Loader, SIZE } from '../loader';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

// export const blockType = [
//   'release_date',
//   'developer',
//   'publisher',
//   'items_on_sale',
//   'floor_price',
//   'genres',
//   'blockchain',
//   'rating',
//   'tx_7d',
//   'tx_30d',
//   'uaw_30d',
//   'uaw_7d',
// ];
//
// export enum INFO_BLOCKS {
//   release_date = 'release_date',
//   developer = 'developer',
//   publisher = 'publisher',
//   items_on_sale = 'items_on_sale',
//   floor_price = 'floor_price',
//   genres = 'genres',
//   blockchain = 'blockchain',
//   rating = 'rating',
//   tx_7d = 'tx_7d',
//   tx_30d = 'tx_30d',
//   uaw_7d = 'uaw_7d',
//   uaw_30d = 'uaw_30d',
// }
//
// export interface BlockSpec {
//   value: any;
//   key: string;
//   title: string;
//   array: boolean;
// }

export interface IItem {
  key: string;
  value?: any;
  price?: boolean;
  blockchain?: string;
  loader?: boolean;
  loadingState?: boolean;
}

export const DescriptionTable = ({ items }: { items: IItem[] }) => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation' });
  return (
    <>
      {items.map((item) => {
        if (!item.value && !item.loader) return <></>;
        return (
          <Item key={Math.random() + '_' + item.value + item.key}>
            <div>{item.key}</div>
            {item.loader ? (
              <div>
                {item.loadingState ? (
                  <Loader size={SIZE.MINI} position={ALIGN.RIGHT} />
                ) : item.value ? (
                  item.value
                ) : (
                  t('noDataAvailable')
                )}
              </div>
            ) : item.price ? (
              <PriceComponent
                fontSize={'17px'}
                price={item.value}
                onlyCrypto={true}
                floorPrice={false}
                blockchain={item.blockchain}
                coinLogo={item.blockchain}
                isGame={true}
              />
            ) : (
              <div>{item.value}</div>
            )}
          </Item>
        );
      })}
    </>
  );
};
