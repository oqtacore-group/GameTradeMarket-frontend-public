import React, { useState, createContext, useContext } from 'react';
import { Modal } from '@game-trade/ui';
import { Alert } from './alert';
import { Error } from './error';
import { Success } from './success';
import { ViewNFTs } from './view-nfts';

export enum WINDOW_TYPES {
  ALERT = 'ALERT',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  VIEW_NFTS = 'VIEW_NFTS',
}

interface ILaunchpad {
  windowType: WINDOW_TYPES;
  onShowWindow: (type: WINDOW_TYPES) => void;
  onHideWindow: () => void;
  handleChangeGameCode: (code: string) => void;
  handleChangeCategoryGeopoly: (id: number) => void;
  getGameCode: string | undefined;
  categoryGeopoly: number | undefined;
  messageError?: string;
}

const windowTypeMap = {
  [WINDOW_TYPES.ALERT]: (props: any) => <Alert {...props} />,
  [WINDOW_TYPES.ERROR]: (props: any) => <Error {...props} />,
  [WINDOW_TYPES.SUCCESS]: (props: any) => <Success {...props} />,
  [WINDOW_TYPES.VIEW_NFTS]: (props: any) => <ViewNFTs {...props} />,
};

export const WindowLaunchpadContext = createContext<ILaunchpad>({} as ILaunchpad);
const Provider = WindowLaunchpadContext.Provider;
export const useWindowLaunchpadContext = () => useContext(WindowLaunchpadContext);

export const WindowLaunchpadProvider = ({ children }: any) => {
  const [isShowWindow, setShowWindow] = useState<boolean>(false);
  const [windowType, setWindowType] = useState<WINDOW_TYPES>(WINDOW_TYPES.ALERT);
  const [gameCode, setGameCode] = useState<string>();
  const [messageError, setMessageError] = useState<string>();
  const [categoryGeopoly, setCategoryGeopoly] = useState<number>();

  const onShowWindow = (type: WINDOW_TYPES) => {
    handleChangeWindowType(type);
    setShowWindow(true);
  };

  const onHideWindow = () => {
    setShowWindow(false);
  };

  const handleChangeWindowType = (type: WINDOW_TYPES, message?: string) => {
    setWindowType(type);
    if (message) setMessageError(message);
  };

  const handleChangeCategoryGeopoly = (id: number) => setCategoryGeopoly(id);

  const handleChangeGameCode = (code: string) => setGameCode(code);

  return (
    <Provider
      value={{
        windowType,
        getGameCode: gameCode,
        onShowWindow,
        onHideWindow,
        handleChangeGameCode,
        handleChangeCategoryGeopoly,
        categoryGeopoly,
      }}>
      {children}
      {isShowWindow && (
        <Modal
          isCloseOutside={true}
          onClose={onHideWindow}
          size={455}
          hasHeader={false}
          isPadding={false}>
          {windowTypeMap[windowType]({
            handleChangeWindowType,
            getGameCode: gameCode,
            onHideWindow,
            handleChangeCategoryGeopoly,
            categoryGeopoly,
            messageError,
          })}
        </Modal>
      )}
    </Provider>
  );
};
