import React, { useState, useEffect } from 'react';
import { SvgChevronDown, SvgCloseOutline } from '@game-trade/icons';

import {
  SelectWrapper,
  SelectPopup,
  SelectOption,
  SelectValue,
  SelectIconWrapper,
  ClearIcon,
} from './style';
import Portal from './portal';

export interface IPropsSelect {
  options: IOptionSelectComponent[];
  onChange: (activeId: string | undefined) => void;
  selectedId?: string;
  placeholder?: string;
  className?: string;
}

export interface IOptionSelectComponent {
  id: string;
  label: string;
  count?: string;
  isDisabled?: boolean;
}

export interface IOpenerPositionSelect {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export const Select = ({
  options,
  selectedId,
  onChange,
  placeholder = '',
  className,
}: IPropsSelect) => {
  const [isOpen, setOpen] = useState(false);
  const [targetElement, targetRefCallback] = useState<HTMLElement | null>(null);
  const [openerPosition, setOpenerPosition] = useState<IOpenerPositionSelect | null>(null);
  useEffect(() => {
    if (targetElement && window) {
      const openerMetrics = targetElement.getBoundingClientRect();
      const { scrollX, scrollY } = window;
      setOpenerPosition({
        x: openerMetrics.left,
        y: openerMetrics.top,
        left: openerMetrics.left + scrollX,
        top: openerMetrics.top + scrollY,
        width: openerMetrics.width,
        height: openerMetrics.height,
      });
    }

    if (!isOpen) {
      resetPosition();
    }
  }, [isOpen]);

  const resetPosition = () => {
    setOpenerPosition(null);
  };

  const onChangeTab = (tabId: any, isDisabled?: boolean) => () => {
    if (isDisabled) {
      return;
    }
    onChange(tabId);
    setOpen(false);
  };

  const onClearSelect = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    onChange(undefined);
  };

  const toggleSelect = () => {
    setOpen(!isOpen);
  };

  // click on document
  const clickHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen && window) {
      document.body.addEventListener('click', clickHandler);
    }
    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, [isOpen, targetElement]);

  const activeOption = options.find(({ id }) => id === selectedId);

  return (
    <SelectWrapper className={className}>
      <SelectValue ref={targetRefCallback} onClick={toggleSelect}>
        {activeOption ? (
          <>
            {activeOption?.label}
            <ClearIcon onClick={onClearSelect}>
              <SvgCloseOutline />
            </ClearIcon>
          </>
        ) : (
          placeholder
        )}
        <SelectIconWrapper isOpen={isOpen}>
          <SvgChevronDown />
        </SelectIconWrapper>
      </SelectValue>
      <Portal>
        {isOpen && options.length && (
          <SelectPopup isOpen={isOpen} {...openerPosition}>
            {options.map(({ id, label, count, isDisabled }) => (
              <SelectOption
                onClick={onChangeTab(id, isDisabled)}
                key={id}
                isActive={id === selectedId}
                isDisabled={isDisabled}>
                {label}
              </SelectOption>
            ))}
          </SelectPopup>
        )}
      </Portal>
    </SelectWrapper>
  );
};
