import { useState, createContext, useContext } from 'react';

import { INotificationsProviderValue } from './interfaces';

export const NotificationsContext = createContext<INotificationsProviderValue>(
  {} as INotificationsProviderValue
);

export const useNotificationsContext = () => useContext(NotificationsContext);

export const NotificationsProvider = ({ children }: any) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const [notificationsDropdownVisible, setNotificationsDropdownVisible] = useState<boolean>(false);

  return (
    <NotificationsContext.Provider
      value={{
        notificationsDropdownVisible,
        setNotificationsDropdownVisible,
        notifications,
        setNotifications,
      }}>
      {children}
    </NotificationsContext.Provider>
  );
};
