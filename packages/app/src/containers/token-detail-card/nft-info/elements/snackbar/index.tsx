import React, { useEffect, useState } from 'react';
import { Snackbar as MuiSnackbar, Stack } from '@mui/material';
import { SnackbarAlert } from '@game-trade/ui';
import { SnackbarProps, useCustomWalletConnectorProvider, useSnackStack } from '@game-trade/lib';
import { Card, Maybe, User, Wallet } from '@game-trade/lib/codegen-types';
import { EnumSnackBar, getSnackBarMessage } from './helpers';
import { changeNetwork, getChainId, getNetworkName } from '@game-trade/lib/utils/get-blockchain';

interface IProps {
  nft: Card;
  phantomWallet: string;
  user?: User | null;
  phantomConnected?: boolean;
}

const getLowerCaseAddressWallets = (wallets: Maybe<Wallet[]>) => {
  if (wallets) return wallets.map((wallet: Wallet) => wallet.address.toLowerCase());
};

export const Snackbar = ({
  nft: _NFT,
  user: _USER,
  phantomWallet: _PHANTOM_WALLET,
  phantomConnected: _PHANTOM_CONNECTED,
}: IProps) => {
  const { addSnackbarMessage, snackbarMessages, removeSnackbarMessage } = useSnackStack();
  const {
    chainId: NETWORK_ID_METAMASK,
    isActive: ACTIVATED_METAMASK,
    account: ACTIVE_ADDRESS_METAMASK,
  } = useCustomWalletConnectorProvider();

  const [isSolana, setIsSolana] = useState(_NFT.blockchain === 'solana');
  const [network, setNetwork] = useState(
    _NFT?.blockchain === 'immutable' ? 'ethereum_mainnet' : _NFT?.blockchain
  );

  useEffect(() => {
    if (_NFT?.blockchain) {
      setNetwork(_NFT?.blockchain === 'immutable' ? 'ethereum_mainnet' : _NFT?.blockchain);
    }
    setIsSolana(_NFT?.blockchain === 'solana');
  }, [_NFT, NETWORK_ID_METAMASK]);

  const USER_WALLETS: string[] | undefined = _USER?.wallets
    ? getLowerCaseAddressWallets(_USER.wallets as Wallet[])
    : [];

  // metamask installed
  useEffect(() => {
    if (isSolana && !window?.phantom) {
      addSnackbarMessage([getSnackBarMessage(EnumSnackBar.phantom_not_installed)], true);
    } else if (!window.ethereum && !isSolana) {
      addSnackbarMessage([getSnackBarMessage(EnumSnackBar.metamask_not_installed)], true);
    }
  }, []);

  // metamask activate
  useEffect(() => {
    if (!isSolana && !ACTIVATED_METAMASK && window.ethereum) {
      addSnackbarMessage([getSnackBarMessage(EnumSnackBar.auto_connect_metamask)], true);
    }
    if (!isSolana && ACTIVATED_METAMASK) {
      removeSnackbarMessage(EnumSnackBar.auto_connect_metamask);
    }
  }, [ACTIVATED_METAMASK]);

  // metamask change blockchain
  useEffect(() => {
    const networkChangeCondition =
      ACTIVATED_METAMASK && NETWORK_ID_METAMASK && getNetworkName(NETWORK_ID_METAMASK) !== network;

    if (networkChangeCondition) {
      const nftChainId = getChainId(network);
      addSnackbarMessage([getSnackBarMessage(EnumSnackBar.network_change)], true);

      const _changeNetwork = async () => {
        return await changeNetwork(nftChainId);
      };
      _changeNetwork().then((res) => {
        if (res?.code === 4001) {
          addSnackbarMessage(
            [
              getSnackBarMessage(EnumSnackBar.cancel_network_change, {
                network,
                nftChainId,
              }),
            ],
            true
          );
        }
      });
    }
  }, [NETWORK_ID_METAMASK]);

  // metamask change address
  useEffect(() => {
    if (
      !_USER ||
      (!isSolana && !ACTIVATED_METAMASK) ||
      (isSolana && !_PHANTOM_CONNECTED) ||
      (!isSolana && getNetworkName(NETWORK_ID_METAMASK) !== network)
    ) {
      return;
    }

    const messages: SnackbarProps[] = [];

    if (!USER_WALLETS?.length && !snackbarMessages.find((m) => m.key === 'add_wallet')) {
      messages.push(getSnackBarMessage(EnumSnackBar.add_wallet));
    }

    if (USER_WALLETS?.length && !snackbarMessages.find((m) => m.key === 'add_new_wallet')) {
      if (isSolana && _PHANTOM_WALLET) {
        if (!USER_WALLETS.includes(_PHANTOM_WALLET)) {
          messages.push(
            getSnackBarMessage(EnumSnackBar.add_new_wallet, {
              activeAddressMetamask: _PHANTOM_WALLET,
            })
          );
        }
      } else if (!isSolana && ACTIVE_ADDRESS_METAMASK) {
        if (!USER_WALLETS.includes(ACTIVE_ADDRESS_METAMASK?.toLowerCase())) {
          messages.push(
            getSnackBarMessage(EnumSnackBar.add_new_wallet, {
              activeAddressMetamask: ACTIVE_ADDRESS_METAMASK,
            })
          );
        }
      }
    }

    if (
      !!USER_WALLETS &&
      !snackbarMessages.find((m) => m.key === 'switch_wallet') &&
      USER_WALLETS.includes(_NFT.owner.toLowerCase()) &&
      _NFT.platform === 'GAMETRADE'
    ) {
      if (isSolana && _PHANTOM_WALLET !== _NFT.owner.toLowerCase()) {
        messages.push(getSnackBarMessage(EnumSnackBar.switch_wallet));
      } else if (ACTIVE_ADDRESS_METAMASK?.toLowerCase() !== _NFT.owner.toLowerCase()) {
        messages.push(getSnackBarMessage(EnumSnackBar.switch_wallet));
      }
    }

    if (messages.length > 0) addSnackbarMessage(messages, true);

    if (
      ACTIVE_ADDRESS_METAMASK &&
      (USER_WALLETS?.includes(ACTIVE_ADDRESS_METAMASK.toLowerCase()) ||
        USER_WALLETS?.includes(_PHANTOM_WALLET))
    ) {
      removeSnackbarMessage(EnumSnackBar.add_new_wallet);
    }

    if (ACTIVE_ADDRESS_METAMASK === _NFT.owner) {
      removeSnackbarMessage(EnumSnackBar.switch_wallet);
    }

    if (isSolana && _PHANTOM_WALLET === _NFT.owner) {
      removeSnackbarMessage(EnumSnackBar.switch_wallet);
    }
  }, [
    USER_WALLETS?.length,
    ACTIVE_ADDRESS_METAMASK,
    _NFT,
    _USER,
    ACTIVATED_METAMASK,
    NETWORK_ID_METAMASK,
    _PHANTOM_WALLET,
    _PHANTOM_CONNECTED,
  ]);

  if (!snackbarMessages.length) return <></>;
  return (
    <MuiSnackbar
      open={!!snackbarMessages[0]}
      transitionDuration={0}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
      <Stack flexDirection="column" gap={1}>
        {snackbarMessages.map((item) => (
          <SnackbarAlert key={item.key} message={item} />
        ))}
      </Stack>
    </MuiSnackbar>
  );
};
