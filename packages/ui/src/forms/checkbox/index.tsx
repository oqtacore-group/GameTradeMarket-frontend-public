import React, { InputHTMLAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Label, InnerLabel } from './style';

export interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  indeterminate?: boolean;
  error?: boolean;
  children?: any;
}

export const Checkbox = (props: CheckBoxProps) => {
  const { children, ...checkboxProps } = props;

  const id = uuidv4();
  return (
    <Label htmlFor={id}>
      <input type="checkbox" {...checkboxProps} id={id} />
      {children && <InnerLabel>{children}</InnerLabel>}
    </Label>
  );
};
