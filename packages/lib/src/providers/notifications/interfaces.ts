export interface INotificationsProviderValue {
  notificationsDropdownVisible: boolean;
  setNotificationsDropdownVisible: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: any[];
  setNotifications: React.Dispatch<React.SetStateAction<any[]>>;
}
