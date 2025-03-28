import React from 'react';

import { IButtonProps } from './interfaces';
import { RadioButtonWrapper, RadioButtonComponent, RadioButtonLabel } from './style';
import { useRadioGroupContext } from './group';

export const RadioButton = (props: IButtonProps) => {
  const { children, value, valueKey } = props;
  const { onChange, value: contextValue } = useRadioGroupContext();
  const contextValueData = valueKey && contextValue ? contextValue[valueKey] : contextValue;
  const valueData = valueKey && value ? value[valueKey] : value;
  const checked = contextValueData === valueData;

  const clickHandler = () => {
    onChange && onChange(value);
  };

  return (
    <RadioButtonWrapper onClick={clickHandler}>
      <RadioButtonComponent checked={checked} />
      <RadioButtonLabel checked={checked}>{children}</RadioButtonLabel>
    </RadioButtonWrapper>
  );
};
