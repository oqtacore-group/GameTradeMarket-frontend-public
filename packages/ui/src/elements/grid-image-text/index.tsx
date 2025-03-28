import React from 'react';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { Item, ItemsWrapper, ItemWrapper, List } from './style';

export interface IContent {
  icon: any;
  title: string;
  description: string;
  list?: {
    title: string;
    points: string[];
    description: string;
  };
}

export const GridImageTextComponent = ({ items }: { items: IContent[] }) => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.features' });
  return (
    <ItemsWrapper>
      {items.map((item) => {
        return (
          <ItemWrapper key={item.title}>
            <Item>
              {item.icon}
              <h5>{t(item.title)}</h5>
              <p>{t(item.description)}</p>
            </Item>
            {item.list && (
              <List>
                <span>{t(item.list.title)}</span>
                <ul>
                  {item.list.points.map((point) => {
                    return <li key={point}>{t(point)}</li>;
                  })}
                </ul>
                <p>{t(item.list.description)}</p>
              </List>
            )}
          </ItemWrapper>
        );
      })}
    </ItemsWrapper>
  );
};
