import React from 'react';
import { SvgEthereum, SvgPolygonMaticLogo, SvgBinance, SvgSolana } from '@game-trade/icons';

import { BlockPrice, Crypto, USDT, Undefined, CoinLogo } from './style';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

interface IProps {
  price?: number | undefined | null | string;
  usdPrice?: number | null;
  blockchain?: string;
  fontSize?: string;
  isDetailLogoSize?: boolean;
  minWidthUSDT?: number;
  colorUSDT?: string;
  onlyCrypto?: boolean;
  onlyUSDT?: boolean;
  floorPrice?: boolean;
  coinLogo?: string | null;
  isGame?: boolean;
}

export function PriceComponent(props: IProps) {
  const { t } = useTranslation('modifier', { keyPrefix: 'translation' });

  const blockchainIcon = (blockchain: string | undefined) => {
    switch (blockchain) {
      case 'polygon':
        return <SvgPolygonMaticLogo />;
      case 'ethereum_mainnet':
        return <SvgEthereum />;
      case 'binance':
        return <SvgBinance />;
      case 'solana':
        return <SvgSolana />;
    }
  };

  const {
    price,
    usdPrice,
    coinLogo,
    fontSize,
    isDetailLogoSize,
    colorUSDT,
    floorPrice = false,
    onlyCrypto = false,
    onlyUSDT = false,
    isGame,
    blockchain,
  } = props;

  if (!Number(price))
    return <Undefined>{floorPrice ? t('price.priceYet') : t('price.notForSale')}</Undefined>;

  return (
    <BlockPrice fontSize={fontSize}>
      {floorPrice && t('price.floorPrice') + ': '}
      {!onlyUSDT && (
        <>
          {isGame ? (
            blockchainIcon(blockchain)
          ) : (
            <CoinLogo isDetailLogoSize={isDetailLogoSize} src={coinLogo || ''} />
          )}
          <Crypto onlyCrypto={onlyCrypto}>{Math.ceil(Number(price) * 10000) / 10000}</Crypto>
        </>
      )}
      {!onlyCrypto && (
        <USDT colorUSDT={colorUSDT}>
          {' '}
          <USDT colorUSDT={colorUSDT}>
            {' '}
            {!onlyUSDT && '('}
            {'$'}
            {Number(usdPrice) > 0 ? Number(usdPrice) : ' < 0.01'}
            {!onlyUSDT && ')'}
          </USDT>
        </USDT>
      )}
    </BlockPrice>
  );
}
