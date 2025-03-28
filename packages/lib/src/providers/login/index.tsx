import React, { useState, createContext, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Modal } from '@game-trade/ui';

import { Login } from './login';
import { SignUp } from './sign-up';
import { Restore } from './restore';
import { ResetPasswordForm } from './reset';
import { Verify } from './verify';
import { WINDOW_TYPES, ILoginProviderValue, ITempData } from './interfaces';

const windowTypeMap = {
  [WINDOW_TYPES.LOGIN]: (props: any) => <Login {...props} />,
  [WINDOW_TYPES.SIGNUP]: (props: any) => <SignUp {...props} />,
  [WINDOW_TYPES.RESTORE]: (props: any) => <Restore {...props} />,
  [WINDOW_TYPES.RESET]: (props: any) => <ResetPasswordForm {...props} />,
  [WINDOW_TYPES.VERIFY]: (props: any) => <Verify {...props} />,
};

export const LoginContext = createContext<ILoginProviderValue>({} as ILoginProviderValue);
const Provider = LoginContext.Provider;
export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }: any) => {
  const { query } = useRouter();
  const { code, email, 'reset-password': restore } = query;

  // show the window if there are search parameters
  const [isShowLogin, setShowLogin] = useState<boolean>(false);
  const [tempData, setTempData] = useState<ITempData>({});
  const [isShowAfterBuying, setShowAfterBuying] = useState(false);

  /*
  Depending on the search parameters, show the appropriate step of authorization
  code && email === email verification window
  restore       === password recovery window
  empty         === starting screen for entering login and password for authorization
  * */
  const [windowType, setWindowType] = useState<WINDOW_TYPES>(WINDOW_TYPES.LOGIN);

  useEffect(() => {
    setWindowType(
      restore ? WINDOW_TYPES.RESET : code && email ? WINDOW_TYPES.VERIFY : WINDOW_TYPES.LOGIN
    );
    setShowLogin(Boolean(restore || (code && email)));
    handleSetTempData({ ...query });
  }, [query]);

  useEffect(() => {
    if (isShowAfterBuying) {
      setWindowType(WINDOW_TYPES.SIGNUP);
    }
  }, [isShowAfterBuying]);

  const onShowLoginWindow = () => {
    setShowLogin(true);
    setShowAfterBuying(false);
  };

  const onShowAfterBuying = () => {
    setShowAfterBuying(true);
  };

  const onHideLoginWindow = () => {
    setShowLogin(false);
  };

  const handleChangeWindowType = (type: WINDOW_TYPES) => setWindowType(type);

  const handleSetTempData = (data: ITempData) => setTempData(data);

  return (
    <Provider
      value={{
        tempData,
        windowType,
        onShowLoginWindow,
        onShowAfterBuying,
        onHideLoginWindow,
        handleSetTempData,
        isShowLogin,
      }}>
      {children}
      {isShowLogin && (
        <Modal
          isCloseOutside={true}
          onClose={onHideLoginWindow}
          size={455}
          hasHeader={false}
          isPadding={false}>
          {windowTypeMap[windowType]({ handleChangeWindowType, afterBuy: isShowAfterBuying })}
        </Modal>
      )}
    </Provider>
  );
};

export { Login };
