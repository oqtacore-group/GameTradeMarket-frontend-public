import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { routes, useNotificationsContext } from '@game-trade/lib';
import {
  useApproveFriendRequestMutation,
  useRejectFriendRequestMutation,
} from '@game-trade/lib/src/codegen-types';

import { socket } from './utils';

import { Buttons, Btn } from './style';
import { i18next } from '@game-trade/lib/services/i18n/index.js';

const NotificationButtons: React.FC<any> = (props) => {
  const { push } = useRouter();

  const { setNotificationsDropdownVisible, notifications, setNotifications } =
    useNotificationsContext();

  const [approveFriendRequest] = useApproveFriendRequestMutation({ fetchPolicy: 'no-cache' });
  const [rejectFriendRequest] = useRejectFriendRequestMutation({ fetchPolicy: 'no-cache' });

  const handleApproveFriendRequest = useCallback((friendId: string) => {
    approveFriendRequest({
      variables: { friend: friendId },
    });
  }, []);

  const handleRejectFriendRequest = useCallback((senderId: string) => {
    rejectFriendRequest({
      variables: { sender: senderId },
    });
  }, []);

  // Get buttons for different types of events
  const getButtonsForEventWithType = useCallback(
    (n: { [k: string]: any }) => {
      switch (n.type) {
        case 'FRIEND_REQUEST_SENT':
          return [
            {
              title: `${i18next.t('translation.allIncomingRequests', { ns: 'elements' })}`,
              handler: () => {
                push(routes.manageFriends + '?screen=Incoming+requests');
                setNotificationsDropdownVisible(false);
              },
            },

            {
              title: `${i18next.t('translation.accept', { ns: 'elements' })}`,
              handler: () => {
                handleApproveFriendRequest(n.data.senderId);
                socket.emit('notificationClear', { id: n.id });
                setNotifications(notifications.filter((item: any) => item.id !== n.id));
              },
            },

            {
              title: `${i18next.t('translation.decline', { ns: 'elements' })}`,
              handler: () => {
                handleRejectFriendRequest(n.data.senderId);
                socket.emit('notificationClear', { id: n.id });
                setNotifications(notifications.filter((item: any) => item.id !== n.id));
              },
            },
          ];

        case 'FRIEND_REQUEST_APPROVED':
          return [
            {
              title: `${i18next.t('translation.allOutgoingRequests', { ns: 'elements' })}`,
              handler: () => {
                push(routes.manageFriends + '?screen=Outgoing+requests');
                setNotificationsDropdownVisible(false);
              },
            },

            {
              title: `${i18next.t('translation.sendMessage', { ns: 'elements' })}`,
              handler: () => {
                push(routes.chat + '?user=' + n.data.senderId);
                setNotificationsDropdownVisible(false);
                socket.emit('notificationClear', { id: n.id });
                setNotifications(notifications.filter((item: any) => item.id !== n.id));
              },
            },
          ];

        case 'NEW_MESSAGE':
          return [
            {
              title: `${i18next.t('translation.goToChat', { ns: 'elements' })}`,
              handler: () => {
                push(routes.chat + '?user=' + n.data.senderId);
                setNotificationsDropdownVisible(false);
              },
            },

            {
              title: `${i18next.t('translation.markAsRead', { ns: 'elements' })}`,
              handler: () => {
                setNotifications(
                  notifications.filter((item: any) => {
                    return item.data.senderId !== n.data.senderId || item.id > n.id;
                  })
                );

                socket.emit('notificationsClearThisAndEarlierFromSender', {
                  id: n.id,
                  senderId: n.data.senderId,
                });
                socket.emit('messagesMarkAsReadFromSenderThisAndEarlier', n.data);
              },
            },
          ];

        case 'BUY_TOKEN':
          return [
            {
              title: `${i18next.t('translation.viewItem', { ns: 'elements' })}`,
              handler: () => console.warn('View item'),
            },
          ];

        default:
          return [];
      }
    },
    [notifications, setNotifications]
  );

  return (
    <Buttons>
      {getButtonsForEventWithType(props.notification).map((btn) => (
        <Btn key={Math.random()} onClick={btn.handler}>
          {btn.title}
        </Btn>
      ))}
    </Buttons>
  );
};

export default NotificationButtons;
