import { memo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import moment from 'moment';

import { routes, useNotificationsContext, getLastVisitedReadable } from '@game-trade/lib';
import { SvgAvatarPerson } from '@game-trade/icons';
import {
  useIncomingRequestsLazyQuery,
  useApproveFriendRequestMutation,
  useRejectFriendRequestMutation,
} from '@game-trade/lib/src/codegen-types';

import { socket } from '../notifications/utils';
import {
  TopHeader,
  FriendsWrapper,
  FriendWrapper,
  AvatarAndName,
  Name,
  ActionBtns,
  RemoveBtn,
  AddBtn,
  OnlineStatus,
} from './style';
import { useTranslation } from 'next-i18next';

// interface IProps {}

export const TabIncomingRequests = memo(() => {
  const { t } = useTranslation('manageFriendsPage', {
    keyPrefix: 'translation.tabIncomingRequests',
  });
  const { notifications, setNotifications } = useNotificationsContext();

  const [getIncomingRequests, { data: requestsData, loading: requestsLoading }] =
    useIncomingRequestsLazyQuery({
      fetchPolicy: 'no-cache',
    });

  const [approveFriendRequest] = useApproveFriendRequestMutation({
    fetchPolicy: 'no-cache',
  });

  const [rejectFriendRequest] = useRejectFriendRequestMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getIncomingRequests();

    // Clear all FRIEND_REQUEST_SENT notifications
    socket.emit('notificationsClearAllWithTypeFriendRequestSent');
    setNotifications(notifications.filter((n: any) => n.type !== 'FRIEND_REQUEST_SENT'));
  }, []);

  const handleAddToFriends = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    await approveFriendRequest({
      variables: {
        friend: e.currentTarget.dataset.friendId!,
      },
    });

    getIncomingRequests();
  }, []);

  const handleRejectFriendRequest = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    await rejectFriendRequest({
      variables: {
        sender: e.currentTarget.dataset.senderId!,
      },
    });

    getIncomingRequests();
  }, []);

  if (requestsLoading || !requestsData) return null;

  const requestsList: any[] = requestsData.incomingRequests.edges.node as any[];

  if (!requestsList.length) {
    return <div>{t('noIncoming')}</div>;
  }

  return (
    <>
      <TopHeader>
        {t('incomingRequests')}{' '}
        <small>
          {requestsList.length == 1
            ? `${requestsList.length} ${t('request')}`
            : `${requestsList.length} ${t('requests')}`}
        </small>
      </TopHeader>

      <FriendsWrapper>
        {requestsList.map((friend: any) => (
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

            <ActionBtns>
              <AddBtn onClick={handleAddToFriends} data-friend-id={friend.id}>
                {t('addToFriends')}
              </AddBtn>

              <RemoveBtn onClick={handleRejectFriendRequest} data-sender-id={friend.id}>
                {t('decline')}
              </RemoveBtn>
            </ActionBtns>
          </FriendWrapper>
        ))}
      </FriendsWrapper>
    </>
  );
});
