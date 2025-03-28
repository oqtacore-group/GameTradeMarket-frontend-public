import React from 'react';

import { useMenuContext } from '../menu/provider';

import { BurgerIcon } from './burger';
import { Hamburger } from './style';

export const NavigationMobile = () => {
  const { setOpenMenu } = useMenuContext();

  return (
    <Hamburger>
      <BurgerIcon onClick={() => setOpenMenu(true)} />
    </Hamburger>
  );
};
