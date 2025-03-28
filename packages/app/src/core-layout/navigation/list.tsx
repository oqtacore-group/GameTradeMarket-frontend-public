import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import { List } from './style';
import { Item } from './item';
import { getMenuItems } from './utils';

interface IProps {
  userId?: string;
  customUrl?: string;
  isAuthenticated?: boolean;
  isMenu?: boolean;
  setOpen?: (open: boolean) => void;
}

export const Navigation = ({
  isAuthenticated,
  isMenu = false,
  setOpen,
  userId,
  customUrl,
}: IProps) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const menuItems = getMenuItems(isAuthenticated, isMenu, isMobile, userId, customUrl);

  return (
    <List isMobile={isMobile}>
      {menuItems.map((item: any, index) => (
        <Item onClick={() => setOpen && setOpen(false)} key={index} {...item} />
      ))}
    </List>
  );
};
