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
  children?: any; // it is expected that a react component will be passed and an icon
  [key: string]: any;
}
