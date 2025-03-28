import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useAuthContext } from '@game-trade/lib';

import HeadComponent from '../head';
import { Header } from '../header';
import { Sidebar } from '../sidebar';
import { IPropsLayout } from '../interfaces';
import { ApplicationRootContainer } from '../style';

import { useSidebarContext } from '@/providers/sidebar';

export const Layout = (props: IPropsLayout) => {
  const {
    getUserInfoAction,
    authProviderData: { isAuthenticated },
  } = useAuthContext();

  const { isSidebarExpanded, sidebarWidthExpanded } = useSidebarContext();

  useEffect(() => {
    isAuthenticated && getUserInfoAction();
  }, [isAuthenticated]);

  return (
    <>
      <HeadComponent metaTags={props.metaTags} />

      <Grid container={true}>
        <Grid item={true} sx={{ width: '100%' }}>
          <Header />
        </Grid>

        <Grid item={true} sx={{ width: '100%' }}>
          <Grid container={true}>
            <Grid item={true}>
              <Sidebar />
            </Grid>

            <Grid
              item={true}
              sx={{
                width: 'calc(100% - 65px)',
                marginLeft: isSidebarExpanded ? sidebarWidthExpanded - 21 + 'px' : '65px',
                minHeight: 'calc(100vh - 84px)',
              }}>
              <ApplicationRootContainer>{props.children}</ApplicationRootContainer>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
