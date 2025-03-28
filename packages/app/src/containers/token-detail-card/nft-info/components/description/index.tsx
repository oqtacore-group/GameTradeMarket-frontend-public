import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import * as Style from './style';
import * as StyleNFTinfo from '../../style';
import * as Elements from '../../elements';

import { routes, GetDescriptionQuery, getDescription } from '@game-trade/lib';
import { AddressSliceComponent, ALIGN, Loader, SIZE } from '@game-trade/ui';
import { Maybe } from '@game-trade/lib/codegen-types';

interface IProps {
  refreshItem(): void;
  animationRefresh: boolean;
  gameName: string;
  platform?: string;
  id?: string | null;
  owner?: string;
  description?: string | null;
  name?: Maybe<string>;
}

export const Description = ({
  refreshItem,
  animationRefresh: _ANIMATION_REFRESH,
  gameName: _GAME_NAME,
  platform: _PLATFORM,
  owner: _OWNER,
  id: _ID,
  description: _DESCRIPTION,
  name: _NAME,
}: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    if (_ID) {
      getDescription(_ID, GetDescriptionQuery.getTokenCard)
        .then((r: string) => {
          setDescription(r);
          setLoadingDescription(true);
        })
        .catch((e) => {
          console.log('error', e.message);
          setLoadingDescription(true);
          setDescription(undefined);
        });
    }
  }, [_ID]);

  return (
    <Style.Block>
      <Style.BlockGameName>
        <Style.GameName>
          <Link
            href={{ pathname: `${routes.games}/[gameName]` }}
            as={`${routes.games}/${_GAME_NAME?.replace(/\s+/g, '-')}`}
            passHref={true}>
            <h1 style={{ fontSize: '1.6rem' }}>{_GAME_NAME}</h1>
          </Link>
        </Style.GameName>
        <Elements.ButtonRefresh refreshItem={refreshItem} animationRefresh={_ANIMATION_REFRESH} />
      </Style.BlockGameName>
      <Style.Name>{_NAME}</Style.Name>
      <Style.List>
        {_PLATFORM !== 'RISE_OF_ELVES' && (
          <Style.Item>
            <Style.Key>{t('description.ownedBy')} </Style.Key>
            <Style.Value>
              {_OWNER ? (
                <AddressSliceComponent address={_OWNER.toLowerCase()} />
              ) : (
                t('description.noInformation')
              )}
            </Style.Value>
          </Style.Item>
        )}
        {/*<WrapperElement>*/}
        {/*  <ElementTitle>Class: </ElementTitle>*/}
        {/*  <ElementDescription>no information available</ElementDescription>*/}
        {/*</WrapperElement>*/}
        {/*<WrapperElement>*/}
        {/*  <ElementTitle>Count: </ElementTitle>*/}
        {/*  <ElementDescription>no information available</ElementDescription>*/}
        {/*</WrapperElement>*/}
      </Style.List>
      {!loadingDescription && (
        <StyleNFTinfo.LoaderWrapper>
          <Loader size={SIZE.BASE} position={ALIGN.CENTER} />
        </StyleNFTinfo.LoaderWrapper>
      )}
      {loadingDescription && (description || _DESCRIPTION) && (
        <>
          <Style.Headline>{t('description.description')}</Style.Headline>
          <Style.Text>{description ? description : _DESCRIPTION ? _DESCRIPTION : ''}</Style.Text>
        </>
      )}
    </Style.Block>
  );
};
