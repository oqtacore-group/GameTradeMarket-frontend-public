import React from 'react';
import { SvgCloseOutline } from '@game-trade/icons';

import { useFiltersContext } from '../form/context';

import {
  SelectedFiltersWrapper,
  ResetAllFiltersButton,
  SelectedFilterItemLabel,
  SelectedFilterItemIconWrapper,
} from './style';
import { useSelectedFilters } from './hooks';
import { ISelectedFilterItem } from './interfaces';
import { SelectedFilterItem } from './selected-filter-item';

export const SelectedFilters = () => {
  const { filtersData, resetFilter, filtersBlocks } = useFiltersContext();
  const selectedFilters = useSelectedFilters(filtersBlocks, filtersData);
  const hasResetFilters = selectedFilters.some(
    (selectedFilter: ISelectedFilterItem) => selectedFilter.canReset
  );

  const onResetAll = () => resetFilter();
  return (
    <SelectedFiltersWrapper>
      {selectedFilters.map((selectedFilter: ISelectedFilterItem) => (
        <SelectedFilterItem
          key={selectedFilter.filterBlockName}
          selectedFilterItem={selectedFilter}
          resetFilter={resetFilter}
        />
      ))}
      {hasResetFilters && (
        <ResetAllFiltersButton onClick={onResetAll}>
          <SelectedFilterItemLabel>Clear all</SelectedFilterItemLabel>
          <SelectedFilterItemIconWrapper>
            <SvgCloseOutline size={20} />
          </SelectedFilterItemIconWrapper>
        </ResetAllFiltersButton>
      )}
    </SelectedFiltersWrapper>
  );
};
