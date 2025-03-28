import React from 'react';
import { SvgCloseOutline } from '@game-trade/icons';

import { FilterBlock } from '../form/interfaces';

import { ISelectedFilterItem } from './interfaces';
import {
  SelectedFilterItemWrapper,
  SelectedFilterItemLabel,
  SelectedFilterItemIconWrapper,
} from './style';

interface IProps {
  selectedFilterItem: ISelectedFilterItem;
  resetFilter: (filterBlockName?: FilterBlock) => void;
}

export const SelectedFilterItem = (props: IProps) => {
  const { selectedFilterItem, resetFilter } = props;

  const onReset = () => resetFilter(selectedFilterItem.filterBlockName as FilterBlock);

  return (
    <SelectedFilterItemWrapper>
      <SelectedFilterItemLabel>{selectedFilterItem.label}</SelectedFilterItemLabel>
      {selectedFilterItem.canReset && (
        <SelectedFilterItemIconWrapper onClick={onReset}>
          <SvgCloseOutline size={20} />
        </SelectedFilterItemIconWrapper>
      )}
    </SelectedFilterItemWrapper>
  );
};
