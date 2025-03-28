import React, { createContext, useContext, useState } from 'react';

import { IMenuProviderValue } from './interface';

export const MenuContext = createContext<IMenuProviderValue>({} as IMenuProviderValue);
const Provider = MenuContext.Provider;
export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: any) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  return <Provider value={{ openMenu, setOpenMenu }}>{children}</Provider>;
};
