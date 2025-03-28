import React from 'react';

import { List } from './style';
import { Item } from './item';

import { IPerson } from './index';

export const Persons = ({ data }: { data: IPerson[] }) => {
  return (
    <List>
      {data.map((item: IPerson, index: number) => (
        <Item key={index} {...item} />
      ))}
    </List>
  );
};
