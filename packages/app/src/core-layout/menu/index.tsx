import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SvgCloseOutline, SvgLogout } from '@game-trade/icons';
import { Button, AddressSliceComponent } from '@game-trade/ui';
import { useAuthContext, useLoginContext, routes } from '@game-trade/lib';

import {
  WrapperMenu,
  Menu,
  Header,
  Stroke,
  WrapperNavigation,
  Footer,
  Logout,
  Account,
  NickName,
  Profile,
  InvertStroke,
} from './style';
import { Portal } from './portal';

import { Navigation } from '@/core-layout/navigation/list';
import { Avatar } from '@/core-layout/avatar';
import { SocialLinks } from '@/core-layout/social-links';
import { useMenuContext } from '@/core-layout/menu/provider';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export const MenuComponent = () => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const {
    logoutAction,
    authProviderData: { isAuthenticated, userInfoData },
  } = useAuthContext();
  const { onShowLoginWindow } = useLoginContext();
  const { setOpenMenu, openMenu } = useMenuContext();
  const isMobile = useMediaQuery('(max-width:768px)');

  useEffect(() => {
    if (!isMobile) setOpenMenu(false);
  }, [isMobile]);

  const logout = () => {
    setOpenMenu(false);
    logoutAction();
  };

  const handleOpenLogin = useCallback(() => {
    setOpenMenu(false);
    onShowLoginWindow();
  }, []);

  return (
    <Portal open={openMenu}>
      <WrapperMenu open={openMenu}>
        {openMenu && (
          <ClickAwayListener onClickAway={() => setOpenMenu(false)}>
            <Menu open={openMenu}>
              <Header>
                <SvgCloseOutline onClick={() => setOpenMenu(false)} size={30} />
                <Stroke />
              </Header>

              <WrapperNavigation>
                {isAuthenticated && (
                  <Link
                    href={{ pathname: `${routes.user}/[userId]` }}
                    as={`/${routes.user}/${userInfoData?.custom_url || userInfoData?.id}`}
                    passHref={true}>
                    <Account>
                      <Avatar imageUrl={userInfoData?.image_url} menu={true} />
                      <Profile>
                        <NickName>{userInfoData?.nick_name}</NickName>
                        {userInfoData && userInfoData?.wallets && !!userInfoData?.wallets[0] && (
                          <AddressSliceComponent
                            copy={false}
                            address={userInfoData?.wallets[0]?.address.toLowerCase()}
                          />
                        )}
                      </Profile>
                    </Account>
                  </Link>
                )}
                <Navigation
                  isAuthenticated={isAuthenticated}
                  setOpen={setOpenMenu}
                  isMenu={true}
                  userId={userInfoData?.id}
                  customUrl={userInfoData?.custom_url as string | undefined}
                />
              </WrapperNavigation>
              <Footer>
                <InvertStroke />
                {!isAuthenticated && (
                  <Button
                    isGradientText={true}
                    appearance="secondary"
                    dimension="s"
                    onClick={handleOpenLogin}>
                    {t('menu.signIn')}
                  </Button>
                )}
                {!isAuthenticated && <SocialLinks />}
                {isAuthenticated && (
                  <Logout onClick={() => logout()}>
                    <SvgLogout /> {t('menu.logOut')}
                  </Logout>
                )}
              </Footer>
            </Menu>
          </ClickAwayListener>
        )}
      </WrapperMenu>
    </Portal>
  );
};
