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
import { useTranslation } from 'next-i18next';

export interface IOption<TValue> {
  value: TValue;
  label: any;
  [key: string]: any;
}

interface IProps {
  options: IOption<any>[];
  value?: any;
  onChange?(value: any): void;
  stringifyValue?(value: any): string;
  placeholder?: string;
}

export const Dropdown = (props: IProps) => {
  const { t } = useTranslation('gamesPage', { keyPrefix: 'translation' });
  const { options, value, stringifyValue, placeholder = '', onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [optionsListElement, optionsListRefCallback] = useState<HTMLDivElement | null>(null);
  const [optionsListWidth, setOptionListWidth] = useState<number>(0);
  const ref = useDetectClickOutside({
    onTriggered: () => setIsOpen(false),
  });

  const changeHandler = (value: any) => {
    setIsOpen(false);
    onChange && onChange(value);
  };

  const stringifyValueUtils = (value: any) => {
    return stringifyValue ? stringifyValue(value) : value;
  };
  const selectedOption =
    options.find(
      (option: IOption<any>) => stringifyValueUtils(option.value) === stringifyValueUtils(value)
    ) || null;

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
      <DropdownValue>{selectedOption?.label || placeholder}</DropdownValue>
      <DropdownIconWrapper isOpen={isOpen}>
        <SvgChevronDown />
      </DropdownIconWrapper>
      {isOpen && (
        <OptionsListWrapper ref={optionsListRefCallback}>
          {options.map((option: IOption<any>) => (
            <OptionWrapper
              key={option.value + Math.random()}
              onClick={() => {
                changeHandler(option.value);
              }}>
              {t(option.label)}
            </OptionWrapper>
          ))}
        </OptionsListWrapper>
      )}
    </DropdownWrapper>
  );
};
