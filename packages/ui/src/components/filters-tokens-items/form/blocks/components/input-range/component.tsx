import React, { FocusEvent, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';

import { IProps } from './interfaces';
import {
  ComponentWrapper,
  Label,
  ValueWrapper,
  InputStyledFrom,
  InputStyledTo,
  SeparatorWrapper,
} from './style';

export const InputRange = React.forwardRef((props: IProps, ref: any) => {
  const {
    label,
    value = [null, null],
    placeholderFrom = '',
    placeholderTo = '',
    ...inputProps
  } = props;
  const [innerValue, setInnerValue] = useState(Array.isArray(value) ? value : [null, null]);

  useEffect(() => {
    if (Array.isArray(value)) {
      const [from, to] = value;
      setInnerValue([from === null ? '' : from, to === null ? '' : to]);
    }
  }, [...value]);

  const changeFromHandler = (e: any) => {
    const valueFrom = e.value;
    setInnerValue([valueFrom, innerValue[1]]);
  };
  const changeToHandler = (e: any) => {
    const valueTo = e.value;
    setInnerValue([innerValue[0], valueTo]);
  };

  useEffect(() => {
    inputProps.onChange && inputProps.onChange(innerValue as any);
  }, [...innerValue]);

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur && inputProps.onBlur(e);
  };
  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus && inputProps.onFocus(e);
  };

  return (
    <ComponentWrapper>
      {label && <Label>{label}</Label>}
      <ValueWrapper>
        <InputStyledFrom>
          <NumberFormat
            value={innerValue[0]}
            onValueChange={changeFromHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            placeholder={placeholderFrom}
            thousandSeparator={' '}
          />
        </InputStyledFrom>
        <SeparatorWrapper>to</SeparatorWrapper>
        <InputStyledTo>
          <NumberFormat
            value={innerValue[1]}
            onValueChange={changeToHandler}
            onBlur={blurHandler}
            onFocus={focusHandler}
            placeholder={placeholderTo}
            thousandSeparator={' '}
          />
        </InputStyledTo>
      </ValueWrapper>
    </ComponentWrapper>
  );
});
