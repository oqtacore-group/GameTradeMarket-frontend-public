import React from 'react';
import { useTranslation } from 'next-i18next';
import * as Style from '../../style';

import { EnumSnackBar, getSnackBarMessage } from '../snackbar/helpers';
import { useSnackStack } from '@game-trade/lib';

interface IProps {
  setShowWindowSetThePrice(show: boolean): void;
  setAnimationRefresh(refresh: boolean): void;
}

export const ButtonSetThePrice = ({ setAnimationRefresh, setShowWindowSetThePrice }: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const { addSnackbarMessage } = useSnackStack();

  const onClick = async () => {
    // if (nft.blockchain !== 'solana') await connect();

    try {
      setAnimationRefresh(true);
      setShowWindowSetThePrice(true);
    } catch (e: any) {
      setAnimationRefresh(false);
      addSnackbarMessage([
        getSnackBarMessage(EnumSnackBar.canceled_approved),
        { children: e.message, severity: 'error' },
      ]);
    }

    setAnimationRefresh(false);
  };

  return <Style.Button onClick={onClick}>{t('buttons.setThePrice')}</Style.Button>;
};
