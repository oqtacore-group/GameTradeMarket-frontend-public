import { IGameItem } from './blocks/game';
import { ISaleTypeData } from './blocks/sale-type';
import { PriceRangeFields } from './blocks/price-range';
import { IFacetCheckboxGroupItem, IFacetRangeItem } from './blocks/facets';
import { IBlockchainsData } from './blocks/blockchains';

export type FilterBlock = 'game' | 'gameBlockchains' | 'saleType' | 'priceRange' | 'facets';
export interface IFilterFormInputs {
  game?: IGameItem;
  gameBlockchains?: IBlockchainsData;
  saleType?: ISaleTypeData;
  priceRange?: PriceRangeFields;
  facets?: Array<IFacetCheckboxGroupItem | IFacetRangeItem>;
}
