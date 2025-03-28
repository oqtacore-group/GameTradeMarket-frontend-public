import React, { createContext, useContext } from 'react';
import { useLoopbackLazyQuery } from '@game-trade/lib/src/codegen-types';

import { ILogsProviderValue } from './interfaces';

export const LogsContext = createContext<ILogsProviderValue>({} as ILogsProviderValue);
const Provider = LogsContext.Provider;
export const useLogsContext = () => useContext(LogsContext);

export const LogsProvider = ({ children }: any) => {
  const [loopbackQuery, { data: logData, loading: logLoading }] = useLoopbackLazyQuery({
    fetchPolicy: 'no-cache',
  });
  return <Provider value={{ loopbackQuery, logData, logLoading }}>{children}</Provider>;
};
