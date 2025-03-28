import React, { FocusEvent, useEffect, useState, useRef } from 'react';

import { IProps } from './interfaces';
import { ComponentWrapper, InputStyled, IconWrapper } from './style';

export const InputText = React.forwardRef((props: IProps, ref: any) => {
  const { type = 'text', value = '', placeholder = '', children, ...inputProps } = props;
  const [iconWrapperElement, iconWrapperRefCallback] = useState<HTMLElement | null>(null);
  const [iconWrapperWidth, setIconWrapperWidth] = useState(0);
  const innerRef = useRef();
  const currentRef = ref || innerRef;

  useEffect(() => {
    if (children && iconWrapperElement) {
      setIconWrapperWidth(iconWrapperElement.getBoundingClientRect().width);
    }
  }, []);

  const changeHandler = (e: any) => {
    const value = e.target.value;

    inputProps.onChange && inputProps.onChange(value);
  };
  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onBlur && inputProps.onBlur(e);
  };
  const focusHandler = (e: FocusEvent<HTMLInputElement>) => {
    inputProps.onFocus && inputProps.onFocus(e);
  };
  const clickHandler = () => {
    if (children && iconWrapperElement) {
      setIconWrapperWidth(iconWrapperElement.getBoundingClientRect().width);
    }
    if (currentRef.current) {
      currentRef.current.focus();
    }
  };

  return (
    <ComponentWrapper onClick={clickHandler}>
      <InputStyled
        ref={currentRef}
        type={type}
        value={value}
        {...inputProps}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        iconWrapperWidth={iconWrapperWidth}
        placeholder={placeholder}
      />
      <IconWrapper ref={iconWrapperRefCallback}>{children}</IconWrapper>
    </ComponentWrapper>
  );
});
