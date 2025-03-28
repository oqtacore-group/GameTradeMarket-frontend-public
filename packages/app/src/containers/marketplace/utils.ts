import {
  GameCardPriceFilter,
  GameCardsFacetsParam,
  GameCardSort,
} from '@game-trade/lib/src/codegen-types';

import { ISortValue } from './sorting-game-items';
import { IGridBreakPoints } from '@game-trade/ui/modifiers/smart-grid-styled/interfaces';

import { IFilterFormInputs } from '@game-trade/ui/components/filters-tokens-items';
import { IGameItem } from '@game-trade/ui/components/filters-tokens-items/form/blocks/game';
import { ISaleTypeData } from '@game-trade/ui/components/filters-tokens-items/form/blocks/sale-type';
import { PriceRangeFields } from '@game-trade/ui/components/filters-tokens-items/form/blocks/price-range';
import {
  IFacetCheckboxGroupItem,
  IFacetRangeItem,
} from '@game-trade/ui/components/filters-tokens-items/form/blocks/facets';
import Router from 'next/router';

interface IServerFilters {
  gameCode?: string;
  facets?: GameCardsFacetsParam[];
  price?: GameCardPriceFilter;
  saleTypes?: any;
  blockchains?: any;
  coinAddress?: any;
  blockchain?: any;
}

interface IFiltersMarketplace {
  game?: IGameItem;
  saleType?: ISaleTypeData;
  priceRange?: PriceRangeFields;
  facets?: Array<IFacetCheckboxGroupItem | IFacetRangeItem>;
}

interface IQueryStringMarketplace {
  priceCurrency?: string;
  gameCode?: string;
  priceRange?: number[];
  facets?: string[] | [];
  offsetCount?: string;
  gridView?: string;
  gameItemsSort?: string[];
  gameItemSearch?: string;
  page?: any;
  saleType?: any;
}

function valueIsEmpty(value: any) {
  return ['', null, undefined].includes(value);
}

export function breakPointsGridView(isNormalColumns?: boolean, isWide?: boolean): IGridBreakPoints {
  return {
    '320px': {
      size: 320,
      gridTemplate: isNormalColumns ? 1 : 2,
      offset: 20,
    },
    '576px': {
      size: 576,
      gridTemplate: isNormalColumns ? 1 : 2,
      offset: isWide ? (isNormalColumns ? 21 : 20) : isNormalColumns ? 20 : 18,
    },
    '768px': {
      size: 768,
      gridTemplate: isWide ? (isNormalColumns ? 3 : 4) : 2,
      offset: isWide ? (isNormalColumns ? 21 : 20) : isNormalColumns ? 20 : 18,
    },
    '1024px': {
      size: 1024,
      gridTemplate: isWide ? (isNormalColumns ? 3 : 4) : isNormalColumns ? 2 : 3,
      offset: isWide ? (isNormalColumns ? 20 : 18) : 20,
    },
    '1280px': {
      size: 1280,
      gridTemplate: isWide ? (isNormalColumns ? 5 : 6) : isNormalColumns ? 4 : 5,
      offset: isWide ? (isNormalColumns ? 24 : 21) : isNormalColumns ? 20 : 18,
    },
    '1600px': {
      size: 1600,
      gridTemplate: isWide ? (isNormalColumns ? 6 : 7) : isNormalColumns ? 5 : 6,
      offset: isWide ? (isNormalColumns ? 21 : 24) : isNormalColumns ? 18 : 21,
    },
    '1920px': {
      size: 1920,
      gridTemplate: isWide ? (isNormalColumns ? 7 : 8) : isNormalColumns ? 6 : 7,
      offset: isWide ? (isNormalColumns ? 21 : 24) : isNormalColumns ? 18 : 21,
    },
  };
}

export function prepareFiltersToServer(filters: IFilterFormInputs): IServerFilters {
  const saleTypes: any = filters?.saleType?.items?.map((item) => {
    return item.code;
  });
  const coinAddress: any = filters?.gameBlockchains?.items?.map((item) => {
    return item.coin_address;
  });
  const blockchain: any = filters?.gameBlockchains?.items?.map((item) => {
    return item.blockchain;
  });
  return {
    gameCode: filters?.game?.code,
    facets: filters?.facets as GameCardsFacetsParam[],
    saleTypes,
    coinAddress,
    blockchain,
    price: filters?.priceRange && {
      min: valueIsEmpty(filters.priceRange?.price[0])
        ? undefined
        : parseFloat(filters.priceRange?.price[0]),
      max: valueIsEmpty(filters.priceRange?.price[1])
        ? undefined
        : parseFloat(filters.priceRange?.price[1]),
    },
  };
}

export function prepareFacetsToQueryParams(filters: IFiltersMarketplace): any {
  if (!Object.keys(filters).length) return;
  if (filters?.facets && !Object.keys(filters.facets).length) return;
  const facets = filters?.facets?.map((item: any) => {
    return [
      ...Object.keys(item).map((key) => {
        if (key === 'values' && item[key]) {
          return [
            'values',
            ...item[key].map((value: any) => {
              return Object.keys(value).map((k) => {
                return [k, value[k]];
              });
            }),
          ];
        } else {
          return [key, item[key]];
        }
      }),
    ];
  });

  return {
    facets,
  };
}

export function prepareQueryParamsToFilters(filters: IQueryStringMarketplace): any {
  const _gameItemsSort = filters?.gameItemsSort?.reduce((prev, current) => {
    const item = current.split(',');
    prev = {
      ...prev,
      [item[0]]: item[1],
    };
    return prev;
  }, {});

  const price = {
    min: filters?.priceRange && filters?.priceRange[0],
    max: filters?.priceRange && filters?.priceRange[1],
  };

  return {
    offsetCount: filters?.offsetCount,
    gridView: filters?.gridView,
    gameCode: filters?.gameCode,
    gameItemsSort: _gameItemsSort,
    gameItemSearch: filters?.gameItemSearch,
    page: filters?.page,
    saleType: filters?.saleType,
    facets: prepareQueryFacetsToFilters(filters.facets),
    price,
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

export function prepareQueryFacetsToFilters(data: any) {
  const _facets: any = [];
  data?.forEach((facets: any) => {
    const sliceFacets = [];
    const splitFacets = facets.split(',');
    for (let index = 0; index < splitFacets.length; index++) {
      if ((index + 1) % 2 === 0) continue;
      if (splitFacets[index] === 'values') {
        const values = splitFacets
          .slice(index + 1)
          .reduce((prev: any[], current: string, i: number, array: string[]) => {
            if (i % 4 === 0 || i === 0) {
              prev.push([
                [array[i], array[i + 1]],
                [array[i + 2], Number(array[i + 3])],
              ]);
            }
            return prev;
          }, []);
        sliceFacets.push([splitFacets[index], values]);
        break;
      }
      sliceFacets.push([
        splitFacets[index],
        splitFacets[index] === 'min' || splitFacets[index] === 'max'
          ? Number(splitFacets[index + 1])
          : splitFacets[index + 1],
      ]);
    }
    _facets.push(sliceFacets);
  });

  return _facets.map((item: any) => {
    const facet = Object.fromEntries(item);
    const values = facet.values?.map((val: any) => {
      return Object.fromEntries(val);
    });

    const objFacet = { ...facet };
    if (values) {
      objFacet.values = values;
    }

    return objFacet;
  });
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
