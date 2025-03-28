import React, { useState } from 'react';
import {
  ModalHeader,
  ModalContent,
  Title,
  SubTitle,
  MintButton,
  Description,
  ChooseTitle,
  ContinueButton,
  CancelButton,
  SelectorList,
  ChooseButton,
} from './style';
import {
  mintClassic,
  mintGeopoly,
} from '@game-trade/app/src/containers/launchpad-detail-game/hooks';
import { WINDOW_TYPES } from './index';
import { SvgIconRefresh } from '@game-trade/icons';
import { COLORS } from '@game-trade/ui';
import { CATEGORY_GEOPOLY } from '@game-trade/app/src/containers/launchpad-detail-game/container';
import Image from 'next/image';
import { RefreshInButton } from '@game-trade/app/src/containers/token-detail-card/nft-info/elements/button-refresh';

const bucket = 'https://cdn.gametrade.market/geopoly/';
const image = (img: any) => {
  switch (img) {
    case 9:
      return `${bucket}9-sportfield.gif`;
    case 14:
      return `${bucket}14-theater.gif`;
    case 21:
      return `${bucket}21-museum.gif`;
    case 22:
      return `${bucket}22-stadium.gif`;
    case 26:
      return `${bucket}26-university.gif`;
    default:
      return `${bucket}22-stadium.gif`;
  }
};

export const Alert = ({
  handleChangeWindowType,
  getGameCode,
  onHideWindow,
  handleChangeCategoryGeopoly,
}: {
  handleChangeWindowType: (type: WINDOW_TYPES, message?: string) => void;
  getGameCode: string | undefined;
  onHideWindow: any;
  handleChangeCategoryGeopoly: (id: number) => void;
  categoryGeopoly?: number;
}) => {
  const [animationRefresh, setAnimationRefresh] = useState(false);
  const [categoryID, setCategoryID] = useState(22);

  const mintToken = async (_categoryID?: number) => {
    setAnimationRefresh(true);
    try {
      if (getGameCode === 'BATTLECITY') {
        await mintClassic();
      } else if (getGameCode === 'GEOPOLY') {
        await mintGeopoly(_categoryID as number);
      }
      handleChangeCategoryGeopoly(_categoryID as number);
      handleChangeWindowType(WINDOW_TYPES.SUCCESS);
      setAnimationRefresh(false);
    } catch (error: any) {
      const messageError = error ? JSON.parse(JSON.stringify(error)) : '';
      let message;
      if (messageError?.info?.error?.data?.message?.split('err:')[1])
        message = messageError?.info?.error?.data?.message?.split('err:')[1];
      if (messageError?.info?.error?.data?.message?.split('err:')[0])
        message = messageError?.info?.error?.data?.message?.split('err:')[0];
      if (messageError?.info?.error?.message) message = messageError?.info?.error?.message;
      handleChangeWindowType(WINDOW_TYPES.ERROR, message);
      setAnimationRefresh(false);
    }
  };

  return (
    <ModalContent padding={false}>
      <ModalHeader padding={true}>
        {getGameCode !== 'GEOPOLY' ? (
          <>
            <Title>Alert</Title>
            <SubTitle>
              You have initiated the process of minting a Battle City token. You will now see a
              window where you have to enter the amount of exactly <span>3.9 USDT</span> to complete
              the transaction. This will allow us to perform the transaction.
            </SubTitle>
            <Description>
              We also recommend that you do not complete the transaction if the price of gas is more
              than $1. usually this is temporary, and you can try again in 2-3 minutes
              <br />
              <br />
            </Description>
            <MintButton onClick={async () => await mintToken()}>
              {animationRefresh ? (
                <RefreshInButton animation={animationRefresh}>
                  <SvgIconRefresh size={22} color={COLORS.white} />
                </RefreshInButton>
              ) : (
                'Mint'
              )}
            </MintButton>
          </>
        ) : (
          <>
            <ChooseTitle>Choose building category</ChooseTitle>
            <Image width={'400px'} height={'400px'} src={image(categoryID)} unoptimized={true} />
            <SelectorList>
              <ChooseButton isActive={categoryID === 22} onClick={() => setCategoryID(22)}>
                {CATEGORY_GEOPOLY[22]} $49.00
              </ChooseButton>
              <ChooseButton isActive={categoryID === 21} onClick={() => setCategoryID(21)}>
                {CATEGORY_GEOPOLY[21]} $25.00
              </ChooseButton>
              <ChooseButton isActive={categoryID === 14} onClick={() => setCategoryID(14)}>
                {CATEGORY_GEOPOLY[14]} $15.00
              </ChooseButton>
              <ChooseButton isActive={categoryID === 26} onClick={() => setCategoryID(26)}>
                {CATEGORY_GEOPOLY[26]} $10.00
              </ChooseButton>
              <ChooseButton isActive={categoryID === 9} onClick={() => setCategoryID(9)}>
                {CATEGORY_GEOPOLY[9]} $5.00
              </ChooseButton>
            </SelectorList>
            <ContinueButton onClick={async () => await mintToken(categoryID)}>
              {animationRefresh ? (
                <RefreshInButton animation={animationRefresh}>
                  <SvgIconRefresh size={22} color={COLORS.white} />
                </RefreshInButton>
              ) : (
                'Continue'
              )}
            </ContinueButton>
            <CancelButton onClick={onHideWindow}>Cancel</CancelButton>
          </>
        )}
      </ModalHeader>
    </ModalContent>
  );
};
