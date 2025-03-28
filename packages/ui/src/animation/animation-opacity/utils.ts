import { SyntheticEvent } from 'react';

export function stopPropagation(e: SyntheticEvent) {
  e.stopPropagation();
  e.nativeEvent.stopPropagation();
}

export function isEmpty(value: any): boolean {
  return value === undefined || value === null;
}

export function existsValue<T>(defaultValue: T, ...values: (T | undefined)[]): T[] {
  return values.map((value?: T) => (isEmpty(value) ? defaultValue : (value as T)));
}
