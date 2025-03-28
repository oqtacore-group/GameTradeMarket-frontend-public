import React, { createContext, useContext } from 'react';

import { IGroupProps, ICheckboxGroupContext } from './interfaces';
import { CheckboxGroupStyled, GroupLabel } from './style';

export const CheckboxGroupContext = createContext<ICheckboxGroupContext>(
  {} as ICheckboxGroupContext
);
export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);

const CheckboxGroupProvider = CheckboxGroupContext.Provider;

export const CheckboxGroup = (props: IGroupProps) => {
  const { children, label, name = '', value, onChange = undefined, direction = 'column' } = props;

  return (
    <CheckboxGroupProvider value={{ name, value, onChange }}>
      <CheckboxGroupStyled direction={direction}>
        {label && <GroupLabel>{label}</GroupLabel>}
        {children}
      </CheckboxGroupStyled>
    </CheckboxGroupProvider>
  );
};
