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
  className?: string;
  classNameValue?: string;
  onOpen?: () => void;
}

export const Dropdown = (props: IProps) => {
  const {
    options,
    value,
    stringifyValue,
    placeholder = '',
    onChange,
    className,
    classNameValue,
    onOpen,
  } = props;
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
      onOpen && onOpen();
    }
  }, [isOpen, optionsListElement]);

  return (
    <DropdownWrapper
      isOpen={isOpen}
      optionsListWidth={optionsListWidth}
      ref={ref}
      onMouseDown={() => setIsOpen(true)}
      className={className}>
      <DropdownValue className={classNameValue}>
        {selectedOption?.label || placeholder}
      </DropdownValue>
      <DropdownIconWrapper isOpen={isOpen}>
        <SvgChevronDown />
      </DropdownIconWrapper>
      {isOpen && (
        <OptionsListWrapper ref={optionsListRefCallback}>
          {options.map((option: IOption<any>) => (
            <OptionWrapper
              key={option.value}
              onClick={() => {
                changeHandler(option.value);
              }}>
              {option.label}
            </OptionWrapper>
          ))}
        </OptionsListWrapper>
      )}
    </DropdownWrapper>
  );
};
