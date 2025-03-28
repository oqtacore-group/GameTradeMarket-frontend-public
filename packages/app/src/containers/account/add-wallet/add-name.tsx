import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@game-trade/ui';
import { useConnectWalletMutation, WalletProvider } from '@game-trade/lib/src/codegen-types';

import { Errors } from '../style';

import { ContainerForm, ConfirmModalRowButtons, ModalButton } from './style';
import { useTranslation } from 'next-i18next';
import { dataLayerTrigger, trackEventsPixel } from '@game-trade/lib';

interface IProps {
  onClose(): void;
  onConfirm(): void;
  account: string;
  currentConnector: string;
}

type Form = Partial<{
  name: string;
}>;

export function AddWalletName(props: IProps) {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const { onClose, onConfirm, account, currentConnector } = props;
  const [errorAdd, setErrorAdd] = useState<string | undefined>(undefined);
  const [walletError, setWalletError] = useState(false);
  const [connectWalletMutation, { loading, error }] = useConnectWalletMutation();

  const errorCode = 'WALLET_ALREADY_CONNECTED';
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, dirtyFields },
  } = useForm<Form>();

  const handleFormSubmit = async (variables: Form) => {
    clearErrors(['name']);
    setErrorAdd(undefined);
    try {
      const wallet = await connectWalletMutation({
        variables: {
          address: account as string,
          name: variables.name as string,
          provider:
            currentConnector === 'MetaMask'
              ? WalletProvider.Metamask
              : WalletProvider.WalletConnect,
        },
        fetchPolicy: 'no-cache',
      });

      if (error?.graphQLErrors) {
        setErrorAdd(error?.graphQLErrors[0].message || undefined);
      }

      if (wallet?.data?.connectWallet?.code === errorCode) {
        setWalletError(true);
      } else {
        setWalletError(false);
      }

      if (!error && wallet?.data?.connectWallet?.code !== errorCode) {
        onConfirm();
        onClose();
        dataLayerTrigger('WalletAdded', {
          address: account as string,
          name: variables.name as string,
          provider:
            currentConnector === 'MetaMask'
              ? WalletProvider.Metamask
              : WalletProvider.WalletConnect,
        });
        trackEventsPixel('WalletAdded', {
          content_type: 'wallet',
          address: account as string,
          name: variables.name as string,
          provider:
            currentConnector === 'MetaMask'
              ? WalletProvider.Metamask
              : WalletProvider.WalletConnect,
        });
      }
    } catch (e) {
      onClose();
    }
  };

  const isDirty = !!Object.keys(dirtyFields).length;

  const errorsForm = [
    errors?.name && !!errors?.name?.message ? errors?.name.message : undefined,
    errorAdd,
  ].filter((e) => e !== undefined);

  return (
    <ContainerForm onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        type="text"
        placeholder={t('walletName')}
        maxLength={100}
        {...register('name', {
          required: `${t('required')}`,
          maxLength: 100,
          minLength: 3,
        })}
      />
      {errorsForm.length > 0 && (
        <Errors>
          {errorsForm.map((error) => (
            <div key={error}>{error}</div>
          ))}
        </Errors>
      )}
      {errors.name && errors.name.type !== 'required' && (
        <Errors>
          {errors.name.type === 'minLength' && <div>{t('nameWallet')}</div>}
          {errors.name.type === 'maxLength' && <div>{t('nameWallet100Characters')}</div>}
        </Errors>
      )}
      {walletError && (
        <Errors>
          <div>{t('walletAdded')}</div>
        </Errors>
      )}
      <ConfirmModalRowButtons>
        <ModalButton
          type="submit"
          dimension="m"
          appearance="primary"
          disabled={!isDirty}
          isLoader={loading}>
          {t('add')}
        </ModalButton>
        <ModalButton onClick={onClose} dimension="m" appearance="secondary" type="reset">
          {t('back')}
        </ModalButton>
      </ConfirmModalRowButtons>
    </ContainerForm>
  );
}
