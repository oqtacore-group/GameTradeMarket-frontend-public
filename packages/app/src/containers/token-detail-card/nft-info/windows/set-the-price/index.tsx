import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import * as Style from './style';
import { Dropdown } from '../../elements/dropdown-coins';
import { setPrice, setThePriceSolana } from './helpers';

import { Modal, ControlledField } from '@game-trade/ui';
import { Card, GameCurrency, useSetCoinInfoMutation } from '@game-trade/lib/codegen-types';

import { InputStyledFrom } from '@game-trade/ui/components/filters-games-items/form/blocks/components/input-range/style';
import { EnumSnackBar, getSnackBarMessage } from '../../elements/snackbar/helpers';
import { useWallet } from '@solana/wallet-adapter-react';
import { useCustomWalletConnectorProvider, useSnackStack } from '@game-trade/lib';
// import { getPriceCoin } from '@/containers/token-detail-card/hooks';

type Form = Partial<{
  price: string;
}>;

interface IProps {
  refreshItem(): void;
  setShowWindowSetThePrice(show: boolean): void;
  setAnimationRefresh(refresh: boolean): void;
  nft: Card;
}

export function SetThePrice({
  nft,
  refreshItem,
  setShowWindowSetThePrice,
  setAnimationRefresh,
}: IProps) {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });

  const hookWalletPhantom = useWallet();
  const { account: activeAddressMetamask } = useCustomWalletConnectorProvider();
  const { addSnackbarMessage } = useSnackStack();

  const {
    handleSubmit,
    formState: { isDirty, errors },
    control,
    setValue,
  } = useForm<Form>({
    defaultValues: {
      price: nft?.price && nft.price > 0 ? String(nft?.price) : '',
    },
  });

  const price = useWatch({
    control,
    name: 'price',
  });

  const [currencies, setCurrencies] = useState<GameCurrency[]>();
  const [disabled, setDisabled] = useState(isDirty);
  const [selectedCoin, setSelectedCoin] = useState<any>();
  // const [exchangePrice, setExchangePrice] = useState<number>();

  const [setCoinInfoMutation] = useSetCoinInfoMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (nft) {
      const _currencies = nft?.currencies.filter((item) => item.blockchain_code === nft.blockchain);
      if (_currencies) {
        setCurrencies(_currencies);
      }

      const _selectedCoin = nft?.currencies.find(
        (item) =>
          item.blockchain_code === nft.blockchain &&
          nft?.coin_info?.coin_address === item.contract_address
      );
      if (!_selectedCoin) {
        setSelectedCoin(nft?.coin_info);
      }

      if (_selectedCoin) {
        setSelectedCoin(_selectedCoin);
      }
    }
  }, [nft]);

  useEffect(() => {
    if (!Number(price)) setDisabled(false);
    if (price) {
      setDisabled(true);
      setValue('price', price.replace(/,/g, '.'));
    }
  }, [price]);

  useEffect(() => {
    if (selectedCoin) {
      if (selectedCoin?.coin_address !== nft?.coin_info?.coin_address) {
        setValue('price', '');
      } else {
        setValue('price', String(nft?.price));
      }
    }
  }, [selectedCoin]);

  const selectCoin = (value: GameCurrency) => setSelectedCoin(value);

  const onClose = async () => setShowWindowSetThePrice(false);

  const onConfirm = async ({ price }: { price: string }) => {
    setShowWindowSetThePrice(false);
    setAnimationRefresh(true);
    if (!nft) return;
    if (nft?.blockchain === 'solana') {
      try {
        await setThePriceSolana(nft, hookWalletPhantom, price);
        await setCoinInfoMutation({
          variables: {
            coin_address: nft?.coin_info?.coin_address,
            coin_price: Number(price),
            contract: nft?.contract,
            tokenValue: nft?.token_value,
          },
        });
        addSnackbarMessage(
          [getSnackBarMessage(EnumSnackBar.set_the_price_success, { refreshItem })],
          true
        );
        await refreshItem();
      } catch (e: any) {
        const error = e ? JSON.parse(JSON.stringify(e)) : '';
        await refreshItem();
        if (error.name === 'FailedToConfirmTransactionError') {
          addSnackbarMessage([
            {
              children:
                'We have not received confirmation from Solana network, check Phantom wallet, if the transaction failed, repeat the operation. If the transaction completed, run refresh',
              severity: 'error',
            },
          ]);
        } else {
          addSnackbarMessage([
            {
              children: error?.reason ? error?.reason : e?.message ? e?.message : 'undefined error',
              severity: 'error',
              duration: 0,
            },
          ]);
          setAnimationRefresh(false);
        }
      }
    } else {
      try {
        await setPrice(nft, { price, coin: selectedCoin, activeAddressMetamask });
        await setCoinInfoMutation({
          variables: {
            coin_address: nft?.coin_info?.coin_address,
            coin_price: Number(price),
            contract: nft?.contract,
            tokenValue: nft?.token_value,
          },
        });
        addSnackbarMessage(
          [getSnackBarMessage(EnumSnackBar.set_the_price_success, { refreshItem })],
          true
        );
        await refreshItem();
      } catch (e: any) {
        addSnackbarMessage([{ children: e.message, severity: 'error' }]);
      }
    }
  };

  return (
    <Modal onClose={onClose} hasHeader={false} isPadding={false} size={752}>
      <Style.ModalContent>
        <Style.Header>
          <span>{nft?.name}</span>
        </Style.Header>
        <Style.ContainerForm onSubmit={handleSubmit(onConfirm)}>
          <Style.ContentWrapper>
            <Style.ImageWrapper>
              {nft?.picture && (
                <Image
                  unoptimized={true}
                  priority={true}
                  layout="fill"
                  objectFit="contain"
                  src={nft?.picture}
                  alt={nft?.name || 'nft GameTradeMarket'}
                />
              )}
            </Style.ImageWrapper>
            <Style.Content>
              <Style.SelectCoin>{t('setThePrice.pleaseSelect')}</Style.SelectCoin>
              {currencies && (
                <Dropdown
                  options={currencies}
                  onChange={selectCoin}
                  placeholder={selectedCoin?.symbol.toUpperCase()}
                />
              )}
              <Style.SelectPrice>{t('setThePrice.setThePrice')}</Style.SelectPrice>
              <Style.PriceWrapper>
                <ControlledField
                  control={control}
                  name="price"
                  rules={{
                    pattern: /^[0-9]*(\.[0-9]{0,6})?$/,
                  }}>
                  <InputStyledFrom>
                    <NumberFormat value={price} placeholder={'amount'} />
                  </InputStyledFrom>
                </ControlledField>

                {nft?.coin_info?.usd_price_per_coin && Number(price) > 0 && (
                  <Style.ExchangeRate>
                    {'$'}
                    {Math.trunc(
                      Math.ceil(
                        Number(price || 0) * (nft?.coin_info?.usd_price_per_coin || 1) * 100
                      )
                    ) / 100}
                  </Style.ExchangeRate>
                )}
              </Style.PriceWrapper>
              <Style.ConfirmModalRowButtons>
                <Style.ModalButton
                  type="submit"
                  dimension="m"
                  appearance="primary"
                  disabled={!disabled || !price || !!errors?.price}>
                  {t('setThePrice.sell')}
                </Style.ModalButton>
                {!!errors?.price && <Style.Error>{t('setThePrice.onlySixDecimal')}</Style.Error>}
              </Style.ConfirmModalRowButtons>
            </Style.Content>
          </Style.ContentWrapper>
        </Style.ContainerForm>
      </Style.ModalContent>
    </Modal>
  );
}

// const getPrice = async () => {
//   if (
//     tokenCard &&
//     selectedCoin &&
//     selectedCoin?.contract_address &&
//     selectedCoin?.coin_name &&
//     tokenCard.game_code
//   ) {
//     const cryptoPrice = await getPriceCoin(
//       tokenCard.game_code,
//       selectedCoin.coin_name,
//       selectedCoin.contract_address as string,
//       selectedCoin.contract_address as string
//     );
//     setExchangePrice(cryptoPrice);
//   }
// };
