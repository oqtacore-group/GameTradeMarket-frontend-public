import { FocusEvent } from 'react';

export interface IGroupProps {
  children: any;
  name?: string;
  value?: any;
  onChange?(value: string): void;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
  direction?: 'row' | 'column';
}

export interface IButtonProps extends Partial<IGroupProps> {
  id?: string;
  children?: any;
  valueKey?: string;
  [key: string]: any;
}

export interface IRadioGroupContext {
  name: string;
  value: any;
  onChange?(value: string): void;
}
