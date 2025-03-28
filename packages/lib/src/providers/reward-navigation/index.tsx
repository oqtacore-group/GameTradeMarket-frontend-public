import React, { useState, createContext, useContext } from 'react';
import { Modal } from '@game-trade/ui';
import { Rules } from './rules';
import { About } from './about';
import { BlogDto } from '@game-trade/lib/src/codegen-types';

export enum WINDOW_TYPES {
  RULES = 'RULES',
  ABOUT = 'ABOUT',
  TUTORIAL = 'TUTORIAL',
}

interface IRewardNavigation {
  onShowRewardsNavigationWindow: (type: WINDOW_TYPES) => void;
}

export interface ITempData {
  post?: BlogDto;
  posts?: BlogDto[];
}

const windowTypeMap = {
  [WINDOW_TYPES.RULES]: (props: any) => <Rules {...props} />,
  [WINDOW_TYPES.ABOUT]: (props: any) => <About {...props} />,
  [WINDOW_TYPES.TUTORIAL]: (props: any) => <About {...props} />,
};

export const RewardNavigationContext = createContext<IRewardNavigation>({} as IRewardNavigation);
const Provider = RewardNavigationContext.Provider;
export const useRewardNavigationContext = () => useContext(RewardNavigationContext);

export const RewardNavigationProvider = ({ children }: any) => {
  const [isShowWindow, setShowWindow] = useState<boolean>(false);

  const [windowType, setWindowType] = useState<WINDOW_TYPES>(WINDOW_TYPES.RULES);

  const onShowRewardsNavigationWindow = (type: WINDOW_TYPES) => {
    handleChangeWindowType(type);
    setShowWindow(true);
  };

  const onHideRewardNavigationWindow = () => {
    onShowRewardsNavigationWindow(WINDOW_TYPES.RULES);
    setShowWindow(false);
  };

  const handleChangeWindowType = (type: WINDOW_TYPES) => setWindowType(type);

  return (
    <Provider
      value={{
        onShowRewardsNavigationWindow,
      }}>
      {children}
      {isShowWindow && (
        <Modal
          isCloseOutside={true}
          onClose={onHideRewardNavigationWindow}
          size={960}
          hasHeader={false}
          isPadding={false}>
          {windowTypeMap[windowType]({ handleChangeWindowType })}
        </Modal>
      )}
    </Provider>
  );
};
