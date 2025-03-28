import React from 'react';
import { SvgGridNormalColumns, SvgGridSmallColumns } from '@game-trade/icons';

import { GridViewWrapper, GridViewItem } from './style';

interface IProps {
  value?: 'normal-columns' | 'small-columns';
  onChange?(value: 'normal-columns' | 'small-columns'): void;
}

export const GridView = (props: IProps) => {
  const { value, onChange } = props;

  const changeHandler = (value: 'normal-columns' | 'small-columns') => {
    onChange && onChange(value);
  };

  return (
    <GridViewWrapper>
      <GridViewItem
        isActive={value === 'normal-columns'}
        onClick={() => changeHandler('normal-columns')}>
        <SvgGridNormalColumns />
      </GridViewItem>
      <GridViewItem
        isActive={value === 'small-columns'}
        onClick={() => changeHandler('small-columns')}>
        <SvgGridSmallColumns />
      </GridViewItem>
    </GridViewWrapper>
  );
};
