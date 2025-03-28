import React from 'react';
import { SvgChevronDown } from '@game-trade/icons';

import { IAccordionItem } from './interfaces';
import {
  AccordionItemWrapper,
  AccordionItemHeader,
  AccordionItemTitle,
  AccordionItemIconWrapper,
  AccordionItemContent,
} from './style';

interface IPropsItem {
  item: IAccordionItem;
  isExpand: boolean;
  onClick(item: IAccordionItem): void;
}

export const AccordionItem = (props: IPropsItem) => {
  const { item, isExpand, onClick } = props;

  const clickHandler = () => onClick(item);

  return (
    <AccordionItemWrapper>
      <AccordionItemHeader onClick={clickHandler}>
        <AccordionItemTitle>{item.title}</AccordionItemTitle>
        <AccordionItemIconWrapper isExpand={isExpand}>
          <SvgChevronDown />
        </AccordionItemIconWrapper>
      </AccordionItemHeader>
      {isExpand && <AccordionItemContent>{item.content}</AccordionItemContent>}
    </AccordionItemWrapper>
  );
};
