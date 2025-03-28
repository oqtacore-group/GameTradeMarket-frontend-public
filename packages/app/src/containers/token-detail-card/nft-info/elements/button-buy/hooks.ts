import { buy, buySolana } from './helpers';
import { EnumSnackBar, getSnackBarMessage } from '../snackbar/helpers';

import { Card, User } from '@game-trade/lib/codegen-types';
import { routes, SnackbarProps } from '@game-trade/lib';
interface IArg {
  push(path: string): void;
  refreshItem(): Promise<void>;
  setAnimationRefresh(refresh: boolean): void;
  nft: Card;
  user?: User | null;
  gameCode: string;
  gameName: string;
  activeAddressMetamask?: string;
  beforeLogin: boolean;
  addSnackbarMessage: (message: SnackbarProps[], reset?: boolean) => void;
  hookWalletPhantom: any;
  handleOpenLoginOnToken: any;
  platform: string;
}

export const handleBuy = async ({
  refreshItem,
  setAnimationRefresh,
  handleOpenLoginOnToken,
  addSnackbarMessage,
  hookWalletPhantom,
  push,
  nft,
  user,
  gameCode,
  gameName,
  activeAddressMetamask,
  platform,
  beforeLogin,
}: IArg) => {
  setAnimationRefresh(true);
  if (nft.blockchain === 'solana') {
    try {
      await buySolana(nft, hookWalletPhantom);
      await refreshItem();
      addSnackbarMessage(
        [getSnackBarMessage(EnumSnackBar.purchase_success, { refreshItem })],
        true
      );
      setAnimationRefresh(false);
      if (!beforeLogin) handleOpenLoginOnToken();
    } catch (e: any) {
      const error = e ? JSON.parse(JSON.stringify(e)) : '';
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
      }
      setAnimationRefresh(false);

      console.log('buy error', error);
    }
  } else {
    try {
      await buy(nft, gameCode, platform, user, activeAddressMetamask);
      await refreshItem();
      addSnackbarMessage(
        [getSnackBarMessage(EnumSnackBar.purchase_success, { refreshItem })],
        true
      );
      setAnimationRefresh(false);
      if (!beforeLogin) handleOpenLoginOnToken();
    } catch (e: any) {
      setAnimationRefresh(false);
      console.log('e', e);
      const error = e ? JSON.parse(JSON.stringify(e)) : '';
      if (
        typeof e?.message !== 'string' &&
        (error?.reason == 'Sorry. The token has just been purchased' ||
          e?.message == 'Sorry. The token has just been purchased')
      ) {
        const redirectTo = `${routes.marketplace}/${encodeURIComponent(
          gameName.replace(/\s+/g, '-')
        )}?gameCode=${encodeURIComponent(gameCode.replaceAll(/\s/g, '_').toUpperCase())}`;
        if (error?.reason || e?.message) {
          await push(redirectTo);
        }
      } else if (e?.message?.includes('user rejected action')) {
        addSnackbarMessage([
          {
            children: 'User rejected transaction',
            severity: 'error',
            duration: 0,
          },
        ]);
      } else if ((e as any).message.includes('hash mismatch')) {
        setAnimationRefresh(true);
        addSnackbarMessage(
          [getSnackBarMessage(EnumSnackBar.purchase_success, { refreshItem })],
          true
        );
        setTimeout(async () => {
          await refreshItem();
          setAnimationRefresh(false);
        }, 10000);
      } else if ((e as any).message.includes('not have the balances')) {
        addSnackbarMessage([
          {
            children: `You have an insufficient coin balance '${nft?.coin_info?.symbol}'`,
            severity: 'error',
            duration: 0,
          },
        ]);
      } else if ((e as any).message.includes('could not decode result data')) {
        addSnackbarMessage([
          {
            children: 'do it again',
            severity: 'error',
            duration: 0,
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
      }
    }
  }
};
