import React, { useEffect, useState } from 'react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';

import * as Style from './style';
import * as Component from './components';
import * as Window from './windows';
import * as Element from './elements';

import { SvgIconRefresh } from '@game-trade/icons';

import { COLORS, PriceComponent } from '@game-trade/ui';
import { Card, useRefreshInventoryItemMutation, Maybe } from '@game-trade/lib/src/codegen-types';
import { useAuthContext, useCustomWalletConnectorProvider, useSnackStack } from '@game-trade/lib';
import { sendDeposit } from './elements/button-buy/helpers';

interface IProps {
  nft: Card;
  game: { code: string; name: string };
}

export const Info = (props: IProps) => {
  const { nft, game } = props;

  const router = useRouter();
  const { setVisible: setVisiblePhantom } = useWalletModal();
  const { addSnackbarMessage } = useSnackStack();

  // states
  const [animationRefresh, setAnimationRefresh] = useState(false);
  const [phantomConnected, setPhantomConnected] = useState();
  const [phantomInstalled, setPhantomInstalled] = useState();
  const [openDepositFunc, setOpenDepositFunc] = useState<boolean>(false);
  const [metamaskInstalled, setMetamaskInstalled] = useState<any>();
  const [price, setPrice] = useState<Maybe<number>>(nft?.price);
  // states end

  // states owner
  const hookWalletPhantom = useWallet();
  const [phantomWallet, setPhantomWallet] = useState('');
  const {
    isActive: activatedMetamask,
    account: activeAddressMetamask,
    activateConnector,
  } = useCustomWalletConnectorProvider();
  // end states owner

  // states windows
  const [showWindowAddWallet, setShowWindowAddWallet] = useState(false);
  const [showWindowSetThePrice, setShowWindowSetThePrice] = useState(false);
  // states windows end

  // providers
  const {
    authProviderData: { userInfoData: user },
  } = useAuthContext();
  // providers end

  const IS_SOLANA_BLOCKCHAIN = nft?.blockchain === 'solana';

  useEffect(() => {
    const _phantomWallet =
      (hookWalletPhantom &&
        hookWalletPhantom?.publicKey &&
        hookWalletPhantom?.publicKey?.toString()?.toLowerCase()) ||
      '';
    setPhantomWallet(_phantomWallet);
  }, [hookWalletPhantom]);

  useEffect(() => {
    if (nft) {
      setPrice(nft.price);
    }
  }, [nft]);

  useEffect(() => {
    connect().catch((e) => console.error(e));
    refreshItem().catch((e: any) =>
      addSnackbarMessage([{ children: e.message, severity: 'error' }])
    );

    setMetamaskInstalled(window?.ethereum);
    setPhantomInstalled(window?.phantom);
    setPhantomConnected(window?.phantom?.solana?.isConnected);

    let intervalSolanaConnect: any;
    if (IS_SOLANA_BLOCKCHAIN && phantomInstalled && !phantomConnected) {
      setVisiblePhantom(true);
      intervalSolanaConnect = setInterval(() => {
        if (typeof window !== undefined && window.solana) {
          window.solana.connect();
        }
      }, 10000);
    }
    if (
      IS_SOLANA_BLOCKCHAIN &&
      phantomInstalled &&
      hookWalletPhantom &&
      hookWalletPhantom?.publicKey?.toString()?.toLowerCase() &&
      !phantomConnected
    ) {
      hookWalletPhantom?.connect();
    }

    return () => {
      clearInterval(intervalSolanaConnect);
    };
  }, []);

  useEffect(() => {
    if (IS_SOLANA_BLOCKCHAIN && phantomConnected) {
      setPhantomWallet(
        (hookWalletPhantom &&
          hookWalletPhantom?.publicKey &&
          hookWalletPhantom.publicKey.toString().toLowerCase()) ||
          ''
      );
    }
  }, [hookWalletPhantom, phantomConnected]);

  useEffect(() => {
    if (!IS_SOLANA_BLOCKCHAIN) {
      if (!activatedMetamask && metamaskInstalled) {
        const _connect = async () => {
          await connect();
        };

        _connect().catch((err) => console.log('err', err));
      }
    } else {
      if (!phantomConnected) {
        setVisiblePhantom(true);
      }
    }
  }, [activatedMetamask, user]);

  const [refreshInventoryItemMutation] = useRefreshInventoryItemMutation({
    fetchPolicy: 'no-cache',
  });

  const refreshItem = async () => {
    if (!nft) return;
    setAnimationRefresh(true);

    try {
      refreshInventoryItemMutation({
        variables: {
          contract: nft?.contract,
          token_value: nft?.token_value,
          blockchain: nft?.blockchain,
        },
      }).then(async () => {
        await router.push(router.asPath, undefined, {
          scroll: false,
          shallow: false,
        });
        setAnimationRefresh(false);
      });
    } catch (error: any) {
      console.error('error', error);
      addSnackbarMessage([
        { children: JSON.stringify(error?.message), severity: 'error', duration: 0 },
      ]);
      setAnimationRefresh(false);
    }
  };

  const connect = async () => {
    if (!activatedMetamask && !IS_SOLANA_BLOCKCHAIN) {
      try {
        await activateConnector('MetaMask');
      } catch (e: any) {
        addSnackbarMessage([
          { children: JSON.stringify(e.message), severity: 'error', duration: 0 },
        ]);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === 'g' && event.ctrlKey) {
        // Ctrl + G
        setOpenDepositFunc((prevState) => !prevState);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Style.Wrapper>
      <Component.Image image={nft?.picture} name={nft?.name} />
      <Style.Information>
        <Component.Description
          refreshItem={refreshItem}
          animationRefresh={animationRefresh}
          gameName={game?.name}
          platform={nft?.platform}
          id={nft?.id}
          owner={nft?.owner}
          description={nft?.description}
          name={nft?.name}
        />

        {/*<div onClick={async () => await getSolanatransactionInfo()}>Transaction</div>*/}
        {/*<div onClick={async () => await updateAuctionHouse(hookWalletPhantom)}>Update</div>*/}

        <Style.WrapperActions>
          <Style.Actions>
            {animationRefresh && (
              <Element.RefreshInButton animation={animationRefresh}>
                <SvgIconRefresh size={22} color={COLORS.white} />
              </Element.RefreshInButton>
            )}
            {!animationRefresh && (
              <PriceComponent
                price={price}
                usdPrice={nft?.coin_info?.usd_price}
                onlyCrypto={!nft?.coin_info?.usd_price}
                blockchain={nft?.blockchain}
                coinLogo={
                  IS_SOLANA_BLOCKCHAIN
                    ? 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=026'
                    : nft?.coin_info?.logo
                }
                isDetailLogoSize={true}
              />
            )}

            {openDepositFunc && (
              <div
                onClick={async () => {
                  await sendDeposit(hookWalletPhantom);
                }}>
                send deposit
              </div>
            )}

            <Element.ButtonBuy
              platform={nft?.platform}
              nft={nft}
              setAnimationRefresh={setAnimationRefresh}
              phantomWallet={phantomWallet}
              user={user}
              price={price}
              game={game}
              refreshItem={refreshItem}
              setShowWindowAddWallet={setShowWindowAddWallet}
              owner={nft?.owner}
              animationRefresh={animationRefresh}
            />
            {(nft?.owner.toLowerCase() === activeAddressMetamask?.toLowerCase() ||
              nft?.owner.toLowerCase() === phantomWallet?.toLowerCase()) &&
              user && (
                <Element.ButtonSetThePrice
                  setAnimationRefresh={setAnimationRefresh}
                  setShowWindowSetThePrice={setShowWindowSetThePrice}
                />
              )}
          </Style.Actions>
        </Style.WrapperActions>
      </Style.Information>

      {showWindowSetThePrice && (
        <Window.SetThePrice
          nft={nft}
          refreshItem={refreshItem}
          setShowWindowSetThePrice={setShowWindowSetThePrice}
          setAnimationRefresh={setAnimationRefresh}
        />
      )}

      {showWindowAddWallet && (
        <Window.AddWallet
          setShowWindowAddWallet={setShowWindowAddWallet}
          setAnimationRefresh={setAnimationRefresh}
          refreshItem={refreshItem}
          user={user}
          nft={nft}
          platform={nft?.platform}
          game={game}
          activeAddressMetamask={activeAddressMetamask}
        />
      )}

      <Window.Redirection token_url={nft?.token_url} is_external_item={nft?.is_external_item} />

      <Element.Snackbar
        user={user}
        nft={nft}
        phantomWallet={phantomWallet}
        phantomConnected={phantomConnected}
      />
    </Style.Wrapper>
  );
};
