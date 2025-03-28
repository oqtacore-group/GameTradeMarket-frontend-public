import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { ALIGN, Loader, Modal, SIZE } from '@game-trade/ui';
import { Card, User } from '@game-trade/lib/codegen-types';
import * as Style from './style';

import { allowanceCoin, approveCoin, getFeeContract } from './hooks';
import { buy } from '../../elements/button-buy/helpers';
import { useCustomWalletConnectorProvider, useSnackStack } from '@game-trade/lib';
import { getTokenCurrencyName } from '@game-trade/ui/modifiers/get-price/utils';

interface IProps {
  onClose(): void;
  gameCode: string;
  coinName?: string;
  tokenCard: Card;
  userInfoData?: User | null;
}

export function BuyForERC20({
  onClose,
  gameCode: _GAME_CODE,
  tokenCard: _NFT,
  userInfoData: _USER,
}: IProps) {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation.approve' });
  const {
    currencies: CURRENCIES,
    coin_info: COIN_INFO,
    price: PRICE,
    trade_contract_gametrade: TRADE_CONTRACT_GTM,
    platform: PLATFORM,
  } = _NFT;
  if (!_NFT || ['IMX', 'RISE_OF_ELVES'].includes(PLATFORM)) return <></>;

  const COIN_NAME = getTokenCurrencyName(CURRENCIES, COIN_INFO?.coin_address);
  let startIntervalAllowance: any;

  const { addSnackbarMessage } = useSnackStack();
  const { account: ACTIVE_ADDRESS_METAMASK, activateConnector } =
    useCustomWalletConnectorProvider();

  /*
   * States
   * */
  const [amount, setAmount] = useState<string>();
  const [allowed, setAllowed] = useState<{ allowed: number; allowedDecimals: number }>();
  const [fee, setFee] = useState<number>();
  const [loadingApprove, setLoadingApprove] = useState<boolean>(false);
  const [loadingBuy, setLoadingBuy] = useState<boolean>(false);
  const [buyingSuccessfully, setBuyingSuccessfully] = useState<boolean>(false);

  useEffect(() => {
    if (allowed?.allowedDecimals === amount) {
      clearInterval(startIntervalAllowance);
      setLoadingApprove(false);
    }
  }, [allowed]);

  useEffect(() => {
    activateConnector('MetaMask');

    return () => {
      clearInterval(startIntervalAllowance);
    };
  }, []);

  useEffect(() => {
    allowance().then((e) => console.error(e));
    getFee().then((e) => console.error(e));
  }, [_NFT]);

  useEffect(() => {
    if (fee && PRICE && allowed?.allowedDecimals !== PRICE + fee) {
      const price = String(Number(PRICE) + fee);
      setAmount(price);
    } else {
      setAmount('0');
    }
  }, [fee, allowed]);

  const intervalAllowance = () => {
    startIntervalAllowance = setInterval(async () => {
      await allowance();
    }, 2000);
  };

  const approve = async () => {
    if (amount) {
      try {
        setLoadingApprove(true);
        await approveCoin(COIN_INFO?.coin_address, TRADE_CONTRACT_GTM, Number(amount) as number);
        intervalAllowance();
      } catch (e: any) {
        setLoadingApprove(false);
        addSnackbarMessage([{ children: e.message, severity: 'error' }]);
      }
    }
  };

  const onClick = async () => {
    try {
      setLoadingBuy(true);
      await buy(_NFT, _GAME_CODE, 'GAMETRADE', _USER);
      setLoadingBuy(false);
      setBuyingSuccessfully(true);
      setTimeout(() => onClose(), 5000);
    } catch (e: any) {
      addSnackbarMessage([{ children: e.message, severity: 'error' }]);
      console.log('e', e);
    }
  };

  const allowance = async () => {
    if (_NFT && ACTIVE_ADDRESS_METAMASK) {
      const allwd = await allowanceCoin(
        COIN_INFO?.coin_address as string,
        TRADE_CONTRACT_GTM as string,
        ACTIVE_ADDRESS_METAMASK
      );
      setAllowed(allwd);
    }
  };

  const getFee = async () => {
    const f = await getFeeContract(TRADE_CONTRACT_GTM, PRICE);
    setFee(f);
  };

  return (
    <Modal onClose={onClose} hasHeader={false} isPadding={false} size={752}>
      <Style.ModalContent>
        {allowed && !buyingSuccessfully ? (
          <>
            <Style.Header>
              <Style.Title>
                {Number(amount) ? (
                  <>
                    {t('title.needHave.part_1')}{' '}
                    <span> {amount?.substr(0, 8) + ' ' + COIN_NAME}</span>{' '}
                    {t('title.needHave.part_2')}
                  </>
                ) : (
                  <>{t('title.youHave')}</>
                )}
              </Style.Title>
            </Style.Header>
            <Style.Content>
              <Style.ModalButtonWrapper>
                1.
                <Style.ModalButton
                  isLoader={loadingApprove}
                  onClick={approve}
                  dimension="m"
                  appearance="primary"
                  disabled={!Number(amount)}>
                  Allow spending
                </Style.ModalButton>
              </Style.ModalButtonWrapper>
              {t('then')}
              <Style.ModalButtonWrapper>
                2.
                <Style.ModalButton
                  isLoader={loadingBuy}
                  onClick={onClick}
                  dimension="m"
                  appearance="primary"
                  disabled={!!Number(amount)}>
                  {t('buy')}
                </Style.ModalButton>
              </Style.ModalButtonWrapper>
            </Style.Content>
          </>
        ) : buyingSuccessfully ? (
          <Style.SubTitle>
            {t('txCompleted.part_1')} <br />
            {t('txCompleted.part_2')}
          </Style.SubTitle>
        ) : (
          <Loader size={SIZE.BIG} position={ALIGN.CENTER} />
        )}
      </Style.ModalContent>
    </Modal>
  );
}
