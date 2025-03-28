import React from 'react';
import { Modal } from '@game-trade/ui';

import { ModalContent, Errors } from '../style';

import { ConfirmModalRowButtons, DisconnectConfirmStyled, Header, ModalButton } from './style';
import { useTranslation } from 'next-i18next';

interface IProps {
  onClose(): void;
  onConfirm(data: any): void;
  disconnectWalletLoader: boolean;
  data: any;
  errorDisconnect?: string | null;
}

export function DisconnectConfirm(props: IProps) {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const { onClose, onConfirm, data, disconnectWalletLoader, errorDisconnect } = props;

  const onConfirmHandler = () => {
    onConfirm(data);
  };

  return (
    <Modal onClose={onClose} hasHeader={false} isPadding={false} size={455}>
      <ModalContent>
        <Header>{t('disconnect')}</Header>
        <DisconnectConfirmStyled>
          {errorDisconnect && <Errors>{errorDisconnect}</Errors>}
          <ConfirmModalRowButtons>
            <ModalButton
              onClick={onConfirmHandler}
              dimension="m"
              appearance="secondary"
              isLoader={disconnectWalletLoader}>
              {t('yes')}
            </ModalButton>
            <ModalButton onClick={onClose} dimension="m" appearance="primary">
              {t('no')}
            </ModalButton>
          </ConfirmModalRowButtons>
        </DisconnectConfirmStyled>
      </ModalContent>
    </Modal>
  );
}
