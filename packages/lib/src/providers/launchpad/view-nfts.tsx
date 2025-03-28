import React, { useEffect, useState } from 'react';
import { ModalHeader, ModalContent, WrapperImage, Description } from './style';
import { AddressSliceComponent, ImageComponent } from '@game-trade/ui';
import { useMediaQuery } from '@mui/material';
const imgSrc =
  'https://ipfs.moralis.io:2053/ipfs/QmRY8u8J7zEqcvjjE6GdQw929QdZaeKJa6j9jWiJFJRPML/starterpack';

export const ViewNFTs = ({ getGameCode }: { getGameCode: string | undefined }) => {
  const isTablet = useMediaQuery('(max-width:1280px)');

  const [ids, setIds] = useState<string | null>();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (getGameCode === 'BATTLECITY' && localStorage.getItem('battle_city_launchpad')) {
        setIds(localStorage.getItem('battle_city_launchpad'));
      } else if (getGameCode === 'GEOPOLY' && localStorage.getItem('geopoly_launchpad')) {
        setIds(localStorage.getItem('geopoly_launchpad'));
      }
    }
  }, []);

  return (
    <ModalContent padding={true}>
      <ModalHeader padding={true}>
        {getGameCode === 'BATTLECITY' && (
          <Description>
            <h4>
              Legends of Tank Mystery Box ids: <u>{ids}</u>
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
              Geopoly ids: <u>{ids}</u>
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
