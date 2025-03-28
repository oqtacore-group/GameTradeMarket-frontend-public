import React, { useState, useEffect } from 'react';

import { AccordionItem } from './accordion-item';
import { IAccordionItem } from './interfaces';
import { AccordionWrapper } from './style';

interface IPropsAccordion {
  list: IAccordionItem[];
  isMultiExpand?: boolean;
}

export const Accordion = (props: IPropsAccordion) => {
  const { list, isMultiExpand = true } = props;
  const [expandedIds, setExpandedIds] = useState<any[]>([]);

  useEffect(() => {
    // init expand items
    if (list.length) {
      const isOpenItemIds = list
        .filter((item: IAccordionItem) => item.isOpen)
        .map((item: IAccordionItem) => item.id);
      const firstItemId = list[0].id;

      if (isMultiExpand) {
        setExpandedIds(isOpenItemIds.length ? isOpenItemIds : [firstItemId]);
      } else {
        setExpandedIds(isOpenItemIds.length ? isOpenItemIds[0] : [firstItemId]);
      }
    }
  }, []);

  const onItemClick = (item: IAccordionItem) => {
    if (expandedIds.includes(item.id)) {
      setExpandedIds(expandedIds.filter((id: any) => item.id !== id));
    } else if (isMultiExpand) {
      setExpandedIds([...expandedIds, item.id]);
    } else {
      setExpandedIds([item.id]);
    }
  };

  return (
    <AccordionWrapper>
      {list.map((item: IAccordionItem) => (
        <AccordionItem
          key={item.id}
          item={item}
          isExpand={expandedIds.includes(item.id)}
          onClick={onItemClick}
        />
      ))}
    </AccordionWrapper>
  );
};
