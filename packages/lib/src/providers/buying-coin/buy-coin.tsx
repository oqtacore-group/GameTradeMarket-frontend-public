import {
  Description,
  ExchangeRate,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalHeaderPending,
  SubTitle,
  Title,
  WrapperButton,
  WrapperCount,
  ContainerForm,
  Error,
} from './style';
import { ALIGN, Button, ControlledField, Loader, SIZE } from '@game-trade/ui';
import { InputStyledFrom } from '@game-trade/ui/components/filters-games-items/form/blocks/components/input-range/style';
import NumberFormat from 'react-number-format';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  useAuthContext,
  useCustomWalletConnectorProvider,
  useBuyingCoinContext,
  WINDOW_TYPES_BUYING_COIN,
} from '@game-trade/lib';
import { Wallet } from '@game-trade/lib/src/codegen-types';
import { buyCoin, getValue } from './hooks';

type Form = Partial<{
  count: string;
}>;

enum TRANSACTION_STATE {
  Pending = 'Pending',
  Success = 'Success',
  Error = 'Error',
}

export const BuyCoin = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Form>();

  const count = useWatch({
    control,
    name: 'count',
  });

  const [errorValue, setErrorValue] = useState(false);

  useEffect(() => {
    if (errors && errors.count) setErrorValue(true);
  }, [errors]);

  useEffect(() => {
    const regexp = /^[0-9]*(\.[0-9]{0,2})?$/;
    if (!count) return;
    if (regexp.test(count)) {
      setValue('count', count);
      getValueCoin(count);
      setErrorValue(false);
    } else {
      setErrorValue(true);
      setExchangeRate(0);
    }
  }, [count]);

  const {
    authProviderData: { userInfoData },
  } = useAuthContext();
  const { account, activateConnector } = useCustomWalletConnectorProvider();
  const { handleChangeWindowType, tempData } = useBuyingCoinContext();

  const [exchangeRate, setExchangeRate] = useState<number>();
  const [connectedWallet, setConnectedWallet] = useState<boolean>();
  const [transactionSuccessful, setTransactionSuccessful] = useState<TRANSACTION_STATE>();

  const listOfWallets = (userInfoData?.wallets || []) as Wallet[];

  useEffect(() => {
    activateConnector();
  }, []);

  const getValueCoin = async (_count: string) => {
    if (
      tempData &&
      tempData.gameCode &&
      tempData.currency &&
      tempData?.currency?.contract_address
    ) {
      const price = await getValue(
        tempData?.gameCode,
        tempData?.currency?.coin_name,
        tempData?.currency?.contract_address,
        _count
      );
      setExchangeRate(price);
    }
  };

  useEffect(() => {
    setConnectedWallet(
      listOfWallets.filter((a) => a.address.toLowerCase() === account?.toLowerCase()).length === 0
    );
  }, [listOfWallets, account]);

  useEffect(() => {
    if (connectedWallet) {
      handleChangeWindowType(WINDOW_TYPES_BUYING_COIN.VALIDATE_ACTIVE_WALLET);
    }
  }, [connectedWallet && account]);

  const onConfirmBuyCoin = async (data: { count: string }) => {
    if (
      data &&
      data.count &&
      tempData &&
      tempData.gameCode &&
      tempData.currency &&
      tempData.currency.contract_address
    ) {
      setTransactionSuccessful(TRANSACTION_STATE.Pending);
      const result: any = await buyCoin(
        tempData?.gameCode,
        tempData?.currency?.coin_name,
        tempData?.currency?.contract_address,
        String(data.count)
      );
      if (result?.status === 1) {
        setTransactionSuccessful(TRANSACTION_STATE.Success);
      } else {
        setTransactionSuccessful(TRANSACTION_STATE.Error);
      }
    }
  };

  return (
    <ModalContent>
      {!transactionSuccessful && (
        <>
          <ModalHeader>
            <Title>Buy {tempData.currency?.coin_name} to</Title>
            <SubTitle>{account}</SubTitle>
          </ModalHeader>
          <ContainerForm onSubmit={handleSubmit(onConfirmBuyCoin)}>
            <ModalBody>
              <Description>Amount of {tempData.currency?.coin_name} to buy:</Description>
              <WrapperCount>
                <ControlledField
                  control={control}
                  name="count"
                  rules={{
                    pattern: /^[0-9]*(\.[0-9]{0,2})?$/,
                  }}>
                  <InputStyledFrom>
                    <NumberFormat placeholder={'amount'} />
                  </InputStyledFrom>
                </ControlledField>
                <ExchangeRate>(MATIC {exchangeRate})</ExchangeRate>
              </WrapperCount>
              <Error>
                {errorValue && 'Amount can only be with two characters after the decimal point'}
              </Error>
            </ModalBody>
            <ModalFooter>
              <WrapperButton>
                <Button appearance="primary" type="submit" dimension="m" disabled={errorValue}>
                  Buy
                </Button>
              </WrapperButton>
            </ModalFooter>
          </ContainerForm>
        </>
      )}

      {transactionSuccessful === TRANSACTION_STATE.Success && (
        <ModalHeader>
          <Title>The transaction was successful !</Title>
        </ModalHeader>
      )}
      {transactionSuccessful === TRANSACTION_STATE.Error && (
        <ModalHeader>
          <Title>Transaction execution error :(</Title>
        </ModalHeader>
      )}
      {transactionSuccessful === TRANSACTION_STATE.Pending && (
        <ModalHeaderPending>
          <Title>
            You can close this window now, or it will close automatically when the transaction
            finishes
          </Title>
          <Loader position={ALIGN.CENTER} size={SIZE.BIG} />
        </ModalHeaderPending>
      )}
    </ModalContent>
  );
};
