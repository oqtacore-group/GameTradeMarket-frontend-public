import { routes } from '@game-trade/lib';
import { Cookies } from 'react-cookie-consent';

interface IMenu {
  title: string;
  link: string;
}
const helpLink = 'https://gametrade-market.gitbook.io/gametrade.market/';

const commonMenu: IMenu[] = [
  {
    title: 'marketplace',
    link: routes.marketplaceDefaultGameName,
  },
  {
    title: 'games',
    link: routes.games,
  },
];

const floatMenuRoadmap: IMenu = {
  title: 'roadmap',
  link: routes.roadmap,
};

const floatMenuPeople: IMenu = {
  title: 'people',
  link: routes.people,
};

const floatMenuHowItWorks: IMenu = {
  title: 'howItWorks',
  link: routes.howItWorks,
};

const floatMenuChangelog: IMenu = {
  title: 'changelog',
  link: routes.changelog,
};

// const floatMenuInventory: IMenu = {
//   title: 'My Inventory',
//   link: routes.inventory,
// };

const floatMenuProfile = (userId?: string, customUrl?: string): IMenu => ({
  title: 'profile',
  link: routes.user + '/' + (customUrl || userId),
});

const floatMenuFriendsSettings: IMenu = {
  title: 'friends',
  link: routes.manageFriends,
};

const floatMenuAccountSettings: IMenu = {
  title: 'account',
  link: routes.account,
};

const floatMenuAboutUs: IMenu = {
  title: 'about',
  link: routes.aboutUs,
};

const floatMenuChat: IMenu = {
  title: 'chat',
  link: routes.chat,
};

const floatMenuTeam: IMenu = {
  title: 'team',
  link: routes.team,
};

const floatMenuHelp: IMenu = {
  title: 'help',
  link: helpLink,
};

export function getMenuItems(
  isAuthenticated: boolean | undefined,
  isMenu: boolean,
  isMobile: boolean,
  userId?: string,
  customUrl?: string
): IMenu[] {
  const mainMenu = [
    isMenu && isAuthenticated ? floatMenuProfile(userId, customUrl) : undefined,
    isMenu && isAuthenticated ? floatMenuFriendsSettings : undefined,
    isMenu && isAuthenticated ? floatMenuAccountSettings : undefined,
    isMenu && isAuthenticated ? floatMenuChat : undefined,
  ].filter((m) => m !== undefined) as any;

  if ((isMenu && isMobile) || !isMenu) {
    const menu = [...mainMenu];
    if (isAuthenticated) {
      menu.push(floatMenuPeople);
    }
    return commonMenu.concat(menu);
  }

  return mainMenu;
}

export function getMenuItemsFooter(isAuthenticated: boolean): IMenu[] {
  const footerMenu = [
    floatMenuChangelog,
    floatMenuRoadmap,
    floatMenuHowItWorks,
    floatMenuAboutUs,
    floatMenuTeam,
    floatMenuHelp,
  ];
  if (isAuthenticated) {
    footerMenu.push(floatMenuPeople);
  }
  return commonMenu.concat(footerMenu);
}

export function getDeveloperStatus() {
  if (!Cookies.get('developer')) return null;
  return Cookies.get('developer');
}

export function setDeveloperStatus() {
  Cookies.set('developer', true);
}
