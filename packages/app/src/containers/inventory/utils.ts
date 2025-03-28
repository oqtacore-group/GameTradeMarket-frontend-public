import {
  GameCardPriceFilter,
  GameCardsFacetsParam,
  GameCardSort,
} from '@game-trade/lib/src/codegen-types';

import { ISortValue } from './sorting-game-items';

import { IFilterFormInputs } from '@game-trade/ui/components/filters-tokens-items';

interface IServerFilters {
  gameCode?: string;
  facets?: GameCardsFacetsParam[];
  price?: GameCardPriceFilter;
}

function valueIsEmpty(value: any) {
  return ['', null, undefined].includes(value);
}

export function prepareFiltersToServer(filters: IFilterFormInputs): IServerFilters {
  return {
    gameCode: filters?.game?.code,
    facets: filters?.facets as GameCardsFacetsParam[],
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
