import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

import IconBellSvg from '@game-trade/app/public/imgs/icon-header/icon_bell.svg';
import IconBellFilledSvg from '@game-trade/app/public/imgs/icon-header/icon_bell_filled.svg';
import IconCrossSvg from '@game-trade/app/public/imgs/icon-header/icon_cross.svg';
import { useNotificationsContext, useOnClickOutside } from '@game-trade/lib';

import NotificationButtons from './notification-buttons';
import { initEventsSocket, socket } from './utils';
import {
  Notifications,
  NotificationsDropdown,
  NotificationsInner,
  NotificationsList,
  NotificationItem,
  DateAndRemove,
  Heading,
  Desc,
} from './style';
import { i18next } from '@game-trade/lib/services/i18n/index.js';

const getNotificationObject = (n: any) => {
  const date = moment(n.create_time);
  const utcOffset = moment().utcOffset();
  date.add(utcOffset, 'minutes');

  return {
    id: n.id,
    date: date.format('MMM D, H:m a.').replace('am.', 'a.m.').replace('pm.', 'p.m.'),
    title: n.title,
    body: n.body,
    type: n.type,
    data: n.data,
  };
};

const NotificationsContainer: React.FC = () => {
  const { pathname } = useRouter();
  const {
    notificationsDropdownVisible,
    setNotificationsDropdownVisible,
    notifications,
    setNotifications,
  } = useNotificationsContext();

  const dropdownRef = useRef<any>(null);
  useOnClickOutside(dropdownRef, () => setNotificationsDropdownVisible(false));

  // Clear notification
  const clearNotification = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const id = +e.currentTarget.dataset.notificationId!;
      socket.emit('notificationClear', { id });
      setNotifications(notifications.filter((n: any) => n.id !== id));
    },
    [notifications, setNotifications]
  );

  // Clear all MEW_MESSAGE notifications if we went to chat page
  useEffect(() => {
    if (pathname.includes('/chat')) {
      socket?.emit('notificationsClearAllWithTypeNewMessage');
      setNotifications(notifications.filter((n: any) => n.type !== 'NEW_MESSAGE'));
    }
  }, [pathname]);

  // Handle socket's "onNotifications"
  const handleOnNotifications = useCallback(
    (allNotifications: any) => {
      const transformedNotifications = allNotifications.map((n: any) => getNotificationObject(n));
      setNotifications(transformedNotifications);
    },
    [setNotifications, notifications]
  );

  // Handle socket's "onMarketEvent"
  const handleOnMarketEvent = useCallback(
    (n: any) => {
      if (location.pathname.includes('/chat')) {
        socket.emit('notificationClear', { id: n.id });
        return;
      }

      setNotifications([getNotificationObject(n), ...notifications]);
    },
    [notifications, setNotifications]
  );

  // Initial socket setup
  useEffect(() => {
    initEventsSocket();
  }, []);

  // Hook event handlers
  useEffect(() => {
    socket.on('onNotifications', handleOnNotifications);
    socket.on('onMarketEvent', handleOnMarketEvent);

    return () => {
      socket.off('onNotifications', handleOnNotifications);
      socket.off('onMarketEvent', handleOnMarketEvent);
    };
  }, [handleOnNotifications, handleOnMarketEvent]);

  return (
    <Notifications>
      {notifications.length ? (
        <IconBellFilledSvg
          onClick={() => setNotificationsDropdownVisible(!notificationsDropdownVisible)}
        />
      ) : (
        <IconBellSvg
          onClick={() => setNotificationsDropdownVisible(!notificationsDropdownVisible)}
        />
      )}

      {notificationsDropdownVisible && (
        <NotificationsDropdown ref={dropdownRef}>
          <h4>
            {i18next.t('translation.notifications', { ns: 'elements' })}
            {!!notifications.length && <span>{notifications.length}</span>}
          </h4>

          <NotificationsList>
            <NotificationsInner>
              {notifications.length ? (
                <>
                  {notifications.map((n: any) => (
                    <NotificationItem key={Math.random()}>
                      <DateAndRemove>
                        <span>{n.date}</span>
                        <IconCrossSvg onClick={clearNotification} data-notification-id={n.id} />
                      </DateAndRemove>

                      <Heading>{n.title}</Heading>
                      <Desc>{n.body}</Desc>

                      <NotificationButtons notification={n} />
                    </NotificationItem>
                  ))}
                </>
              ) : (
                <p>
                  <small>{i18next.t('translation.noNewNotifications', { ns: 'elements' })}</small>
                </p>
              )}
            </NotificationsInner>
          </NotificationsList>
        </NotificationsDropdown>
      )}
    </Notifications>
  );
};

export default NotificationsContainer;
