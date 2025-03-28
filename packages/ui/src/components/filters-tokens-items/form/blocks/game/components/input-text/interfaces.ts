import { FocusEvent } from 'react';

export interface IInputProps {
  name: string;
  value: any;
  onChange(value: string): void;
  onBlur(e: FocusEvent<HTMLInputElement>): void;
}

export interface IProps extends Partial<IInputProps> {
  id?: string;
  placeholder?: string;
  children?: any; // it is assumed that an icon react component will be passed
  [key: string]: any;
}
