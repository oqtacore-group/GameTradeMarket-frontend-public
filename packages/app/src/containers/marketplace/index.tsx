import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
  GamesListQuery,
  GameTokenFacetsQuery,
  GameTokenFiltersQuery,
  GetGameTokenCardsQuery,
  useGetGameTokenCardsLazyQuery,
  Card,
} from '@game-trade/lib/src/codegen-types';
import queryString from 'query-string';

import { Marketplace, MarketplaceContainerWrapper, MobileTitleWrapper } from './style';
import { TitleGameItems } from './title-game-items';
import { MarketplaceContent } from './content';
import {
  breakPointsGridView,
  prepareFacetsToQueryParams,
  prepareFiltersToServer,
  prepareQueryParamsToFilters,
  prepareSortToServer,
  scrollToTop,
  substringAsPath,
  useForceUpdate,
} from './utils';
import { ISortValue } from './sorting-game-items';

import { FiltersTokensItems } from '@game-trade/ui/components/filters-tokens-items';
import { IGameItem } from '@game-trade/ui/components/filters-tokens-items/form/blocks/game';
import { useRouter } from 'next/router';
import { FiltersProvider } from '@game-trade/lib/providers/filters-tokens';
import { HeadMarketplace } from '@/containers/marketplace/head';

export interface IServerSideProps {
  gameList?: GamesListQuery | undefined;
  gameTokenCards?: GetGameTokenCardsQuery | undefined;
  gameTokenFacets?: GameTokenFacetsQuery | undefined;
  gameTokenFilters?: GameTokenFiltersQuery | undefined;
  game?: IGameItem | undefined;
}

