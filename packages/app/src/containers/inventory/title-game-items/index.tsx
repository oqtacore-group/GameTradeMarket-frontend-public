import React from 'react';

import { TitleGameItemsWrapper, TitleGameName, TitleGameItemsCount } from './style';

interface IProps {
  gameName?: string;
  itemsCount?: number;
}

export const TitleGameItems = (props: IProps) => {
  const { gameName = '', itemsCount = 0 } = props;

  return (
    <TitleGameItemsWrapper>
      <TitleGameName>{gameName ? gameName : 'All games'}</TitleGameName>
      <TitleGameItemsCount>{`${itemsCount} items`}</TitleGameItemsCount>
    </TitleGameItemsWrapper>
  );
};
