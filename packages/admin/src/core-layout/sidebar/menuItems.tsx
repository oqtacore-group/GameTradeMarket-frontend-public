import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';

import { routes } from '@/router';

const menuItems = [
  {
    title: 'Dashboard',
    icon: <HomeIcon sx={{ color: '#fff' }} />,
    link: routes.dashboard,
  },
  {
    title: 'Management',
    icon: <ArticleIcon sx={{ color: '#fff' }} />,
    link: routes.managementUsers,
    subitems: [
      {
        title: 'Set role',
        link: routes.managementSetRole,
      },
      {
        title: 'Users',
        link: routes.managementUsers,
      },
      {
        title: 'Wallets',
        link: routes.managementWallets,
      },
      {
        title: 'Impersonation',
        link: routes.managementImpersonation,
      },
      {
        title: 'Activity',
        link: routes.managementActivity,
      },
      {
        title: 'Referrals',
        link: routes.managementReferrers,
      },
    ],
  },
  {
    title: 'Logs',
    icon: <CalendarTodayIcon sx={{ color: '#fff' }} />,
    link: routes.logs,
  },
  {
    title: 'Games',
    icon: <GroupIcon sx={{ color: '#fff' }} />,
    link: routes.games,
  },
];

export default menuItems;
