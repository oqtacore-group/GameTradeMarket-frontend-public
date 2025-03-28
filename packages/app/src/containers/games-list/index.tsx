import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { GamesListContainerWrapper, MobileTitleWrapper } from './style';
import { TitleGameItems } from './title-game-items';
import { GamesListContent } from './content';
import {
  scrollToTop,
  useForceUpdate,
  prepareSortToServer,
  prepareFiltersToServer,
  prepareQueryParamsToFilters,
  substringAsPath,
  prepareFiltersToQueryParams,
} from './utils';
import { ISortValue } from './sorting-game-items';

import { FiltersGamesItems } from '@game-trade/ui/components/filters-games-items';

import { FiltersProvider } from '@game-trade/lib/providers/filters-games';

import {
  GameCard,
  GetCatalogGamesQuery,
  GetGameFiltersQuery,
  useGetCatalogGamesLazyQuery,
} from '@game-trade/lib/codegen-types';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export interface IServerSideProps {
  gamesCards?: GetCatalogGamesQuery;
  filters?: GetGameFiltersQuery;
}

const DEFAULT_OFFSET = 18;
const DEFAULT_PAGE = 1;

export const GamesListContainer = ({ serverSideData }: { serverSideData?: IServerSideProps }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [isWide, setIsWide] = useState(isMobile);

  const router = useRouter();
  const queryParams = prepareQueryParamsToFilters(
    queryString.parse(substringAsPath(router.asPath), {
      arrayFormat: 'bracket-separator' as any,
      arrayFormatSeparator: '|',
    })
  );
  const {
    offsetCount: queryOffsetCount,
    // gameItemsSort: queryGameItemsSort,
    gameItemSearch: queryGameItemSearch,
    page: queryPage,
  } = queryParams;

  const [gameItemsSort, setGameItemsSorting] = useState<ISortValue>();
  const [gameItemsSearch, setGameItemsSearch] = useState<string | undefined>(queryGameItemSearch);
  const [gameItemsFilters, setGameItemsFilters] = useState<any>(queryParams);

  const [page, setPage] = useState(Number(queryPage) || DEFAULT_PAGE);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [offsetCount, setOffsetCount] = useState(Number(queryOffsetCount) || DEFAULT_PAGE);
  const [gamesCards, setGamesCards] = useState<GameCard[]>();
  const [total, setTotal] = useState<number>(0);

  const [getCatalogGamesLazyQuery, { data: getDataGamesCards, loading }] =
    useGetCatalogGamesLazyQuery();

  useEffect(() => {
    window.addEventListener('popstate', useForceUpdate, false);

    return () => {
      window.removeEventListener('popstate', useForceUpdate);
    };
  }, []);

  useEffect(() => {
    const initPage =
      offset === DEFAULT_OFFSET &&
      page === DEFAULT_PAGE &&
      !Object.keys(gameItemsFilters).find((i) => gameItemsFilters[i]);

    getCatalogGamesLazyQuery({
      variables: {
        offset: offset * (page - 1),
        first: offset,
        name: gameItemsSearch,
        sort: prepareSortToServer(gameItemsSort),
        ...prepareFiltersToServer(gameItemsFilters),
      },
    });

    if (initPage) {
      router.push('', undefined, {
        shallow: true,
      });
      return;
    }

    const encodeParams: any = queryString.stringify(
      {
        ...prepareFiltersToQueryParams(gameItemsFilters),
        gameItemsSearch,
        offsetCount,
        page,
      },
      {
        arrayFormat: 'bracket-separator' as any,
        arrayFormatSeparator: '|',
      }
    );

    router.push('?' + encodeParams, undefined, {
      shallow: true,
    });
  }, [page, offset, gameItemsSearch, gameItemsSort, gameItemsFilters]);

  useEffect(() => {
    if (!loading) {
      setGamesCards(getDataGamesCards?.catalogGames.edges.node as any);
      setTotal(getDataGamesCards?.catalogGames?.totalCount as any);
    }
  }, [getDataGamesCards, loading]);

  const onChangeSorting = (data: any) => {
    setGameItemsSorting(data.sort);
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
    setGameItemsFilters(() => {
      return {
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
    <GamesListContainerWrapper>
      <FiltersProvider>
        <MobileTitleWrapper>
          <TitleGameItems itemsCount={typeof window !== 'undefined' ? total : 1} />
        </MobileTitleWrapper>

        <FiltersGamesItems
          serverSideDataFilters={serverSideData?.filters}
          onChange={onChangeFilters}
          onResize={onResizeFilters}
        />

        <GamesListContent
          onChangeSorting={onChangeSorting}
          onSearch={onSearch}
          onChangePage={onChangePage}
          onIncreaseOffset={onIncreaseOffset}
          serverSideData={undefined}
          page={page}
          offset={offset}
          total={total || 0}
          isWide={isWide}
          gridView={'normal-columns'}
          gamesCards={
            typeof window !== 'undefined'
              ? gamesCards
              : serverSideData?.gamesCards?.catalogGames.edges.node
          }
          loading={loading}
        />
      </FiltersProvider>
    </GamesListContainerWrapper>
  );
};
