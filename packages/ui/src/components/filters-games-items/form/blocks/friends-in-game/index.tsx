import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import queryString from 'query-string';
import { useForm, useFormContext } from 'react-hook-form';
import { FriendsInGameContent, PopUpWindow } from './style';

import { ControlledField } from '../../../../../forms/controlled-field';
import { ALIGN, Loader, SIZE } from '../../../../../elements/loader';
import { Checkbox, CheckboxGroup } from '../components/checkbox';

import { SvgInfo } from '@game-trade/icons';
import { substringAsPath } from '@game-trade/app/src/containers/marketplace/utils';

export interface IFriendInGameItem {
  code: string;
  title: string;
  checked: boolean;
}

export interface IFriendInGameData {
  key?: any;
  title?: any;
  type?: any;
  items?: IFriendInGameItem[] | null;
  [key: string]: any;
}

interface IProps {
  data?: IFriendInGameData | null;
  loading?: boolean;
  serverSideData?: any;
}

export const FriendsInGameFilterBlock = (props: IProps) => {
  const { data, loading } = props;
  const dataFriendInGame = data?.items;

  const router = useRouter();
  const queryFriendInGames =
    queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    }).friendInGames === 'true';

  // const serverSideFriendInGame = serverSideData?.gameFilters?.find((filter: any) => {
  //   return filter.key === 'FRIENDS_IN_GAME';
  // });

  const { setValue: mainSetValue } = useFormContext();
  const { control, setValue, watch } = useForm<any>();

  const watchFriendInGame = watch('friendInGame');

  const [filteredList, setFilteredList] = useState(dataFriendInGame);

  useEffect(() => {
    if (dataFriendInGame) {
      setFilteredList(dataFriendInGame);
    }
  }, [dataFriendInGame]);

  useEffect(() => {
    if (queryFriendInGames) {
      setValue(
        'friendInGame',
        queryFriendInGames
          ? [
              {
                checked: true,
                code: 'is_friend_in_game',
                disable: false,
                title: 'Friend in game',
              },
            ]
          : []
      );
    }
  }, []);

  useEffect(() => {
    if (queryFriendInGames && !watchFriendInGame) {
      mainSetValue('friendInGame', {
        key: 'FRIENDS_IN_GAME',
        title: 'Friends in game',
        type: 'CHECKBOX',
        items: queryFriendInGames
          ? [
              {
                checked: true,
                code: 'is_friend_in_game',
                disable: false,
                title: 'Friend in game',
              },
            ]
          : [],
      });
      return;
    }
    mainSetValue(
      'friendInGame',
      watchFriendInGame?.length
        ? {
            key: 'FRIENDS_IN_GAME',
            title: 'Friends in game',
            type: 'CHECKBOX',
            items: queryFriendInGames
              ? [
                  {
                    checked: true,
                    code: 'is_friend_in_game',
                    disable: false,
                    title: 'Friend in game',
                  },
                ]
              : [],
          }
        : undefined
    );
  }, [watchFriendInGame]);

  // friendInGames: queryDevices
  //   ? {
  //     key: 'FRIENDS_IN_GAME',
  //     title: 'Friends in game',
  //     type: 'CHECKBOX',
  //     items: queryBlockchains
  //       ? [
  //         {
  //           checked: true,
  //           code: 'is_friend_in_game',
  //           disable: false,
  //           title: 'Friend in game',
  //         },
  //       ]
  //       : [],
  //   }
  //   : undefined,

  return (
    <FriendsInGameContent>
      <ControlledField control={control} name="friendInGame">
        <CheckboxGroup>
          {filteredList?.map((friendsInGameItem: any) => {
            return (
              <Checkbox
                key={friendsInGameItem.code}
                grouped={true}
                value={friendsInGameItem}
                valueKey="code"
                label={`${friendsInGameItem.title}`}
                disabled={friendsInGameItem.disable}
              />
            );
          })}
        </CheckboxGroup>
      </ControlledField>
      <SvgInfo />
      <PopUpWindow>Games where your friends own tokens</PopUpWindow>
      {(loading || typeof window === 'undefined') && (
        <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
      )}
    </FriendsInGameContent>
  );
};
