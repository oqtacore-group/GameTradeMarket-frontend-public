import { FocusEvent } from 'react';

export interface IInputProps {
  onChange(value: any): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
  name: string;
}

export interface IProps extends IInputProps {
  id?: string;
  label?: string;
  disabled?: boolean;
  grouped?: boolean;
  valueKey?: string;
  [key: string]: any;
}

export interface IGroupProps extends Partial<IInputProps> {
  children: any;
  label?: any;
  value?: any;
  direction?: 'row' | 'column';
}

export interface ICheckboxGroupContext {
  name: string;
  value: any[];
  onChange?(value: any[]): void;
}
