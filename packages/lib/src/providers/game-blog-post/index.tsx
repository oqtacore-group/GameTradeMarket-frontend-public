import React, { useState, createContext, useContext } from 'react';
import { Modal } from '@game-trade/ui';
import { ViewAll } from './view-all';
import { DetailPostId } from './detail-post-id';
import { BlogDto } from '@game-trade/lib/src/codegen-types';

export enum WINDOW_TYPES {
  VIEW_ALL = 'VIEW_ALL',
  POST_ID = 'POST_ID',
}

interface IGameBlogPost {
  tempData: any;
  windowType: WINDOW_TYPES;
  onShowGameBlogPostsWindow: (type: WINDOW_TYPES) => void;
  onHideGameBlogPostsWindow: () => void;
  handleSetTempData: (data: any) => void;
  setBackToWindowShowAll: (show: boolean) => void;
}

export interface ITempDataBuyCoin {
  post?: BlogDto;
  posts?: BlogDto[];
}

const windowTypeMap = {
  [WINDOW_TYPES.VIEW_ALL]: (props: any) => <ViewAll {...props} />,
  [WINDOW_TYPES.POST_ID]: (props: any) => <DetailPostId {...props} />,
};

export const GameBlogPostsContext = createContext<IGameBlogPost>({} as IGameBlogPost);
const Provider = GameBlogPostsContext.Provider;
export const useGameBlogPostsContext = () => useContext(GameBlogPostsContext);

export const GameBlogPostsProvider = ({ children }: any) => {
  const [isShowWindow, setShowWindow] = useState<boolean>(false);
  const [backToWindowShowAll, setBackToWindowShowAll] = useState<boolean>(false);
  const [tempData, setTempData] = useState<ITempDataBuyCoin>({});

  const [windowType, setWindowType] = useState<WINDOW_TYPES>(WINDOW_TYPES.VIEW_ALL);

  const onShowGameBlogPostsWindow = (type: WINDOW_TYPES) => {
    handleChangeWindowType(type);
    setShowWindow(true);
  };

  const onHideGameBlogPostsWindow = () => {
    if (backToWindowShowAll) {
      onShowGameBlogPostsWindow(WINDOW_TYPES.VIEW_ALL);
    } else {
      setShowWindow(false);
      setTempData({});
    }
  };

  const handleChangeWindowType = (type: WINDOW_TYPES) => setWindowType(type);

  const handleSetTempData = (data: ITempDataBuyCoin) => setTempData(data);

  return (
    <Provider
      value={{
        tempData,
        windowType,
        onShowGameBlogPostsWindow,
        onHideGameBlogPostsWindow,
        handleSetTempData,
        setBackToWindowShowAll,
      }}>
      {children}
      {isShowWindow && (
        <Modal
          isCloseOutside={true}
          onClose={onHideGameBlogPostsWindow}
          size={windowType === WINDOW_TYPES.VIEW_ALL ? 882 : 688}
          hasHeader={false}
          isPadding={false}>
          {windowTypeMap[windowType]({ handleChangeWindowType })}
        </Modal>
      )}
    </Provider>
  );
};
