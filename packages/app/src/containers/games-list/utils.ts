import { FacetMinMax, GameCardSort } from '@game-trade/lib/src/codegen-types';

import { ISortValue } from './sorting-game-items';
import { IGridBreakPoints } from '@game-trade/ui/modifiers/smart-grid-styled/interfaces';

import { IFilterFormInputs } from '@game-trade/ui/components/filters-games-items';
import Router from 'next/router';

interface IServerFilters {
  genreCodes?: string[];
  blockchains?: string[];
  device?: string;
  friendInGames?: boolean;
  gameStatus?: string;
  releaseDates?: string[];
  priceModels?: string[];
  prices?: FacetMinMax;
  playAndEarn?: string[];
}

interface IQueryInit {
  genreCodes?: string[];
  blockchains?: string[];
  device?: string;
  friendInGames?: boolean;
  gameStatus?: string;
  releaseDates?: string[];
  priceModels?: string[];
  prices?: FacetMinMax;
  page?: string;
  offsetCount?: string;
  gameItemSearch?: string;
  gameItemsSort?: any;
  playAndEarn?: string[];
}

interface IQueryParams {
  genreCodes?: string[];
  blockchains?: string[];
  device?: string;
  friendInGames?: boolean;
  gameStatus?: string;
  releaseDates?: string[];
  priceModels?: string[];
  priceCurrency?: string;
  priceRange?: string[];
  playAndEarn?: string[];
}

// interface IFiltersMarketplace {
//   genre?: any;
//   blockchain?: any;
//   releaseYear?: any;
//   priceModel?: any;
//   floorPrice?: any;
//   gameStatus?: any;
//   friendInGame?: any;
//   device?: any;
// }

interface IQueryStringGamesList {
  blockchains?: string[];
  device?: string;
  friendInGames?: string;
  gameItemSearch?: string;
  gameStatus?: string;
  genreCodes?: string[];
  offsetCount?: string;
  page?: string;
  priceModels?: string[];
  priceCurrency?: string;
  priceRange?: string[];
  releaseDates?: string[];
  gameItemsSort?: any;
  playAndEarn?: string[];
}

// function valueIsEmpty(value: any) {
//   return ['', null, undefined].includes(value);
// }

export function breakPointsGridView(isNormalColumns?: boolean, isWide?: boolean): IGridBreakPoints {
  return {
    '576px': {
      size: 576,
      gridTemplate: 1,
      offset: isWide ? (isNormalColumns ? 21 : 20) : isNormalColumns ? 20 : 18,
    },
    '1024px': {
      size: 1024,
      gridTemplate: isWide ? 2 : 1,
      offset: isWide ? (isNormalColumns ? 20 : 18) : 20,
    },
    '1600px': {
      size: 1600,
      gridTemplate: isWide ? 3 : 2,
      offset: isWide ? (isNormalColumns ? 21 : 24) : isNormalColumns ? 18 : 21,
    },
    '1920px': {
      size: 1920,
      gridTemplate: isWide ? 4 : 3,
      offset: isWide ? (isNormalColumns ? 21 : 24) : isNormalColumns ? 18 : 21,
    },
  };
}

export function prepareFiltersToServer(filters: IFilterFormInputs): IServerFilters {
  return {
    genreCodes: filters?.genre?.items?.map((item) => item.code),
    blockchains: filters?.blockchain?.items?.map((item) => item.code),
    // priceModels: filters?.priceModel?.items?.map((item) => item.code),
    playAndEarn: filters?.playAndEarn?.items?.map((item) => item.code),
    device: filters?.device?.code,
    friendInGames: !!filters?.friendInGame,
    gameStatus: filters?.gameStatus?.code,
    // releaseDates: filters?.releaseYear?.years,
    // prices: filters?.floorPrice && {
    //   code: filters?.floorPrice?.currency?.code as string,
    //   min: valueIsEmpty(filters?.floorPrice?.price[0])
    //     ? undefined
    //     : parseFloat(filters?.floorPrice?.price[0]),
    //   max: valueIsEmpty(filters?.floorPrice?.price[1])
    //     ? undefined
    //     : parseFloat(filters?.floorPrice?.price[1]),
    // },
  };
}

export function prepareFiltersToQueryParams(filters: IFilterFormInputs): IQueryParams {
  return {
    genreCodes: filters?.genre?.items?.length
      ? filters?.genre?.items?.map((item) => item.code)
      : undefined,
    blockchains: filters?.blockchain?.items?.length
      ? filters?.blockchain?.items?.map((item) => item.code)
      : undefined,
    // priceModels: filters?.priceModel?.items?.length
    //   ? filters?.priceModel?.items?.map((item) => item.code)
    //   : undefined,
    playAndEarn: filters?.playAndEarn?.items?.length
      ? filters?.playAndEarn?.items?.map((item) => item.code)
      : undefined,
    device: filters?.device?.code,
    friendInGames: !!filters?.friendInGame,
    gameStatus: filters?.gameStatus?.code,
    // releaseDates: filters?.releaseYear?.years,
    // priceCurrency: filters?.floorPrice?.currency?.code,
    // priceRange: filters?.floorPrice?.price,
  };
}

