import React from 'react';

type TDimension = 'small' | 'large' | 'free';
type TAlign = 'left' | 'right' | 'center';
type TMode = 'decimal' | 'numeric';

export interface IDimension {
  dimension?: TDimension;
}

export interface IWrapper extends IDimension {
  disabled?: boolean;
  alignText?: TAlign;
  width?: string;
  color?: string;
}

export interface IStyleProps extends IDimension {
  focused: boolean;
  disabled?: boolean;
}

export interface IStylePropsError extends IStyleProps {
  error?: string | boolean;
}

export interface IPlaceholder extends IStylePropsError {
  isHasValue: boolean;
}

export interface IInputProps {
  value?: string;
  type?: 'text' | 'password' | 'tel' | 'number' | 'date' | 'file' | 'email' | 'url';
  id?: string;
  key?: string | number;
  autoFocus?: boolean;
  error?: string | boolean;
  name?: string;
  color?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string, id?: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>, value: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>, value: string, id?: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  dimension?: TDimension;
  disabled?: boolean;
  maxLength?: number;
  prevIcon?: any;
  postIcon?: any;
  title?: string;
  alignText?: TAlign;
  autoFill?: boolean;
  className?: string;
  inputMode?: TMode;
  width?: string;
  autocomplete?: string;
  isHighlightIcon?: boolean; // default true
  extraText?: string; // default true
  rules?: any;
}

export interface IShared {
  value?: string;
  id?: string;
  rules: any;
  maxLength?: number;
  disabled?: boolean;
  color?: string;
  name?: string;
  autoFocus?: boolean;
  inputMode?: TMode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface IState {
  focused: boolean;
  passwordVisible: boolean;
  value?: string;
}

export interface IIconProps extends IDimension {
  position?: 'left' | 'right';
  isHighlightIcon?: boolean;
}
