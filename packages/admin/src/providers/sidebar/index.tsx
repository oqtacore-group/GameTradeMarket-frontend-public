import { useState, createContext, useContext } from 'react';

import { ISidebarProviderValue } from './interfaces';

export const SidebarContext = createContext<ISidebarProviderValue>({} as ISidebarProviderValue);

const Provider = SidebarContext.Provider;

export const useSidebarContext = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }: any) => {
  const sidebarWidthExpanded = 230;

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const expandSidebar = () => setIsSidebarExpanded(true);
  const collapseSidebar = () => setIsSidebarExpanded(false);

  return (
    <Provider
      value={{
        sidebarWidthExpanded,
        isSidebarExpanded,
        expandSidebar,
        collapseSidebar,
      }}>
      {children}
    </Provider>
  );
};
