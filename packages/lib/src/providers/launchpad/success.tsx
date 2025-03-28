import React, { useEffect, useState } from 'react';
import {
  ModalHeader,
  ModalContent,
  Title,
  SubTitle,
  Description,
  WrapperImage,
  ActionButton,
} from './style';
import { AddressSliceComponent, COLORS, ImageComponent } from '@game-trade/ui';
import { useMediaQuery } from '@mui/material';
import {
  getIdNFT,
  sendNotification,
} from '@game-trade/app/src/containers/launchpad-detail-game/hooks';
import { useLoginContext } from '../login';
import Web3 from 'web3';
import { SvgIconRefresh } from '@game-trade/icons';
import { CATEGORY_GEOPOLY } from '@game-trade/app/src/containers/launchpad-detail-game/container';
import { RefreshInButton } from '@game-trade/app/src/containers/token-detail-card/nft-info/elements';

const imgSrc =
  'https://ipfs.moralis.io:2053/ipfs/QmRY8u8J7zEqcvjjE6GdQw929QdZaeKJa6j9jWiJFJRPML/starterpack';

export const Success = ({
  getGameCode,
  categoryGeopoly,
}: {
  getGameCode: string | undefined;
  categoryGeopoly: number;
}) => {
  const isTablet = useMediaQuery('(max-width:1280px)');
  const { onShowLoginWindow } = useLoginContext();
  const [id, setID] = useState<string | string[]>();

  function delay(ms: number) {
    return new Promise((resolve: any) => setTimeout(resolve, ms));
  }

  async function getID() {
    await delay(7000);

    try {
      let _id = null;
      let _ids = [];

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();

      if (typeof window !== 'undefined') {
        if (getGameCode === 'BATTLECITY') {
          _id = await getIdNFT('BATTLECITY');
          setID(_id.toString());
          localStorage.setItem(
            'battle_city_launchpad',
            (localStorage.getItem('battle_city_launchpad')
              ? localStorage.getItem('battle_city_launchpad')
              : '') +
              ', ' +
              _id
          );
        } else if (getGameCode === 'GEOPOLY') {
          _ids = await getIdNFT('GEOPOLY', accounts[0]);
          setID(_ids.map((i: any) => i.toString()));
          localStorage.setItem('geopoly_launchpad', _ids.toString());
        }
      }

      await sendNotification(
        getGameCode,
        accounts[0],
        _ids.length > 0
          ? _ids[_ids.length - 1].toString() +
              '\ncategory (id): ' +
              CATEGORY_GEOPOLY[categoryGeopoly] +
              ' (' +
              categoryGeopoly +
              ')'
          : _id
      );
    } catch (error: any) {
      console.log('e', error);
    }
  }

  useEffect(() => {
    const _getID = async () => {
      await getID();
    };

    _getID().catch(console.error);
  }, []);

  return (
    <ModalContent padding={true}>
      <ModalHeader padding={true}>
        <Title>Success</Title>
        <SubTitle>
          Write down your NFT id
          {getGameCode === 'BATTLECITY' && <b># {id}</b>}
          {getGameCode === 'GEOPOLY' && (
            <b>
              {id && id?.length > 0 ? (
                ' #' + (id as string[])?.join(', ')
              ) : (
                <RefreshInButton animation={!id?.length}>
                  <SvgIconRefresh size={22} color={COLORS.white} />
                </RefreshInButton>
              )}
            </b>
          )}{' '}
          If you don't want to lose your token, we recommend to{' '}
          <ActionButton onClick={() => onShowLoginWindow()}>sign up / sign in</ActionButton> and
          link your wallet in the account settings. Your token will be displayed on the Profile page
          (in the inventory section)
        </SubTitle>
        <hr />
        {getGameCode === 'BATTLECITY' && (
          <Description>
            <h4>
              Legends of Tank Mystery Box <span>#{id}</span>
            </h4>
            <h5>Description</h5>
            With the Legends of Tank Mystery Box, begin your thrilling battle in the world of the
            Legends of Tank Game with randomly 3 tanks and 1 hangar. Stay safe and bring home the
            loot!!!
            <WrapperImage>
              <ImageComponent
                link={imgSrc}
                alt={'Legends of Tank Mystery Box'}
                LCP={true}
                styleWrapper={{ position: 'initial' }}
                objectFit={isTablet ? 'contain' : 'cover'}
              />
            </WrapperImage>
            <br />
            <h5>
              Contract:
              <AddressSliceComponent
                copy={true}
                address={'0x270a38d34913840f0cd9564066ad13e7d9f855b4'}
              />
            </h5>
          </Description>
        )}
        {getGameCode === 'GEOPOLY' && (
          <Description>
            <h4>
              Geopoly ids:{' '}
              <span>
                #
                {id && id?.length > 0 ? (
                  (id as string[])?.join(', ')
                ) : (
                  <RefreshInButton animation={!id?.length}>
                    <SvgIconRefresh size={22} color={COLORS.white} />
                  </RefreshInButton>
                )}
              </span>
            </h4>
            <br />
            <h5>
              Contract:
              <AddressSliceComponent
                copy={true}
                address={'0xbA4E1AAd636C9D63b90E84aF7212873e669fF1A8'}
              />
            </h5>
          </Description>
        )}
      </ModalHeader>
    </ModalContent>
  );
};
