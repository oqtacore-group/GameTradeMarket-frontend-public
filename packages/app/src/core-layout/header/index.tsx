import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';

import { Logo } from '../logo';
import { Navigation } from '../navigation/list';
import { NavigationMobile } from '../navigation/mobile';
// import NotificationsContainer from '../../containers/notifications/index';
import { Avatar } from '../avatar';
import { MenuComponent } from '../menu';

import { HeaderStyled, Stroke, StrokeNav, Search, Row, Wrapper } from './style';

// import { initChatSocket } from '@/containers/chat/utils';
import { SvgMagnifier } from '@game-trade/icons';
import { Button } from '@game-trade/ui';
import { useLoginContext, useAuthContext } from '@game-trade/lib';
import { SearchFieldComponent } from '@/containers/index/promo-headline/components/searchField';
import { GameSupportedComponent } from '@game-trade/ui/modals/game-supported';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { getDeveloperStatus, setDeveloperStatus } from '@/core-layout/navigation/utils';

type Form = {
  search: string;
};

export const Header = () => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });

  const { onShowLoginWindow } = useLoginContext();
  const isMobile = useMediaQuery('(max-width: 1100px)');
  const {
    authProviderData: { isAuthenticated, userInfoData },
  } = useAuthContext();
  const router = useRouter();
  const inputSearch = useRef<HTMLInputElement>(null);
  const [isMarketplacePage, setIsMarketplacePage] = useState<boolean>(
    router.asPath === '/marketplace'
  );
  const [isHomePage, setIsHomePage] = useState<boolean>(router.asPath === '/');
  const [isGamesPage, setIsGamesPage] = useState<boolean>(router.asPath === '/games');
  const [isQueryParamsLogin, setIsQueryParamsLogin] = useState<boolean>(!!router.query?.login);
  const [isModalGamesNotFoundVisible, setIsModalGamesNotFoundVisible] = useState(false);

  const hideModal = () => {
    setIsModalGamesNotFoundVisible(false);
  };

  // useEffect(() => {
  //   if (isAuthenticated) initChatSocket();
  // }, [isAuthenticated]);

  useEffect(() => {
    setIsMarketplacePage(router.pathname === '/marketplace');
    setIsHomePage(router.pathname === '/');
    setIsGamesPage(router.pathname === '/games');
    setIsQueryParamsLogin(!!router.query?.login);

    if (router.query?.developer === 'true') {
      setDeveloperStatus();
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    if (
      process.env.NEXT_PUBLIC_UPDATING_SITE &&
      Boolean(Number(process.env.NEXT_PUBLIC_UPDATING_SITE)) &&
      !getDeveloperStatus()
    ) {
      router.replace('/updating-site');
    }
  }, [Number(process.env.NEXT_PUBLIC_PATHNAME_PREFIX), getDeveloperStatus()]);

  const { register } = useForm<Form>();

  const handleOpenLogin = useCallback(() => {
    onShowLoginWindow();
  }, []);

  return (
    <HeaderStyled isMarketplacePage={isMarketplacePage}>
      <Wrapper>
        <Logo />
        {isMarketplacePage && (
          <Stroke>
            <Row>
              <Search
                type="text"
                id="search"
                {...register('search')}
                placeholder="Search"
                ref={inputSearch}
              />
              <SvgMagnifier onClick={() => inputSearch?.current?.focus()} size={20} />
            </Row>
          </Stroke>
        )}

        {!isMobile &&
          !Number(process.env.NEXT_PUBLIC_UPDATING_SITE) &&
          !isGamesPage &&
          (!(isQueryParamsLogin && isHomePage) || !(isQueryParamsLogin && isGamesPage)) && (
            <SearchFieldComponent setIsModalGamesNotFoundVisible={setIsModalGamesNotFoundVisible} />
          )}
      </Wrapper>

      {(!Number(process.env.NEXT_PUBLIC_UPDATING_SITE) || getDeveloperStatus()) && (
        <>
          <StrokeNav isMarketplacePage={isMarketplacePage}>
            <Row direction="row" className="desktopMenu">
              <Navigation
                isAuthenticated={isAuthenticated}
                customUrl={userInfoData?.custom_url as string | undefined}
              />

              {/*{isAuthenticated && <NotificationsContainer />}*/}

              {isAuthenticated ? (
                <Avatar imageUrl={userInfoData?.image_url} />
              ) : (
                <Button
                  appearance="secondary"
                  dimension="s"
                  onClick={handleOpenLogin}
                  isGradientText={true}>
                  {t('menu.signIn')} | {t('menu.signUp')}
                </Button>
              )}
            </Row>

            <NavigationMobile />
          </StrokeNav>
          <MenuComponent />
          {isModalGamesNotFoundVisible && <GameSupportedComponent hideModal={hideModal} />}
        </>
      )}
    </HeaderStyled>
  );
};
