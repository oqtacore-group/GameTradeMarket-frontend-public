import React, { createContext, useContext } from 'react';

import { IGroupProps, IRadioGroupContext } from './interfaces';
import { RadioGroupStyled } from './style';

export const RadioGroupContext = createContext<IRadioGroupContext>({} as IRadioGroupContext);
export const useRadioGroupContext = () => useContext(RadioGroupContext);

const RadioGroupProvider = RadioGroupContext.Provider;

export const RadioGroup = (props: IGroupProps) => {
  const { children, name = '', value, onChange = undefined, direction = 'column' } = props;

  return (
    <RadioGroupProvider value={{ name, value, onChange }}>
      <RadioGroupStyled direction={direction}>{children}</RadioGroupStyled>
    </RadioGroupProvider>
  );
};
