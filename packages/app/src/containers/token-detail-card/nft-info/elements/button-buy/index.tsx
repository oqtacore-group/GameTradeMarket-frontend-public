import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import * as Style from '../../style';
import { handleBuy } from './hooks';
import { useRouter } from 'next/router';

import { useCustomWalletConnectorProvider, useLoginContext, useSnackStack } from '@game-trade/lib';
import * as Element from '@/containers/token-detail-card/nft-info/elements';
import { SvgIconRefresh } from '@game-trade/icons';
import { COLORS } from '@game-trade/ui';
import { Card, Game, Maybe, User, Wallet } from '@game-trade/lib/codegen-types';
import { useWallet } from '@solana/wallet-adapter-react';
import { changeNetwork, getNetworkName } from '@game-trade/lib/utils/get-blockchain';
import {
  EnumSnackBar,
  getSnackBarMessage,
} from '@/containers/token-detail-card/nft-info/elements/snackbar/helpers';

interface IProps {
  setShowWindowAddWallet(show: boolean): void;
  setAnimationRefresh(refresh: boolean): void;
  animationRefresh: boolean;
  platform: string;
  owner?: string;
  phantomWallet: string;
  user?: User | null;
  price: Maybe<number>;
  nft: Card;
  game: Game;
  refreshItem(): Promise<void>;
}

const getLowerCaseAddressWallets = (wallets: Maybe<Wallet[]>) => {
  if (wallets) return wallets.map((wallet: Wallet) => wallet.address.toLowerCase());
};

export const ButtonBuy = ({
  platform,
  setAnimationRefresh,
  price,
  phantomWallet,
  user,
  nft,
  game,
  refreshItem,
  owner,
  animationRefresh,
  setShowWindowAddWallet,
}: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const { account: activeAddressMetamask, chainId, isActive } = useCustomWalletConnectorProvider();
  const IS_SOLANA_BLOCKCHAIN = nft?.blockchain === 'solana';

  const { push } = useRouter();
  const { addSnackbarMessage, resetSnackbarMessage } = useSnackStack();
  const { onShowLoginWindow, onShowAfterBuying } = useLoginContext();
  const hookWalletPhantom = useWallet();

  const [isWallet, setIsWallet] = useState<boolean>();
  const [isPrice, setIsPrice] = useState<boolean>();
  const [activeAddress, setActiveAddress] = useState(activeAddressMetamask);
  const [wallets, setWallets] = useState<string[] | undefined>([]);

  useEffect(() => {
    setActiveAddress(activeAddressMetamask);
  }, [activeAddressMetamask, owner, price]);

  useEffect(() => {
    const _isPrice = price && price > 0;
    setIsPrice(!!_isPrice);
  }, [price]);

  useEffect(() => {
    if (user && user.wallets) setWallets(getLowerCaseAddressWallets(user.wallets));
  }, [user]);

  useEffect(() => {
    if (!wallets || wallets?.length <= 0) return;
    const _isWallet =
      (activeAddress && wallets?.includes(activeAddress?.toLowerCase())) ||
      (phantomWallet && wallets?.includes(phantomWallet?.toLowerCase()));
    setIsWallet(!!_isWallet);
  }, [activeAddress, wallets, phantomWallet]);

  const handleOpenLoginOnToken = useCallback(() => {
    resetSnackbarMessage();
    onShowLoginWindow();
    onShowAfterBuying();
  }, []);

  const buy = async () => {
    await handleBuy({
      refreshItem,
      hookWalletPhantom,
      push,
      handleOpenLoginOnToken,
      addSnackbarMessage,
      setAnimationRefresh,
      beforeLogin: !!user,
      nft,
      user,
      gameCode: game.code,
      gameName: game.name,
      platform,
      activeAddressMetamask: activeAddress,
    });
  };

  const _changeNetwork = async () => {
    await changeNetwork(chainId as number);
    addSnackbarMessage([getSnackBarMessage(EnumSnackBar.network_change)], true);
  };

  if (getNetworkName(chainId) !== nft.blockchain && !IS_SOLANA_BLOCKCHAIN && isActive) {
    return <Style.Button onClick={async () => await _changeNetwork()}>Change Network</Style.Button>;
  }

  if (
    ((!isWallet && !user) || (isWallet && user)) &&
    isPrice &&
    !(
      owner?.toLowerCase() === (window?.ethereum as any)?.selectedAddress?.toLowerCase() ||
      owner?.toLowerCase() === activeAddress?.toLowerCase() ||
      owner?.toLowerCase() === phantomWallet?.toLowerCase()
    ) &&
    (phantomWallet || activeAddress)
  ) {
    return (
      <Style.Button onClick={async () => (!animationRefresh ? await buy() : '')} id="buy-token">
        {animationRefresh ? (
          <Element.RefreshInButton animation={animationRefresh}>
            <SvgIconRefresh size={22} color={COLORS.white} />
          </Element.RefreshInButton>
        ) : (
          t('buttons.buy')
        )}
      </Style.Button>
    );
  }

  if (
    !isWallet &&
    user &&
    isPrice &&
    !(
      owner?.toLowerCase() === (window?.ethereum as any)?.selectedAddress?.toLowerCase() ||
      owner?.toLowerCase() === activeAddress?.toLowerCase() ||
      owner?.toLowerCase() === phantomWallet?.toLowerCase()
    ) &&
    (phantomWallet || activeAddressMetamask)
  ) {
    return (
      <Style.Button onClick={() => setShowWindowAddWallet(true)}>{t('buttons.buy')}</Style.Button>
    );
  }

  return <></>;
};
