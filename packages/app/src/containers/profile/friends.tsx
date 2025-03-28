import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SvgAvatarPerson } from '@game-trade/icons';
import { routes } from '@game-trade/lib';
import { User } from '@game-trade/lib/codegen-types';

import {
  FriendsWrapper,
  FriendsBlock,
  FriendsHeader,
  FriendsCount,
  FriendsContent,
  FriendItem,
  FriendImage,
  // StatusDot,
  FriendImageBox,
  FriendNick,
  EmptyFriends,
} from './style';
import { useTranslation } from 'next-i18next';

interface IProps {
  userIdOrCustomUrl: string;
  friends?: User[];
  friendsCount?: number;
  isMe: boolean;
}

export const Friends = ({ friends, friendsCount, isMe, userIdOrCustomUrl }: IProps) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'translation' });
  return (
    <FriendsWrapper>
      <FriendsBlock>
        <Link
          href={{
            pathname: isMe ? routes.manageFriends : `${routes.friendsOfUser}/${userIdOrCustomUrl}`,
          }}
          passHref={true}>
          <FriendsHeader>
            {t('friends')}
            {<FriendsCount>{friendsCount || 0}</FriendsCount>}
          </FriendsHeader>
        </Link>

        {!!friends?.length && (
          <FriendsContent>
            {friends?.map(({ image_url, nick_name, custom_url, id }, i) => (
              <Link
                key={id}
                href={{ pathname: `${routes.user}/[userId]` }}
                as={`/${routes.user}/${custom_url || id}`}
                passHref={true}>
                <FriendItem key={i}>
                  <FriendImageBox>
                    <FriendImage>
                      {image_url ? (
                        <Image
                          loader={image_url ? () => image_url : undefined}
                          layout={'intrinsic'}
                          objectFit="cover"
                          src={image_url}
                          width={75}
                          height={75}
                          alt=""
                        />
                      ) : (
                        <SvgAvatarPerson width={`${75}px`} height={`${75}px`} />
                      )}
                    </FriendImage>

                    {/*{online && <StatusDot />}*/}
                  </FriendImageBox>

                  {nick_name && <FriendNick>{nick_name}</FriendNick>}
                </FriendItem>
              </Link>
            ))}
          </FriendsContent>
        )}

        {(!friends || friends?.length < 1) && <EmptyFriends>{t('noFriends')}</EmptyFriends>}
      </FriendsBlock>

      {/* <FriendsBlock>
        <FriendsHeader>
          Groups
          <FriendsCount>0</FriendsCount>
        </FriendsHeader>

        <FriendsContent />

        <EmptyFriends>No groups</EmptyFriends>
      </FriendsBlock> */}
    </FriendsWrapper>
  );
};
