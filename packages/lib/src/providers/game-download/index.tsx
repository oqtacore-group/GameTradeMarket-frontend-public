import React, { useState, createContext, useContext } from 'react';
import { Modal } from '@game-trade/ui';
import { Download } from './download';

interface IGameDownload {
  tempData: any;
  handleSetTempData: (data: ITempDataDownload) => void;
  setShowWindow: (open: boolean) => void;
}

export interface ITempDataDownload {
  app_links?: any;
}

export const GameDownloadsContext = createContext<IGameDownload>({} as IGameDownload);
const Provider = GameDownloadsContext.Provider;
export const useGameDownloadsContext = () => useContext(GameDownloadsContext);

export const GameDownloadsProvider = ({ children }: any) => {
  const [isShowWindow, setShowWindow] = useState<boolean>(false);
  const [tempData, setTempData] = useState<ITempDataDownload>({});

  const onHideGameDownloadWindow = () => {
    setShowWindow(false);
    setTempData({});
  };

  const handleSetTempData = (data: ITempDataDownload) => setTempData(data);

  return (
    <Provider
      value={{
        tempData,
        handleSetTempData,
        setShowWindow,
      }}>
      {children}
      {isShowWindow && (
        <Modal
          isCloseOutside={true}
          onClose={onHideGameDownloadWindow}
          size={455}
          hasHeader={false}
          isPadding={false}>
          <Download />
        </Modal>
      )}
    </Provider>
  );
};
