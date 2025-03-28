import React from 'react';

import { IProps, SIZE, ALIGN } from './interfaces';
import { LoaderContainer, Spinning } from './style';
export { SIZE, ALIGN };

export function Loader({ position, size }: IProps) {
  return (
    <LoaderContainer position={position} size={size || SIZE.BASE}>
      <Spinning size={size || SIZE.BASE} />
    </LoaderContainer>
  );
}
