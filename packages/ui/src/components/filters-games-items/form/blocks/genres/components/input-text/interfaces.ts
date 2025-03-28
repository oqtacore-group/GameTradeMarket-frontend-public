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
  children?: any; //TODO: it is expected that a React icon component will be passed
  [key: string]: any;
}