const DEFAULT_OFFSET = 18;
const DEFAULT_PAGE = 1;
export const MarketplaceContainer = ({ serverSideData }: { serverSideData?: IServerSideProps }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const router = useRouter();
  const {
    facets: queryFacets,
    offsetCount: queryOffsetCount,
    gridView: queryGridView,
    gameCode: queryGameCode,
    gameItemsSort: queryGameItemsSort,
    price: queryPrice,
    gameItemSearch: queryGameItemSearch,
    page: queryPage,
    saleType: querySaleType,
  } = prepareQueryParamsToFilters(
    queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    })
  );
  const [widthWindow, setWidthWindow] = useState<number>();
  const [isWide, setIsWide] = useState(isMobile);
  const [gridView, setGridView] = useState<string>(queryGridView || 'normal-columns');
  const [gameItemsSort, setGameItemsSorting] = useState<ISortValue>(queryGameItemsSort);
  const [gameItemsSearch, setGameItemsSearch] = useState<string>(queryGameItemSearch);
  const [gameName, setGameName] = useState<string | undefined | null>(serverSideData?.game?.name);
  const [gameCode, setGameCode] = useState<string | undefined | null>(serverSideData?.game?.code);
  const [gameList] = useState(serverSideData?.gameList?.games?.edges.node);
  const [gameItemsFilters, setGameItemsFilters] = useState<any>({
    facets: queryFacets.length ? queryFacets : [],
    saleType: querySaleType
      ? {
          key: '"saleType"',
          title: 'Sale Type',
          items: querySaleType
            ? querySaleType.map((item: string) => {
                return {
                  checked: true,
                  code: item,
                  disable: false,
                  title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase(),
                };
              })
            : [],
        }
      : undefined,
    priceRange:
      queryPrice.currency || queryPrice.min || queryPrice.max
        ? {
            price: [queryPrice.min || null, queryPrice.max || null],
            currency: {
              code: queryPrice.currency,
              title: queryPrice.currency,
              checked: true,
              disable: false,
            },
          }
        : undefined,
    game: {
      code: queryGameCode,
      name: (router.query?.gameName as string)?.replace('-', ' '),
      __typename: 'Game',
    },
  });

  const [page, setPage] = useState(Number(queryPage) || DEFAULT_PAGE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [offsetCount, setOffsetCount] = useState(Number(queryOffsetCount) || DEFAULT_PAGE);
  const [gameTokenCards, setGameTokenCards] = useState<Card[] | null | undefined>(
    serverSideData?.gameTokenCards?.gameTokenCards?.edges?.node as Card[]
  );
  const [total, setTotal] = useState<number | undefined | null>(
    serverSideData?.gameTokenCards?.gameTokenCards?.totalCount
  );

  const [getGameTokenCardsLazyQuery, { data: getDataGameTokensCards, loading }] =
    useGetGameTokenCardsLazyQuery();

  const breakPoints = breakPointsGridView(gridView === 'normal-columns', isWide);
  const DEFAULT_BREAKPOINTS_OFFSET = Object.keys(breakPoints).map((b) => {
    return breakPoints[b].offset;
  });
  useEffect(() => {
    const breakPointsSize = Object.values(breakPoints);

    for (let i = 0; i < breakPointsSize.length; i++) {
      if (
        (widthWindow &&
          widthWindow > breakPointsSize[i]?.size &&
          (widthWindow < breakPointsSize[i + 1]?.size || !breakPointsSize[i + 1])) ||
        widthWindow === breakPointsSize[i]?.size
      ) {
        setOffset(breakPointsSize[i].offset * offsetCount);
        break;
      }
    }
  }, [gridView, widthWindow, isWide]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidthWindow(window.innerWidth);
    };
    window.addEventListener('popstate', useForceUpdate, false);
    window.addEventListener('resize', handleWindowResize);
    setWidthWindow(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('popstate', useForceUpdate);
    };
  }, []);

  useEffect(() => {
    if (gameItemsFilters?.game?.name) {
      setGameName(gameItemsFilters?.game?.name);
    }
    if (gameItemsFilters?.game?.code) {
      setGameCode(gameItemsFilters?.game?.code);
    }
  }, [gameItemsFilters?.game]);

  useEffect(() => {
    const isOnlyGame = Object.keys(gameItemsFilters).find(
      (i) => i !== 'game' && !!gameItemsFilters[i]
    );

    const initPage =
      DEFAULT_BREAKPOINTS_OFFSET.includes(offset) && page === DEFAULT_PAGE && !isOnlyGame;

    if (gameItemsFilters.game.code !== router.query.gameCode) {
      setOffsetCount(DEFAULT_PAGE);
      setPage(DEFAULT_PAGE);
    }

    getGameTokenCardsLazyQuery({
      variables: {
        offset: offset * (page - 1),
        first: offset,
        sort: prepareSortToServer(gameItemsSort),
        name: gameItemsSearch,
        ...prepareFiltersToServer(gameItemsFilters),
      },
    });

    if (initPage) {
      router.push(
        encodeURIComponent(gameItemsFilters.game?.name?.replace(/\s+/g, '-')) +
          '?gameCode=' +
          encodeURIComponent(gameItemsFilters?.game?.code.replaceAll(/\s/g, '_')),
        undefined,
        {
          shallow: true,
        }
      );
      return;
    }

    const encodeParams: any = queryString.stringify(
      {
        ...prepareFacetsToQueryParams({
          ...gameItemsFilters,
        }),
        gameCode: gameItemsFilters?.game?.code,
        priceCurrency: gameItemsFilters?.priceRange?.currency?.code,
        priceRange: gameItemsFilters?.priceRange?.price,
        gameItemsSort: gameItemsSort && Object.entries(gameItemsSort),
        saleType: gameItemsFilters?.saleType?.items?.map((item: any) => {
          return item.code;
        }),
        gameItemsSearch,
        gridView,
        offsetCount,
        page,
      },
      {
        arrayFormat: 'bracket-separator' as any,
        arrayFormatSeparator: '|',
      }
    );

    router.push(gameItemsFilters.game?.name.replace(/\s+/g, '-') + '?' + encodeParams, undefined, {
      shallow: true,
    });
  }, [gameItemsSort, gameItemsFilters, page, offset, gameItemsSearch]);

  useEffect(() => {
    if (!loading) {
      setGameTokenCards(getDataGameTokensCards?.gameTokenCards?.edges?.node as any);
      setTotal(Number(getDataGameTokensCards?.gameTokenCards?.totalCount));
    }
  }, [getDataGameTokensCards, loading]);

  const onChangeSorting = (data: any) => {
    setGameItemsSorting(data.sort);
    setGridView(data.view);
    if (gridView === 'normal-columns') setOffset(18);
    if (gridView === 'small-columns') setOffset(21);
  };

  const onSearch = (search: string) => {
    if (search.length > 2) {
      setPage(1);
      setGameItemsSearch(search);
    } else {
      setPage(1);
      setGameItemsSearch('');
    }
  };

  const onChangeFilters = (filters: any) => {
    setGameItemsFilters((prevState: any) => {
      return {
        game: prevState.game,
        ...filters,
      };
    });
  };

  const onResizeFilters = (isOpen: boolean) => {
    setIsWide(isMobile || !isOpen);
  };

  const onChangePage = (page: number) => {
    scrollToTop();
    setPage(page);
  };

  const onIncreaseOffset = () => {
    setOffsetCount(offsetCount + 1);
    setOffset(offset + offset);
  };

  return (
    <Marketplace>
      <HeadMarketplace gameName={gameName} />
      <MarketplaceContainerWrapper>
        <FiltersProvider>
          <MobileTitleWrapper>
            <TitleGameItems gameName={gameName} itemsCount={total} />
          </MobileTitleWrapper>

          <FiltersTokensItems
            gameList={gameList}
            game={{ code: gameCode as string, name: gameName as string }}
            filters={serverSideData?.gameTokenFilters?.gameTokenFilters}
            facets={serverSideData?.gameTokenFacets?.gameTokenFacets}
            onChange={onChangeFilters}
            onResize={onResizeFilters}
          />

          <MarketplaceContent
            onChangeSorting={onChangeSorting}
            onSearch={onSearch}
            onChangePage={onChangePage}
            onIncreaseOffset={onIncreaseOffset}
            gameName={gameName}
            page={page}
            offset={offset}
            total={total}
            isWide={isWide}
            gridView={gridView}
            gameTokenCards={gameTokenCards}
            loading={loading}
          />
        </FiltersProvider>
      </MarketplaceContainerWrapper>
    </Marketplace>
  );
};
