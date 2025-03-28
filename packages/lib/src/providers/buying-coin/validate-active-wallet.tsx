import {
  ListWallets,
  WalletItem,
  WalletAddress,
  WalletBalance,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SubTitle,
  Title,
  WrapperButton,
  ModalWrapperWallet,
} from './style';
import { Button } from '@game-trade/ui';
import React, { useEffect, useState } from 'react';
import { useBuyingCoinContext, WINDOW_TYPES_BUYING_COIN } from './index';
import { useAuthContext, useCustomWalletConnectorProvider } from '@game-trade/lib';
import { Wallet } from '@game-trade/lib/src/codegen-types';
import { formatUnits } from '@ethersproject/units';

export const ValidateActiveWallet = () => {
  const { handleChangeWindowType, tempData } = useBuyingCoinContext();
  const { isActive, account, activateConnector } = useCustomWalletConnectorProvider();
  const {
    authProviderData: { userInfoData },
  } = useAuthContext();

  const [connectedWallet, setConnectedWallet] = useState<boolean>();

  const listOfWallets = (userInfoData?.wallets || []) as Wallet[];

  useEffect(() => {
    activateConnector();
  }, []);

  useEffect(() => {
    setConnectedWallet(
      listOfWallets.filter((a) => a.address.toLowerCase() === account?.toLowerCase()).length === 0
    );
  }, [listOfWallets, account]);

  const sortActive = (list: Wallet[]) => {
    if (isActive && account) {
      return [
        ...list.filter((a) => a.address.toLowerCase() === account?.toLowerCase()),
        ...list.filter((a) => a.address.toLowerCase() !== account?.toLowerCase()),
      ];
    }
    return list;
  };

  const buyToken = () => {
    handleChangeWindowType(WINDOW_TYPES_BUYING_COIN.BUY_COIN);
  };

  const getCoinBalance = (item: Wallet) => {
    const balance = item.balances?.find(
      (coin: any) => coin?.currency === tempData?.currency?.coin_name
    );
    if (balance) {
      const value = formatUnits(balance.value, balance.decimals);
      return `${value} ${balance.currency}`;
    }
    return `0 ${tempData?.currency?.coin_name}`;
  };

  return (
    <ModalContent>
      <ModalWrapperWallet>
        <ModalHeader>
          <Title>Validate active wallet</Title>
          <SubTitle>
            Make sure that correct wallet is selected in your wallet app (Metamask or other)
          </SubTitle>
        </ModalHeader>
        <ModalBody>
          <ListWallets>
            {sortActive(listOfWallets).map((item) => (
              <WalletItem
                key={item.address}
                isActive={Boolean(
                  isActive && account?.toLowerCase() === item.address.toLowerCase()
                )}>
                <WalletAddress>{item.address}</WalletAddress>
                <WalletBalance>{getCoinBalance(item)}</WalletBalance>
              </WalletItem>
            ))}
          </ListWallets>
        </ModalBody>
        <ModalFooter>
          <WrapperButton>
            <Button
              onClick={buyToken}
              disabled={connectedWallet}
              appearance="primary"
              dimension="m">
              Next
            </Button>
          </WrapperButton>
        </ModalFooter>
      </ModalWrapperWallet>
    </ModalContent>
  );
};
