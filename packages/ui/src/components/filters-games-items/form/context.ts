import { createContext, useContext } from 'react';

import { FilterBlock, IFilterFormInputs } from './interfaces';

export interface IFiltersContext {
  resetFilter(filterBlockName?: FilterBlock): void;
  filtersData: IFilterFormInputs | null;
  filtersBlocks: FilterBlock[];
  __setFiltersBlocks(filtersBlocks: FilterBlock[]): void;
  __methods__: any;
}

const defaultReset = (filterBlockName?: FilterBlock) => 'reset method is not initialized';
const defaultSetFiltersBlocks = (filtersBlocks: FilterBlock[]) =>
  '__setFiltersBlocks method is not initialized';

const defaultFiltersContextData = {
  resetFilter: defaultReset,
  filtersData: null,
  filtersBlocks: [],
  __setFiltersBlocks: defaultSetFiltersBlocks,
  __methods__: undefined,
};

export const FiltersContext = createContext<IFiltersContext>(defaultFiltersContextData);

export const useFiltersContext = () => useContext(FiltersContext);
