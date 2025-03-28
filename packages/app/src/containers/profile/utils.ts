import { i18next } from '@game-trade/lib/services/i18n/index.js';
import { TabId } from './interface';

export const getAvatarSize = (isMobile?: boolean, isTablet?: boolean) => {
  if (isMobile) {
    return 104;
  }
  if (isTablet) {
    return 104;
  }
  return 140;
};

export const getItemIconSize = (isMobile?: boolean, isTablet?: boolean) => {
  if (isMobile) {
    return 84;
  }
  if (isTablet) {
    return 100;
  }
  return 118;
};

export const initialTabs = [
  {
    id: TabId.forSale,
    label: i18next.t('tabs.forSale', { ns: 'profilePage' }),
  },
  {
    id: TabId.ownedItems,
    label: i18next.t('tabs.ownedItems', { ns: 'profilePage' }),
  },
  // {
  //   id: TabId.game,
  //   label: 'Game',
  //   isDisabled: true,
  // },
];

export const getGameOptions = (list: any[]) =>
  list.map((item) => ({ id: item?.code, label: item?.name }));

export const getTestItems = (count: number) => Array.from(Array(count).keys());

export const uuidv4RegExp =
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
export const isUUIDv4 = (userId: string) => uuidv4RegExp.test(userId);
