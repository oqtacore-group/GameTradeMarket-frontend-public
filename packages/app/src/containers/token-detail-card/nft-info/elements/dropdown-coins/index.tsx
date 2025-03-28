import React, { useState, useEffect } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { SvgChevronDown } from '@game-trade/icons';

import {
  DropdownWrapper,
  DropdownValue,
  DropdownIconWrapper,
  OptionsListWrapper,
  OptionWrapper,
} from './style';
import { GameCurrency } from '@game-trade/lib/codegen-types';

interface IProps {
  options?: GameCurrency[];
  onChange?(value: GameCurrency): void;
  placeholder?: string;
}

export const Dropdown = (props: IProps) => {
  const { options, placeholder = '', onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [optionsListElement, optionsListRefCallback] = useState<HTMLDivElement | null>(null);
  const [optionsListWidth, setOptionListWidth] = useState<number>(0);
  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });

  const changeHandler = (data: GameCurrency) => {
    setIsOpen(false);
    onChange && onChange(data);
  };

  useEffect(() => {
    if (isOpen && optionsListElement) {
      setOptionListWidth(optionsListElement.getBoundingClientRect().width);
    }
  }, [isOpen, optionsListElement]);

  return (
    <DropdownWrapper
      isOpen={isOpen}
      optionsListWidth={optionsListWidth}
      ref={ref}
      onMouseDown={() => setIsOpen(true)}>
      <DropdownValue>{placeholder}</DropdownValue>
      {options && options.length > 1 && (
        <DropdownIconWrapper isOpen={isOpen}>
          <SvgChevronDown />
        </DropdownIconWrapper>
      )}
      {isOpen && options && options.length > 1 && (
        <OptionsListWrapper ref={optionsListRefCallback}>
          {options?.map((option: GameCurrency) => (
            <OptionWrapper
              key={option.contract_address}
              onClick={() => {
                changeHandler(option);
              }}>
              {option.coin_name}
            </OptionWrapper>
          ))}
        </OptionsListWrapper>
      )}
    </DropdownWrapper>
  );
};
