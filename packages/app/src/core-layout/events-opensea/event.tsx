import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import {
  Address,
  AddressFrom,
  AddressTo,
  Body,
  Collection,
  Header,
  HeaderLeft,
  Price,
  PriceWrapper,
  // Seller,
  Status,
  Time,
  Token,
  TokenDetail,
  Wrapper,
} from './style';
import { SvgAvatarPerson } from '@game-trade/icons';
// import { ethers } from 'ethers';
import { ImageComponent } from '@game-trade/ui/modifiers/get-image-optimization';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export const Event = ({ transaction }: { transaction: any }) => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation.event' });
  const [copyFrom, setCopyFrom] = useState(false);
  const [copyTo, setCopyTo] = useState(false);
  const [time, setTime] = useState();
  const type = transaction.Event === 'sale' ? t('sold') : '';

  useEffect(() => {
    let _time: any = Number(
      moment
        .duration(
          Number(moment().utc().unix()) - Number(moment(transaction.Timestamp).parseZone().unix()),
          'seconds'
        )
        .asSeconds()
        .toFixed()
    );

    if (Number(_time) > 60) {
      _time =
        moment.duration(_time, 'second').asMinutes().toFixed() +
        ' ' +
        t('min') +
        ' ' +
        (_time !== 60 ? (_time % 60) + ' ' + t('secAgo') : t('ago'));
    } else {
      _time = _time + ' ' + t('secondsAgo');
    }
    setTime(_time);
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderLeft>
          <Status>{type}</Status>
          <Link
            href={{
              pathname: `/marketplace/token/${transaction.blockchain}/${transaction.Token_contract}/${transaction.Token_id}`,
            }}
            passHref={true}>
            <a target="_blank" rel="noreferrer">
              <ImageComponent
                link={transaction.Image}
                alt={transaction.Name}
                layout={'intrinsic'}
                width={31}
                height={31}
                LCP={false}
              />
              {/*<ImageWrapper>*/}
              {/*  {transaction.Index && (*/}
              {/*    <Index src={transaction.Index} layout={'intrinsic'} width={31} height={31} />*/}
              {/*  )}*/}
              {/*</ImageWrapper>*/}
            </a>
          </Link>
        </HeaderLeft>
        <Time>
          {/*{ moment().utc().toString() } <br/>*/}
          {/*{ moment(transaction.Timestamp).parseZone().toString() } <br/>*/}
          {/*{ moment().utc().unix().toString() } <br/>*/}
          {/*{ moment(transaction.Timestamp).unix() } <br/>*/}
          {/*{ Number(moment().utc().unix().toString()) } <br/>*/}
          {/*{ Number(moment(transaction.Timestamp).utc().unix()) } <br/>*/}
          {/*{ Number(moment().utc().unix()) - Number(moment(transaction.Timestamp).utc().unix()) } <br/>*/}
          {/*{ Number(moment().utc().unix()) - Number(moment(transaction.Timestamp).unix()) }*/}
          {/*{moment*/}
          {/*  .duration(*/}
          {/*    Number(moment().utc().unix()) -*/}
          {/*      Number(moment(transaction.Timestamp).parseZone().unix()),*/}
          {/*    'seconds'*/}
          {/*  )*/}
          {/*  .asSeconds()*/}
          {/*  .toFixed() + ' seconds ago'}*/}
          {time}
          {/*{moment*/}
          {/*  .duration(*/}
          {/*    Number(moment(new Date()).utc()) -*/}
          {/*      Number(moment(transaction.Timestamp).utc())*/}
          {/*  )*/}
          {/*  .asMinutes()*/}
          {/*  .toFixed(0)}*/}
          {/*{transaction.Timestamp}{' '}*/}
          {/*{moment.duration(transaction.Timestamp).asSeconds()}*/}
          {/*{(Math.random() * 10).toFixed()} minutes ago*/}
        </Time>
      </Header>
      <Body>
        {/*{transaction.Event === 'list' && (*/}
        {/*  <Seller>*/}
        {/*    <SvgAvatarPerson />{' '}*/}
        {/*    <Address*/}
        {/*      copy={copyFrom}*/}
        {/*      onClick={() => {*/}
        {/*        navigator.clipboard.writeText(transaction.Seller);*/}
        {/*        setCopyFrom(true);*/}
        {/*        setTimeout(() => {*/}
        {/*          setCopyFrom(false);*/}
        {/*        }, 2000);*/}
        {/*      }}>*/}
        {/*      {transaction.Seller_username ? transaction.Seller_username : transaction.Seller}*/}
        {/*    </Address>*/}
        {/*    listed*/}
        {/*  </Seller>*/}
        {/*)}*/}
        <TokenDetail>
          <Token>
            <Link
              href={{
                pathname: `/marketplace/token/${transaction.blockchain}/${transaction.Token_contract}/${transaction.Token_id}`,
              }}
              passHref={true}>
              <a target="_blank" rel="noreferrer">
                {transaction.Name}
              </a>
            </Link>
          </Token>
          {t('from')}
          <Collection>
            <Link
              href={{
                pathname: `/marketplace/token/${transaction.blockchain}/${transaction.Token_contract}`,
              }}
              passHref={true}>
              <a target="_blank" rel="noreferrer">
                {transaction.Collection}
              </a>
            </Link>
          </Collection>
        </TokenDetail>
        {transaction.Event === 'sale' && (
          <>
            <AddressFrom>
              {t('was')} {type.toLowerCase()} {t('from')}
              <SvgAvatarPerson />
              <Address
                copy={copyFrom}
                onClick={() => {
                  navigator.clipboard.writeText(transaction.Seller);
                  setCopyFrom(true);
                  setCopyTo(false);
                  setTimeout(() => {
                    setCopyFrom(false);
                  }, 2000);
                }}>
                <Link
                  href={{
                    pathname:
                      transaction.blockchain === 'polygon'
                        ? `https://polygonscan.com/address/${transaction.From}`
                        : `https://etherscan.io/address/${transaction.From}`,
                  }}
                  passHref={true}>
                  <a target="_blank" rel="noreferrer">
                    {transaction.From_username ? transaction.From_username : transaction.From}
                  </a>
                </Link>
              </Address>
            </AddressFrom>
            <AddressTo>
              {t('to')} <SvgAvatarPerson />{' '}
              <Address
                copy={copyTo}
                onClick={() => {
                  navigator.clipboard.writeText(transaction.Seller);
                  setCopyTo(true);
                  setCopyFrom(false);
                  setTimeout(() => {
                    setCopyTo(false);
                  }, 2000);
                }}>
                <Link
                  href={{
                    pathname:
                      transaction.blockchain === 'polygon'
                        ? `https://polygonscan.com/address/${transaction.To}`
                        : `https://etherscan.io/address/${transaction.To}`,
                  }}
                  passHref={true}>
                  <a target="_blank" rel="noreferrer">
                    {transaction.To_username ? transaction.To_username : transaction.To}
                  </a>
                </Link>
              </Address>
            </AddressTo>
          </>
        )}

        {transaction.Price && transaction.Currency && (
          <PriceWrapper>
            {t('for')}{' '}
            <Price>
              {/*{ethers.utils.formatEther(transaction.Price)} {transaction.Currency}*/}
            </Price>
          </PriceWrapper>
        )}
      </Body>
    </Wrapper>
  );
};
