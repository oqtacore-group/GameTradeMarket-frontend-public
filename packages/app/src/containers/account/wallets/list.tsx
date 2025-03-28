import React, { useEffect, useState } from 'react';
import { SvgPlus } from '@game-trade/icons';
import { COLORS, ALIGN, Loader, SIZE } from '@game-trade/ui';
import {
  Wallet,
  useMyWalletsLazyQuery,
  useDisconnectWalletMutation,
} from '@game-trade/lib/src/codegen-types';
import { SolanaAutoConnectProvider, useCustomWalletConnectorProvider } from '@game-trade/lib';

import { TitleTabPage } from '../style';
import { DisconnectConfirm } from '../confirm/disconnect';
import { AddWalletComponent } from '../add-wallet';

import { AddWalletStyled, ListWallets } from './style';
import { WalletItem } from './wallet';

import { Plus } from '@/containers/account/general/style';
import { useTranslation } from 'next-i18next';

export function WalletList() {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const [isConfirmModal, setConfirmModal] = useState(false);
  const [isAddWallet, setAddWallet] = useState(false);
  const [errorDisconnect, setErrorDisconnect] = useState<string | null>(null);
  const [disconnectedData, setDisconnectedData] = useState<string | null>(null);
  const { isActive, account } = useCustomWalletConnectorProvider();

  const [getMyWalletsLazy, { data: dataMyWallets, loading: myWalletsLoader }] =
    useMyWalletsLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  const [disconnectWalletMutation, { loading: disconnectWalletLoader }] =
    useDisconnectWalletMutation({
      fetchPolicy: 'no-cache',
    });

  useEffect(() => {
    getMyWalletsLazy();
  }, [account]);

  useEffect(() => {
    if (dataMyWallets?.myWallets?.length === 0) {
      setAddWallet(true);
    } else {
      setAddWallet(false);
    }
  }, [dataMyWallets]);

  const onClose = () => {
    setConfirmModal(false);
  };

  const onConfirm = async (address: string) => {
    const { errors } = await disconnectWalletMutation({
      variables: {
        address,
      },
    });
    if (errors && errors.length) {
      setErrorDisconnect(errors[0]?.message);
    }
    if (!errors) {
      setConfirmModal(false);
      getMyWalletsLazy();
    }
  };

  const onConfirmAddWallet = () => {
    setAddWallet(false);
    getMyWalletsLazy();
  };

  const onCloseAddWallet = () => {
    setAddWallet(false);
  };

  const handleDisconnect = (address: string) => {
    setConfirmModal(true);
    setDisconnectedData(address);
  };

  const sortActive = (list: Wallet[]) => {
    if (isActive && account) {
      return [
        ...list.filter((a) => a.address.toLowerCase() === account?.toLowerCase()),
        ...list.filter((a) => a.address.toLowerCase() !== account?.toLowerCase()),
      ];
    }
    return list;
  };

  const listOfWallets = (dataMyWallets?.myWallets || []) as Wallet[];
  const addressList = listOfWallets.map((l) => l.address.toLowerCase());
  return (
    <>
      <TitleTabPage>
        <span>{t('wallets')}</span>
        <div>
          <AddWalletStyled onClick={() => setAddWallet(true)}>
            <Plus>
              <SvgPlus size={15} color={COLORS.blue} />
            </Plus>{' '}
            {t('addWallet')}
          </AddWalletStyled>
        </div>
      </TitleTabPage>

      <ListWallets>
        {myWalletsLoader && <Loader size={SIZE.BASE} position={ALIGN.CENTER} />}
        {sortActive(listOfWallets).map((item, key) => (
          <WalletItem
            key={item.address}
            handleDisconnect={handleDisconnect}
            wallet={item}
            isActive={Boolean(isActive && account?.toLowerCase() === item.address.toLowerCase())}
          />
        ))}
      </ListWallets>

      {isConfirmModal && (
        <DisconnectConfirm
          onClose={onClose}
          onConfirm={onConfirm}
          data={disconnectedData}
          errorDisconnect={errorDisconnect}
          disconnectWalletLoader={disconnectWalletLoader}
        />
      )}

      {isAddWallet && (
        <SolanaAutoConnectProvider>
          <AddWalletComponent
            addressList={addressList}
            onClose={onCloseAddWallet}
            onConfirm={onConfirmAddWallet}
          />
        </SolanaAutoConnectProvider>
      )}
    </>
  );
}
