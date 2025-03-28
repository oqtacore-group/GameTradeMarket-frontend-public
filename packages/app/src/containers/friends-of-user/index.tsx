import { memo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';

import { routes, useAuthContext, getLastVisitedReadable } from '@game-trade/lib';
import { BreadCrumbs } from '@game-trade/ui';

import { Wrapper } from '../profile/style';
import { Header } from '../profile/header';
import { Content } from '../account/style';

import { SvgAvatarPerson } from '@game-trade/icons';
import {
  useMyFriendsLazyQuery,
  // useRemoveFromFriendsMutation,
  useIsMyFriendLazyQuery,
  useIsFriendRequestSentLazyQuery,
} from '@game-trade/lib/src/codegen-types';

import {
  TopHeader,
  FriendsWrapper,
  FriendWrapper,
  AvatarAndName,
  Name,
  OnlineStatus,
  ManageFriendsWrapper,
  // ActionBtns, RemoveBtn, SendMessageBtn,
} from './style';
import { useTranslation } from 'next-i18next';

export const FriendsOfUserContainer: React.FC = memo(() => {
  const { t } = useTranslation('friendsOfUser', { keyPrefix: 'translation' });
  const { query } = useRouter();

  const {
    authProviderData: { userInfoData },
  } = useAuthContext();

  const isMe = useCallback(
    () => [userInfoData?.id, userInfoData?.custom_url].includes(query.id as string),
    [userInfoData, query.id]
  );

  // const [removeFromFriends] = useRemoveFromFriendsMutation({
  //   fetchPolicy: 'no-cache',
  // });

  // const handleRemoveFromFriends = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
  //   await removeFromFriends({
  //     variables: {
  //       friend: e.currentTarget.dataset.friendId!,
  //     },
  //   });

  //   getMyFriends();
  // }, []);

  useEffect(() => {
    getFriendsOfUser();
  }, []);

  const [getFriendsOfUser, { data: friendsData, loading: friendsLoading }] = useMyFriendsLazyQuery({
    variables: {
      id: query.id as string,
      customUrl: query.id as string,
    },
    fetchPolicy: 'no-cache',
  });

  const [checkIsMyFriend, { data: isMyFriend, loading: checkIsMyFriendLoading }] =
    useIsMyFriendLazyQuery({ fetchPolicy: 'no-cache' });

  const [checkIsFriendRequestSent, { data: isFriendRequestSent }] = useIsFriendRequestSentLazyQuery(
    { fetchPolicy: 'no-cache' }
  );

  useEffect(() => {
    if (isMe() || !query.id) return;

    checkIsMyFriend({
      variables: {
        friend: query.id as string,
      },
    });

    checkIsFriendRequestSent({
      variables: {
        friend: query.id as string,
      },
    });
  }, [isMe, query.id]);

  const friendsList = friendsData?.user?.friends?.edges.node;

  if (friendsLoading || !friendsList) return <></>;

  return (
    <Wrapper>
      <BreadCrumbs
        crumbs={[
          { label: t('marketplace'), href: routes.marketplaceDefaultGameName },
          { label: t('friendsOfUser'), href: null },
        ]}
      />

      <Header
        imageUrl={(friendsData?.user as any).image_url}
        nickName={(friendsData?.user as any).nick_name}
        userId={query.id as string}
        isMe={isMe()}
        isMyFriend={!!isMyFriend?.isMyFriend?.isMyFriend}
        checkIsMyFriendLoading={checkIsMyFriendLoading}
        isFriendRequestSent={!!isFriendRequestSent?.isFriendRequestSent?.isFriendRequestSent}
      />

      <ManageFriendsWrapper>
        <Content>
          <TopHeader>
            {t('friends')} <small>({friendsData?.user?.friends?.totalCount})</small>
          </TopHeader>

          <FriendsWrapper>
            {friendsList.map((friend: any) => (
              <FriendWrapper key={friend.id}>
                <Link
                  href={{ pathname: `${routes.user}/[userId]` }}
                  as={`/${routes.user}/${friend.custom_url || friend.id}`}
                  passHref={true}>
                  <AvatarAndName>
                    {friend.image_url ? (
                      // eslint-disable-next-line
                      <img src={friend.image_url || ''} />
                    ) : (
                      <SvgAvatarPerson width={`${75}px`} height={`${75}px`} />
                    )}

                    <div>
                      <Name>{friend.nick_name}</Name>

                      <OnlineStatus>
                        {friend.last_visited &&
                        moment(friend.last_visited) > moment().utc().subtract(10, 'minutes') ? (
                          <span style={{ color: '#FF41B3' }}>{t('online')}</span>
                        ) : (
                          <span style={{ color: '#8C9FB1' }}>
                            {getLastVisitedReadable(friend.last_visited)}
                          </span>
                        )}
                      </OnlineStatus>
                    </div>
                  </AvatarAndName>
                </Link>

                {/* <ActionBtns>
                  <RemoveBtn onClick={handleRemoveFromFriends} data-friend-id={friend.id}>
                    Remove
                  </RemoveBtn>

                  <Link href={routes.chat} passHref={true}>
                    <SendMessageBtn onClick={handleRemoveFromFriends} data-friend-id={friend.id}>
                      Send message
                    </SendMessageBtn>
                  </Link>
                </ActionBtns> */}
              </FriendWrapper>
            ))}
          </FriendsWrapper>
        </Content>
      </ManageFriendsWrapper>
    </Wrapper>
  );
});
