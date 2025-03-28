import React, { useState, createContext, useContext } from 'react';
import { Modal } from '@game-trade/ui';
import { BuyCoin } from './buy-coin';
import { ValidateActiveWallet } from './validate-active-wallet';
import { CustomWalletConnectorProvider } from '@game-trade/lib';
import { GameCurrency } from '@game-trade/lib/src/codegen-types';
// import Index from 'next/image';
// import { EmptyTokenImageWrapper } from '@game-trade/ui/developer-post/style';
// import IconEmptyItemImageSvg from '@game-trade/app/public/imgs/icon_empty_item_image.svg';
// import moment from 'moment';

export enum WINDOW_TYPES_BUYING_COIN {
  BUY_COIN = 'BUY_COIN',
  VALIDATE_ACTIVE_WALLET = 'VALIDATE_ACTIVE_WALLET',
}

export interface ITempData {
  currency?: GameCurrency;
  gameCode?: string;
}

interface IBuyingCoin {
  tempData: ITempData;
  onHideBuyingCoinWindow: () => void;
  onShowBuyingCoinWindow: () => void;
  handleChangeWindowType: (type: WINDOW_TYPES_BUYING_COIN) => void;
  handleSetTempData: (data: any) => void;
}

const windowTypeMap = {
  [WINDOW_TYPES_BUYING_COIN.BUY_COIN]: (props: any) => <BuyCoin {...props} />,
  [WINDOW_TYPES_BUYING_COIN.VALIDATE_ACTIVE_WALLET]: (props: any) => (
    <ValidateActiveWallet {...props} />
  ),
};

export const BuyingCoinContext = createContext<IBuyingCoin>({} as IBuyingCoin);
const Provider = BuyingCoinContext.Provider;
export const useBuyingCoinContext = () => useContext(BuyingCoinContext);

export const BuyingCoinProvider = ({ children }: any) => {
  const [isShowWindow, setShowWindow] = useState<boolean>(false);
  const [tempData, setTempData] = useState<ITempData>({});
  const [windowType, setWindowType] = useState<WINDOW_TYPES_BUYING_COIN>(
    WINDOW_TYPES_BUYING_COIN.VALIDATE_ACTIVE_WALLET
  );

  const handleChangeWindowType = (type: WINDOW_TYPES_BUYING_COIN) => setWindowType(type);

  const onHideBuyingCoinWindow = () => {
    setShowWindow(false);
    setWindowType(WINDOW_TYPES_BUYING_COIN.VALIDATE_ACTIVE_WALLET);
  };

  const onShowBuyingCoinWindow = () => {
    setShowWindow(true);
  };

  const handleSetTempData = (data: ITempData) => setTempData(data);

  return (
    <Provider
      value={{
        tempData,
        onHideBuyingCoinWindow,
        onShowBuyingCoinWindow,
        handleChangeWindowType,
        handleSetTempData,
      }}>
      {children}
      {isShowWindow && (
        <Modal
          isCloseOutside={true}
          onClose={onHideBuyingCoinWindow}
          hasHeader={false}
          isPadding={false}>
          <CustomWalletConnectorProvider>
            {windowTypeMap[windowType]({ handleChangeWindowType })}
          </CustomWalletConnectorProvider>
        </Modal>
      )}
    </Provider>
  );
};
