import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';

import {
  LoopbackQuery,
  User,
  useUserDataGamesQuery,
  // useUserDataLazyQuery,
} from '@game-trade/lib/src/codegen-types';
import { routes } from '@game-trade/lib';
// import { BreadCrumbs } from '@game-trade/ui';

import { InventoryWrapper, InventoryBody, MobileTitleWrapper, TextEmptyInventory } from './style';
import { TitleGameItems } from './title-game-items';
import { Header } from './header';
import { InventoryContent } from './content';
// todo filters like on the marketplace (while the backend does not work)
// import {
// prepareFiltersToServer,
// prepareSortToServer
// } from './utils';
import { ISortValue } from './sorting-game-items';

import { FiltersTokensItems } from '@game-trade/ui/components/filters-tokens-items';
import { breakPointsGridView } from '@/containers/marketplace/utils';
import { FiltersProvider } from '@game-trade/lib/providers/filters-tokens';

export interface IProps {
  serverSideData?: LoopbackQuery;
}

const DEFAULT_OFFSET_STEP = 20;
// props: IProps
export const InventoryContainer = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [isWide, setIsWide] = useState(isMobile);
  const [gridView, setGridView] = useState<string>('normal-columns');
  const [gameItemsSort, setGameItemsSorting] = useState<ISortValue>();
  const [gameItemsFilters, setGameItemsFilters] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [offsetStep, setOffsetStep] = useState(DEFAULT_OFFSET_STEP);
  // const [getUserDataLazyQuery, { data: userAccountData, loading }] = useUserDataLazyQuery();

  const { data: userDataGames, loading: userDataGamesLoading } = useUserDataGamesQuery();

  // setUser
  const [user] = useState<any>(null);
  const [userGames, setUserGames] = useState<any[]>([]);
  // setTokenCards
  const [tokenCards] = useState<any[]>([]);
  // setTotal
  const [total] = useState<number>(0);
  const [widthWindow, setWidthWindow] = useState<number>();

  const breakPoints = breakPointsGridView(gridView === 'normal-columns', isWide);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidthWindow(window.innerWidth);
    };
    window.addEventListener('resize', handleWindowResize);
    setWidthWindow(window.innerWidth);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    const breakPointsSize = Object.values(breakPoints);
    for (let i = 0; i < breakPointsSize.length; i++) {
      if (
        (window.innerWidth > breakPointsSize[i]?.size &&
          (window.innerWidth < breakPointsSize[i + 1]?.size || !breakPointsSize[i + 1])) ||
        window.innerWidth === breakPointsSize[i]?.size
      ) {
        setOffsetStep(breakPointsSize[i].offset);
        break;
      }
    }
  }, [widthWindow, isWide, gridView]);

  // useEffect(() => {
  //   if (!loading) {
  //     const me: User | undefined = userAccountData && (userAccountData?.me as User);
  //     setUser(me as any);
  //     setTokenCards((me?.inventory?.edges?.node as any) || []);
  //     setTotal((me?.inventory?.totalCount as any) || 0);
  //   }
  // }, [userAccountData, loading]);

  useEffect(() => {
    if (!userGames?.length && !userDataGamesLoading) {
      // todo cache user games
      const user: User | undefined = userDataGames?.me as User;
      setUserGames(user?.games?.edges?.node || []);
    }
  }, [userDataGames, userDataGamesLoading]);

  // useEffect(() => {
  //   getUserDataLazyQuery();
  // }, []);

  useEffect(() => {
    if (gameItemsFilters?.game?.code) {
      // getUserDataLazyQuery();
      // {
      //   variables: {
      //     offset: offsetStep * (page - 1),
      //       first: offsetStep,
      //     // todo filters like on the marketplace (while the backend does not work)
      //     // sort: prepareSortToServer(gameItemsSort),
      //   ...prepareFiltersToServer(gameItemsFilters),
      //   },
      // }
    }
  }, [userDataGamesLoading, gameItemsSort, gameItemsFilters, page, offsetStep]);

  const onChangeSorting = (data: any) => {
    setGameItemsSorting(data.sort);
    setGridView(data.view);
  };

  const onChangeFilters = (filters: any) => {
    setGameItemsFilters(filters);
  };

  const onResizeFilters = (isOpen: boolean) => {
    setIsWide(isMobile || !isOpen);
  };

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onIncreaseOffset = () => {
    setOffsetStep(offsetStep + DEFAULT_OFFSET_STEP);
  };

  const imageUrl = user && user?.image_url;
  const email = user && user?.email;
  const nickName = user && user?.nick_name;
  const isOnline = user && user?.online;

  return (
    <InventoryWrapper>
      {/*<BreadCrumbs*/}
      {/*  crumbs={[*/}
      {/*    { label: 'Marketplace', href: routes.marketplace },*/}
      {/*    { label: 'My Inventory', href: routes.inventory },*/}
      {/*  ]}*/}
      {/*/>*/}

      <Header imageUrl={imageUrl} email={email} nickName={nickName} isOnline={isOnline} />

      <InventoryBody>
        <FiltersProvider>
          <MobileTitleWrapper>
            <TitleGameItems gameName={gameItemsFilters?.game?.name} itemsCount={total} />
          </MobileTitleWrapper>

          {!userGames?.length && (
            <TextEmptyInventory>
              Your inventory is empty as you do not own any items.{' '}
              <Link href={routes.marketplaceDefaultGameName}>Buy items from us.</Link>
            </TextEmptyInventory>
          )}

          {Boolean(userGames?.length) && (
            <FiltersTokensItems
              onChange={onChangeFilters}
              onResize={onResizeFilters}
              blocks={['game', 'saleType', 'priceRange']}
              gameList={userGames}
            />
          )}

          {!!userGames?.length && user && (
            <InventoryContent
              onChangeSorting={onChangeSorting}
              onChangePage={onChangePage}
              onIncreaseOffset={onIncreaseOffset}
              page={page}
              offsetStep={offsetStep}
              total={total}
              isWide={isWide}
              gridView={gridView}
              gameTokenCards={tokenCards}
            />
          )}
        </FiltersProvider>
      </InventoryBody>
    </InventoryWrapper>
  );
};
