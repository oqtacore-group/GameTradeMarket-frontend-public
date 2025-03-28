import {
  Title,
  BuyingCoinWrapper,
  ImageWrapper,
  CoinPurchaseButtonWrapper,
  CoinPurchaseButton,
  BuyCoinWrapper,
  BuyCoin,
  BuyingCoinItem,
  BuyCoinDescription,
  BuyingCoinItemWrapper,
  GameDescription,
} from './style';
import React from 'react';
// import { SocialLink } from '@game-trade/lib/codegen-types';
// import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@game-trade/ui';
import { useBuyingCoinContext } from '@game-trade/lib/providers/buying-coin';
import { useAuthContext, useLoginContext } from '@game-trade/lib';
import { GameCurrency } from '@game-trade/lib/src/codegen-types';
import { useTranslation } from 'next-i18next';

export const BuyingCoin = ({
  currencies,
  gameCode,
}: {
  currencies?: any | GameCurrency[] | null | undefined;
  gameCode?: string;
}) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.buying' });
  const { onShowBuyingCoinWindow, handleSetTempData } = useBuyingCoinContext();
  const { onShowLoginWindow } = useLoginContext();
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();

  const openWindow = (data: GameCurrency) => {
    if (isAuthenticated) {
      handleSetTempData({ currency: data, gameCode });
      onShowBuyingCoinWindow();
      return;
    }
    onShowLoginWindow();
  };

  return (
    <BuyingCoinWrapper>
      {currencies &&
        currencies?.length > 0 &&
        currencies.map((item: GameCurrency) => (
          <BuyingCoinItemWrapper key={item.contract_address}>
            {item.contract_address !== '0x0000000000000000000000000000000000000000' && (
              <BuyingCoinItem>
                <Title>{item.coin_name}</Title>
                <GameDescription>
                  <ImageWrapper>
                    {item.logo && (
                      <Image src={item.logo} layout={'intrinsic'} width={24} height={24} />
                    )}
                  </ImageWrapper>
                  {t('description')} {item.coin_name}.
                </GameDescription>

                <CoinPurchaseButtonWrapper>
                  <BuyCoinWrapper>
                    <BuyCoin>
                      {t('buy')} {item.coin_name}
                    </BuyCoin>
                    <BuyCoinDescription>
                      {t('buyText')} {item.coin_name}.
                    </BuyCoinDescription>
                  </BuyCoinWrapper>
                  <CoinPurchaseButton>
                    <Button onClick={() => openWindow(item)} appearance="primary" dimension="m">
                      {t('buy')} {item.coin_name}
                    </Button>
                  </CoinPurchaseButton>
                </CoinPurchaseButtonWrapper>
              </BuyingCoinItem>
            )}
          </BuyingCoinItemWrapper>
        ))}
    </BuyingCoinWrapper>
  );
};
