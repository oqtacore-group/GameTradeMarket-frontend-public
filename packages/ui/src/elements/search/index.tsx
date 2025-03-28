import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { SvgMagnifier } from '@game-trade/icons';

import { SearchWrapper, Input, IconBox } from './style';

export interface IPropsSearch {
  onChange: (value: any) => void;
  initialValue?: any;
}

export const Search = ({ initialValue, onChange }: IPropsSearch) => {
  const [value, setValue] = useState(initialValue || '');
  const [targetElement, targetRefCallback] = useState<HTMLElement | null>(null);
  const debounceSearch = debounce(onChange, 200);

  const onHandleChange = (event: any) => {
    const value = event?.target?.value;
    debounceSearch(value);
    setValue(value);
  };

  const onIconClick = () => {
    targetElement?.focus();
  };

  return (
    <SearchWrapper>
      <Input ref={targetRefCallback} value={value} onChange={onHandleChange} />
      <IconBox>
        <SvgMagnifier onClick={onIconClick} size={16} />
      </IconBox>
    </SearchWrapper>
  );
};
