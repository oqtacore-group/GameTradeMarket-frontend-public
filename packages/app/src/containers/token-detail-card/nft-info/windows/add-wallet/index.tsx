import React, { useCallback, useState, useEffect } from 'react';
import { isMobile, isAndroid, isIOS } from 'react-device-detect';
import { SvgWalletConnect } from '@game-trade/icons';
import SvgMetamask from './metamask.svg';
import { Modal, COLORS } from '@game-trade/ui';
import {
  useCustomWalletConnectorProvider,
  TConnector,
  useSnackStack,
  useLoginContext,
} from '@game-trade/lib';

import * as Style from './style';

import { useTranslation } from 'next-i18next';
import { AddWalletName } from '@root/src/containers/account/add-wallet/add-name';
import { handleBuy } from '@/containers/token-detail-card/nft-info/elements/button-buy/hooks';
import { User, Card, Game } from '@game-trade/lib/codegen-types';
import { useRouter } from 'next/router';
import { useWallet } from '@solana/wallet-adapter-react';

interface IProps {
  setShowWindowAddWallet(show: boolean): void;
  setAnimationRefresh(refresh: boolean): void;
  refreshItem(): Promise<void>;
  user?: User | null;
  nft: Card;
  game: Game;
  platform: string;
  activeAddressMetamask?: string;
}

export function AddWallet({
  setShowWindowAddWallet,
  setAnimationRefresh,
  refreshItem,
  user,
  nft,
  game,
  platform,
  activeAddressMetamask,
}: IProps) {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });
  const [isShowAddNameModal, setShowAddNameModal] = useState(false);
  const [isShowRefreshPage, setShowRefreshPage] = useState(false);
  const [ifFirstOpen, setFirstOpen] = useState(true);

  const { push } = useRouter();
  const { addSnackbarMessage, resetSnackbarMessage } = useSnackStack();
  const { onShowLoginWindow, onShowAfterBuying } = useLoginContext();
  const hookWalletPhantom = useWallet();

  const androidMetaMask = 'https://metamask.app.link/bxwkE8oF99',
    iosMetaMask = 'https://metamask.app.link/skAH3BaF99',
    extentionMetaMask = 'https://metamask.io/download/';

  const {
    account,
    currentConnector,
    isActive,
    provider,
    connector,
    isActivating,
    error,
    activateConnector,
    deactivateConnector,
  } = useCustomWalletConnectorProvider();

  useEffect(() => {
    if (ifFirstOpen) {
      return;
    }
    if (account && !isActivating && isActive && !error) {
      setShowAddNameModal(true);
    }
  }, [isActivating, isActive, provider, connector, account, currentConnector]);

  // MetaMask | WalletConnect
  let clear: any = null;
  const handleConnect = useCallback(
    async (connector: TConnector) => {
      if (connector === 'WalletConnect') {
        clear && clearTimeout(clear);
        setShowAddNameModal(false);
        await deactivateConnector();
        clear = setTimeout(async () => {
          await activateConnector(connector);
        }, 200);
      }
      if (connector === 'MetaMask') {
        if (isActive && currentConnector === connector) {
          setShowAddNameModal(true);
        } else {
          await activateConnector(connector);
        }
      }

      setFirstOpen(false);
    },
    [isActive, provider, connector, account]
  );

  const onCloseAddForm = useCallback(() => {
    setShowAddNameModal(false);
  }, [isShowAddNameModal]);

  const handleOpenLink = () => {
    setShowRefreshPage(true);
    let link;
    if (isAndroid) {
      link = androidMetaMask;
    } else if (isIOS) {
      link = iosMetaMask;
    } else if (!isMobile) {
      link = extentionMetaMask;
    }
    window.open(link, '_blank');
  };

  const handleOpenLoginOnToken = useCallback(() => {
    resetSnackbarMessage();
    onShowLoginWindow();
    onShowAfterBuying();
  }, []);

  const onConfirmAddWallet = async () => {
    setShowWindowAddWallet(false);
    setAnimationRefresh(true);
    location.href = location.origin + location.pathname;
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
      activeAddressMetamask,
    });
  };

  return (
    <Modal
      onClose={() => setShowWindowAddWallet(false)}
      hasHeader={false}
      isPadding={false}
      size={560}>
      <Style.ModalContent>
        {!isShowRefreshPage && (
          <>
            <Style.Header>{t('connectWallet')} </Style.Header>
            <Style.TextWrapper>{t('dontHaveWallet')}</Style.TextWrapper>
          </>
        )}

        {isShowRefreshPage && (
          <>
            <Style.Header>{t('refreshPage')}</Style.Header>
          </>
        )}
        {
          <>
            {!isShowAddNameModal && account && (
              <Style.NetworkWalletList>
                {!isMobile && (
                  <Style.NetworkWalletItem
                    onClick={() => handleConnect('MetaMask')}
                    isActive={Boolean(isActive && currentConnector === 'MetaMask')}>
                    <Style.NetworkWalletItemLabel>
                      <SvgMetamask size={21} color={COLORS.blue10} />
                      <span>{t('Metamask')}</span>
                    </Style.NetworkWalletItemLabel>
                  </Style.NetworkWalletItem>
                )}
                <Style.NetworkWalletItem
                  onClick={() => handleConnect('WalletConnect')}
                  isActive={Boolean(isActive && currentConnector === 'WalletConnect')}>
                  <Style.NetworkWalletItemLabel>
                    <SvgWalletConnect size={21} color={COLORS.blue10} />
                    <span>{t('WalletConnect')}</span>
                  </Style.NetworkWalletItemLabel>
                </Style.NetworkWalletItem>
              </Style.NetworkWalletList>
            )}

            {!account && !isActive && !isShowRefreshPage && (
              <Style.NetworkWalletList>
                <Style.NetworkWalletItem
                  onClick={() => handleOpenLink()}
                  isActive={Boolean(isActive && currentConnector === 'MetaMask')}>
                  <Style.NetworkWalletItemLabel>
                    <SvgMetamask size={21} color={COLORS.blue10} />
                    <span>{t('Metamask')}</span>
                  </Style.NetworkWalletItemLabel>
                </Style.NetworkWalletItem>
                <Style.NetworkWalletItem
                  onClick={() => handleConnect('WalletConnect')}
                  isActive={Boolean(isActive && currentConnector === 'WalletConnect')}>
                  <Style.NetworkWalletItemLabel>
                    <SvgWalletConnect size={21} color={COLORS.blue10} />
                    <span>{t('WalletConnect')}</span>
                  </Style.NetworkWalletItemLabel>
                </Style.NetworkWalletItem>
              </Style.NetworkWalletList>
            )}

            {isShowAddNameModal && (
              <AddWalletName
                onClose={onCloseAddForm}
                onConfirm={onConfirmAddWallet}
                account={account || ''}
                currentConnector={currentConnector}
              />
            )}
          </>
        }
      </Style.ModalContent>
    </Modal>
  );
}
