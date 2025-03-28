import { Fragment, useState } from 'react';
import Link from 'next/link';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import menuItems from './menuItems';

import { useSidebarContext } from '@/providers/sidebar';

const useStyles = makeStyles({
  paper: {
    backgroundColor: '#25192c',
    overflowX: 'hidden',
  },
});

const openedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    overflowX: 'hidden',

    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),

    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export const Sidebar = () => {
  const classes = useStyles();

  const { isSidebarExpanded, expandSidebar, collapseSidebar } = useSidebarContext();

  return (
    <Drawer
      variant="permanent"
      open={isSidebarExpanded}
      classes={{ paper: classes.paper }}
      sx={{ width: '400px' }}>
      <DrawerHeader>
        <IconButton onClick={isSidebarExpanded ? collapseSidebar : expandSidebar}>
          {isSidebarExpanded ? (
            <ChevronLeftIcon sx={{ color: '#fff' }} />
          ) : (
            <ChevronRightIcon sx={{ color: '#fff' }} />
          )}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <List>
        {menuItems.map((item: any) => {
          const [subitemOpen, setSubitemOpen] = useState(false);

          const handleArrowClick = () => setSubitemOpen(!subitemOpen);

          return (
            <Fragment key={item.title}>
              <ListItemButton
                key={item.text}
                sx={{
                  minHeight: 48,
                  justifyContent: isSidebarExpanded ? 'initial' : 'center',
                  px: 2.5,
                  color: '#fff',
                }}>
                <Link href={item.link} passHref={true}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isSidebarExpanded ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {item.icon}
                  </ListItemIcon>
                </Link>

                <Link href={item.link} passHref={true}>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: isSidebarExpanded ? 1 : 0 }}
                    data-link={item.link}
                  />
                </Link>

                {isSidebarExpanded && item.subitems && (
                  <div onClick={handleArrowClick}>
                    {subitemOpen ? <ExpandLess /> : <ExpandMore />}
                  </div>
                )}
              </ListItemButton>

              {isSidebarExpanded &&
                item.subitems?.map((subitem: any) => (
                  <Collapse
                    in={subitemOpen}
                    timeout="auto"
                    unmountOnExit={true}
                    key={subitem.title}>
                    <Link href={subitem.link} passHref={true}>
                      <List component="div" disablePadding={true}>
                        <ListItemButton sx={{ pl: '60px' }}>
                          <ListItemText primary={'• ' + subitem.title} sx={{ color: '#fff' }} />
                        </ListItemButton>
                      </List>
                    </Link>
                  </Collapse>
                ))}
            </Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};
