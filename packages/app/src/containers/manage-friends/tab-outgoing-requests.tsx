import { memo, useEffect, useCallback } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import { routes, useNotificationsContext, getLastVisitedReadable } from '@game-trade/lib';
import { SvgAvatarPerson } from '@game-trade/icons';
import {
  useOutgoingRequestsLazyQuery,
  useCancelOutgoingFriendRequestMutation,
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
  OnlineStatus,
} from './style';

// interface IProps {}

export const TabOutgoingRequests = memo(() => {
  const { t } = useTranslation('manageFriendsPage', {
    keyPrefix: 'translation.tabOutgoingRequests',
  });
  const { notifications, setNotifications } = useNotificationsContext();

  const [getOutgoingRequests, { data: requestsData, loading: requestsLoading }] =
    useOutgoingRequestsLazyQuery({
      fetchPolicy: 'no-cache',
    });

  const [cancelOutgoingFriendRequest] = useCancelOutgoingFriendRequestMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getOutgoingRequests();

    // Clear all FRIEND_REQUEST_APPROVED notifications
    socket.emit('notificationsClearAllWithTypeFriendRequestApproved');
    setNotifications(notifications.filter((n: any) => n.type !== 'FRIEND_REQUEST_APPROVED'));
  }, []);

  const handleCancelOutgoingFriendRequest = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      await cancelOutgoingFriendRequest({
        variables: {
          sender: e.currentTarget.dataset.senderId!,
        },
      });

      getOutgoingRequests();
    },
    []
  );

  if (requestsLoading || !requestsData) return null;

  const requestsList: any[] = requestsData.outgoingRequests.edges.node as any[];

  if (!requestsList.length) {
    return <div>{t('noOutgoingRequests')}</div>;
  }

  return (
    <>
      <TopHeader>
        {t('outgoingRequests')}{' '}
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
              <RemoveBtn onClick={handleCancelOutgoingFriendRequest} data-sender-id={friend.id}>
                {t('cancel')}
              </RemoveBtn>
            </ActionBtns>
          </FriendWrapper>
        ))}
      </FriendsWrapper>
    </>
  );
});
