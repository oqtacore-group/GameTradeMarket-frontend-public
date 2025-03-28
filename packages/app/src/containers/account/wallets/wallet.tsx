import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatEther, formatUnits } from '@ethersproject/units';
import { SvgCopy, SvgEdit, SvgTrash } from '@game-trade/icons';
import { Input, COLORS, ALIGN, Loader, SIZE, ControlledField } from '@game-trade/ui';
import { Currency, useWalletMutation, Wallet } from '@game-trade/lib/src/codegen-types';

import { formatAddress } from '../utils';

import {
  Block,
  ButtonDisconnect,
  ButtonsList,
  CurrencyList,
  MainWallet,
  WalletItemStyled,
  WalletTitle,
  WalletTitleWrapper,
  WalletType,
} from './style';
import { CurrencyItemComponent } from './currency-item';
import { useTranslation } from 'next-i18next';

enum FIELDS {
  Name = 'name',
}

interface IPropsWalletItem {
  isActive: boolean;
  wallet: Wallet;
  handleDisconnect?: (data: any) => void;
}

interface IParsedCurrency extends Currency {
  isValueLong: boolean;
  valueParsed: string;
}

type Form = {
  [FIELDS.Name]: string;
};

export const WalletItem = ({
  isActive,
  handleDisconnect,
  wallet: { address, balances, name },
}: IPropsWalletItem) => {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const [isEdit, setEdit] = useState(false);
  const [walletMutation, { data, loading, error }] = useWalletMutation();
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      [FIELDS.Name]: name,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (error?.graphQLErrors) {
      setValue(FIELDS.Name, name);
    }
  }, [data]);

  const handleSubmitForm = async (variables: any, event: any) => {
    await walletMutation({
      variables: {
        params: {
          name: variables.name || name,
          address: address,
        },
      },
      fetchPolicy: 'no-cache',
    });

    setEdit(false);
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>, value: string) => {
    if (value && !errors.name?.type) {
      await handleSubmitForm({ [FIELDS.Name]: value }, event);
    }
  };

  const handleOnDisconnect = () => {
    handleDisconnect && handleDisconnect(address);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCopyAddress = () => {
    try {
      navigator.clipboard.writeText(address);
    } catch (e) {
      console.warn('navigator.clipboard.writeText', e);
    }
  };

  const balancesParse = (balances: any): IParsedCurrency[] => {
    if (balances && balances.length > 0) {
      return balances.map((cur: Currency | null) => {
        if (!cur) return;
        return {
          ...cur,
          value: cur.decimals ? formatUnits(cur.value, cur.decimals) : formatEther(cur.value),
          isValueLong: formatEther(cur.value).length > 5,
          valueParsed: cur.decimals
            ? formatUnits(cur.value, cur.decimals).substr(0, 5)
            : formatEther(cur.value).substr(0, 5),
        };
      });
    } else {
      return balances as IParsedCurrency[];
    }
  };

  return (
    <WalletItemStyled>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {isActive && <MainWallet>{t('active')}</MainWallet>}
        <Block>
          <WalletTitleWrapper>
            {isEdit && (
              <ControlledField
                name={FIELDS.Name}
                control={control}
                rules={{
                  required: t('required'),
                  maxLength: 100,
                  minLength: 3,
                }}>
                <Input
                  id={FIELDS.Name}
                  type="text"
                  color={COLORS.white}
                  maxLength={100}
                  onBlur={handleBlur}
                />
              </ControlledField>
            )}

            {!isEdit && (
              <>
                <WalletTitle>{getValues(FIELDS.Name)}</WalletTitle>
                <SvgEdit size={16} onClick={handleEdit} />
              </>
            )}
            {loading && <Loader size={SIZE.MINI} position={ALIGN.RIGHT} />}
          </WalletTitleWrapper>
        </Block>
        {address && (
          <Block>
            <WalletType onClick={handleCopyAddress}>
              <span>{formatAddress(address)}</span>
              <span>
                <SvgCopy size={16} />
              </span>
            </WalletType>
          </Block>
        )}

        {balances && balances.length > 0 && (
          <Block>
            <CurrencyList>
              {balancesParse(balances).map((cur: IParsedCurrency, key: number) => (
                <CurrencyItemComponent {...cur} key={key} />
              ))}
            </CurrencyList>
          </Block>
        )}

        <Block>
          <ButtonsList>
            <ButtonDisconnect
              isShadow={false}
              appearance="ghost"
              dimension="s"
              onClick={handleOnDisconnect}>
              <SvgTrash size={10} />
              {t('disconnect2')}
            </ButtonDisconnect>
          </ButtonsList>
        </Block>
      </form>
    </WalletItemStyled>
  );
};
