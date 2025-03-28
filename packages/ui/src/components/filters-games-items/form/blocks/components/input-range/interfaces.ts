import { FocusEvent } from 'react';

export interface IInputProps {
  name: string;
  value: [any, any];
  onChange(value: [any, any]): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends Partial<IInputProps> {
  id?: string;
  label?: string;
  placeholderFrom?: string;
  placeholderTo?: string;
  [key: string]: any;
}
