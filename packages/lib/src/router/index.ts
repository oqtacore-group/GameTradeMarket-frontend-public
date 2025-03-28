export const DEFAULT_GAME_NAME =
  process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.' ? 'Neon district' : 'Sipher';
export const DEFAULT_GAME_CODE =
  process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.' ? 'NEON_DISTRICT' : 'SIPHER';

export const clientId = '929549260646-eu2u2qme4ordnaqht4pa8r6d40pimbu5.apps.googleusercontent.com';

export const routes = {
  home: '/',
  developers: '/developers',
  account: '/account',
  marketplace: '/marketplace',
  marketplaceDefaultGameName:
    '/marketplace' + `/${DEFAULT_GAME_NAME}?gameCode=${DEFAULT_GAME_CODE}`,
  marketplaceGameName: '/marketplace/[gameName]',
  people: '/people',
  user: '/user',
  friendsOfUser: '/friends-of-user',
  manageFriends: '/manage-friends',
  terms: '/terms',
  policy: '/policy',
  roadmap: '/roadmap',
  howItWorks: '/how-it-works',
  inventory: '/inventory',
  aboutUs: '/about-us',
  chat: '/chat',
  games: '/games',
  token: '/token',
  team: '/team',
  rewards: '/rewards',
  changelog: '/changelog',
  eventCalendar: '/event-calendar',
} as const;

export const authRoutes: string[] = [
  routes.account,
  routes.people,
  routes.user,
  '/user/[id]',
  routes.friendsOfUser,
  routes.manageFriends,
  routes.inventory,
  routes.chat,
];
