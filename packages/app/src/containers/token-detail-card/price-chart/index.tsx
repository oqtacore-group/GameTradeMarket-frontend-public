import React from 'react';
import * as S from './style';

import * as Component from '@game-trade/ui';

// todo: wait for the backend to provide the necessary fields in the prices parameter
export const ItemPrice = ({ _DATA }: any) => {
  return (
    <S.WrapperContent>
      <S.Headline>Price History</S.Headline>
      <S.Stroke />
      <Component.PriceChart data={_DATA} />
    </S.WrapperContent>
  );
};
