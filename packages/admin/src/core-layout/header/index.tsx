import { useEffect, useRef, useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { deepOrange } from '@mui/material/colors';
import { useAuthContext } from '@game-trade/lib';

import { Logo } from '../logo';

import { useSidebarContext } from '@/providers/sidebar';

export const Header = () => {
  const {
    getUserInfoAction,
    logoutAction,
    authProviderData: { userInfoData },
  } = useAuthContext();

  const { sidebarWidthExpanded, isSidebarExpanded } = useSidebarContext();

  useEffect(() => {
    getUserInfoAction();
  }, []);

  const anchorRef = useRef<HTMLDivElement>(null);

  const [menuOpened, setMenuOpened] = useState(false);
  const openMenu = () => setMenuOpened(true);
  const closeMenu = () => setMenuOpened(false);

  const handleLogout = useCallback(() => {
    logoutAction();
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#25192c',
        padding: '10px 0',
        marginLeft: (isSidebarExpanded ? sidebarWidthExpanded - 21 : 65) + 'px',
        width: `calc(100% - ${isSidebarExpanded ? sidebarWidthExpanded - 21 : 65}px)`,
      }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container={true} justifyContent="space-between">
          <Grid item={true}>
            <Logo />
          </Grid>

          <Grid item={true} onClick={openMenu}>
            <Grid container={true} alignItems="center" spacing={3}>
              <Grid item={true}>
                <Typography
                  variant="h5"
                  component="div"
                  textAlign="right"
                  textTransform="uppercase">
                  {userInfoData?.nick_name || ''}
                </Typography>
              </Grid>

              <Grid item={true}>
                <Avatar
                  sx={{ bgcolor: deepOrange[500] }}
                  ref={anchorRef}
                  src={userInfoData?.image_url || ''}>
                  {!userInfoData?.image_url
                    ? userInfoData?.nick_name.slice(0, 2).toUpperCase()
                    : null}
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Popper
          open={menuOpened}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          transition={true}
          disablePortal={true}>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
              <Paper>
                <ClickAwayListener onClickAway={closeMenu}>
                  <MenuList>
                    <MenuItem>My Account</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Toolbar>
    </AppBar>
  );
};
