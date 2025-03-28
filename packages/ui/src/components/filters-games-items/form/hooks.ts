import { useRef, useEffect } from 'react';

export function usePrevious(value: any) {
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  });

  return valueRef.current;
}
