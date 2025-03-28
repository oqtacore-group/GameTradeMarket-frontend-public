import React, { useState } from 'react';
import { SvgChevronDown } from '@game-trade/icons';

import {
  FilterBlockWrapperStyled,
  FilterBlockHeader,
  FilterBlockTitle,
  FilterBlockTitleIconWrapper,
  FilterBlockContent,
} from './style';
import { AnimationHeight } from '../../../../animation/animation-height';

interface IProps {
  title: string;
  children: any;
}

export const FacetsBlockWrapper = (props: IProps) => {
  const { title, children } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FilterBlockWrapperStyled>
      <FilterBlockHeader onClick={() => setIsOpen(!isOpen)}>
        <FilterBlockTitle>{title}</FilterBlockTitle>
        <FilterBlockTitleIconWrapper isOpen={!isOpen}>
          <SvgChevronDown />
        </FilterBlockTitleIconWrapper>
      </FilterBlockHeader>
      <AnimationHeight isOpen={!isOpen} time={400}>
        <FilterBlockContent>{children}</FilterBlockContent>
      </AnimationHeight>
    </FilterBlockWrapperStyled>
  );
};