export function prepareQueryParamsToFilters(filters: IQueryStringGamesList): any {
  const {
    page,
    priceModels,
    gameStatus,
    genreCodes,
    friendInGames,
    releaseDates,
    device,
    gameItemSearch,
    gameItemsSort,
    blockchains,
    offsetCount,
    priceRange,
    priceCurrency,
    playAndEarn,
  } = filters;

  const prices: any = {};
  if (priceRange && (priceRange[0] || priceRange[1])) {
    if (priceCurrency) prices.code = priceCurrency ? priceCurrency : 'ETH';
    if (priceRange && priceRange[0]) prices.min = Number(priceRange[0]);
    if (priceRange && priceRange[1]) prices.max = Number(priceRange[1]);
  }

  const queryResult: IQueryInit = {
    friendInGames: friendInGames === 'true',
    genreCodes,
    blockchains,
    device,
    gameStatus,
    releaseDates,
    priceModels,
    playAndEarn,
  };

  const {
    genreCodes: queryGenreCodes,
    blockchains: queryBlockchains,
    gameStatus: queryGameStatuses,
    device: queryDevices,
    // priceModels: queryPriceModels,
    friendInGames: queryFriendInGames,
    // releaseDates: queryReleaseDates,
    // prices: queryPrices,
    playAndEarn: queryPlayAndEarn,
  } = queryResult;

  if (priceCurrency || priceRange) queryResult.prices = prices;

  return {
    offsetCount,
    gameItemsSort,
    gameItemSearch,
    page,
    genre: queryGenreCodes
      ? {
          key: 'GENRE',
          title: 'Genre',
          items: queryGenreCodes
            ? queryGenreCodes.map((item) => {
                return {
                  checked: true,
                  code: item,
                  disable: false,
                  title:
                    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace(/_/g, ' '),
                };
              })
            : [],
        }
      : undefined,
    blockchain: queryBlockchains?.length
      ? {
          key: 'BLOCKCHAIN',
          title: 'Blockchain',
          items: queryBlockchains
            ? queryBlockchains.map((item) => {
                return {
                  checked: true,
                  code: item,
                  disable: false,
                  title:
                    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace(/_/g, ' '),
                };
              })
            : [],
        }
      : undefined,
    // priceModel: queryPriceModels
    //   ? {
    //       key: 'PRICE_MODEL',
    //       title: 'Price model',
    //       type: 'CHECKBOX',
    //       items: queryPriceModels.length
    //         ? queryPriceModels.map((item) => {
    //             return {
    //               checked: true,
    //               code: item,
    //               disable: false,
    //               title:
    //                 item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace(/_/g, ' '),
    //             };
    //           })
    //         : [],
    //     }
    //   : undefined,
    playAndEarn: queryPlayAndEarn
      ? {
          key: 'PLAY_AND_EARN',
          title: 'Play and Earn',
          type: 'CHECKBOX',
          items: queryPlayAndEarn.length
            ? queryPlayAndEarn.map((item) => {
                return {
                  checked: true,
                  code: item,
                  disable: false,
                  title:
                    item.charAt(0).toUpperCase() + item.slice(1).toLowerCase().replace(/_/g, ' '),
                };
              })
            : [],
        }
      : undefined,
    gameStatus: queryGameStatuses
      ? {
          checked: false,
          code: queryGameStatuses,
          disable: false,
          title:
            queryGameStatuses.charAt(0).toUpperCase() + queryGameStatuses.slice(1).toLowerCase(),
        }
      : undefined,
    device: queryDevices
      ? {
          checked: false,
          code: queryDevices,
          disable: false,
          title: queryDevices.charAt(0).toUpperCase() + queryDevices.slice(1).toLowerCase(),
        }
      : undefined,
    friendInGames: queryFriendInGames
      ? {
          key: 'FRIENDS_IN_GAME',
          title: 'Friends in game',
          type: 'CHECKBOX',
          items: queryFriendInGames
            ? [
                {
                  checked: true,
                  code: 'is_friend_in_game',
                  disable: false,
                  title: 'Friend in game',
                },
              ]
            : [],
        }
      : undefined,
    // floorPrice:
    //   queryPrices?.code || queryPrices?.min || queryPrices?.max
    //     ? {
    //         currency: {
    //           checked: true,
    //           code: queryPrices?.code,
    //           disable: false,
    //           title: queryPrices?.code,
    //         },
    //         price: [queryPrices?.min, queryPrices?.max],
    //       }
    //     : undefined,
  };
}

export function prepareQueryGameItemSortToFilters(gameItemsSort: any) {
  if (!gameItemsSort) return {};
  return gameItemsSort.reduce((prev: any, current: any) => {
    const item = current.split(',');
    prev = {
      ...prev,
      [item[0]]: item[1],
    };
    return prev;
  }, {});
}

export function substringAsPath(asPath: string) {
  const firstIndex = asPath.substring(0, asPath.indexOf('?')).length + 1;
  const lastIndex = asPath.length;
  return asPath.substr(firstIndex, lastIndex);
}

export function prepareSortToServer(sort?: ISortValue): GameCardSort | undefined {
  switch (sort?.key) {
    // todo add filters when adding them to the gql schema
    case 'price':
      return {
        price: sort?.direction,
      };
    case 'rating':
      return {
        rating: sort?.direction,
      };
    default:
      return undefined;
  }
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

export const useForceUpdate = () => {
  scrollToTop();
  Router.reload();
};
