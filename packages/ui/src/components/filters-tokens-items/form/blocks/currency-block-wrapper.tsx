import React, { useEffect, useState } from 'react';
import { SvgChevronDown } from '@game-trade/icons';

import {
  FilterBlockWrapperStyled,
  FilterBlockTitleIconWrapper,
  FilterBlockContent,
  CurrencyFilterBlockTitle,
  CurrencyFilterBlockHeader,
  CheckboxWrapper,
} from './style';
import { AnimationHeight } from '../../../../animation/animation-height';

interface IProps {
  title: string;
  children: any;
  checkedChain: string;
  onBlockchainChange: any;
}

export const CurrencyBlockWrapper = (props: IProps) => {
  const { title, children, checkedChain, onBlockchainChange } = props;

  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
    onBlockchainChange(!isChecked ? title : '');
  };

  useEffect(() => {
    if (checkedChain === title) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedChain, title]);

  return (
    <FilterBlockWrapperStyled>
      <CurrencyFilterBlockHeader>
        <CheckboxWrapper disabled={false} onClick={handleCheckboxClick}>
          <input type="checkbox" checked={isChecked} />
          <span />
        </CheckboxWrapper>
        <CurrencyFilterBlockTitle onClick={() => setIsOpen(!isOpen)}>
          {title}
        </CurrencyFilterBlockTitle>
        <FilterBlockTitleIconWrapper onClick={() => setIsOpen(!isOpen)} isOpen={!isOpen}>
          <SvgChevronDown />
        </FilterBlockTitleIconWrapper>
      </CurrencyFilterBlockHeader>
      <AnimationHeight isOpen={!isOpen} time={400}>
        <FilterBlockContent>{children}</FilterBlockContent>
      </AnimationHeight>
    </FilterBlockWrapperStyled>
  );
};
