import React, { useState, createContext, useContext, useCallback, useEffect } from 'react';
import Router from 'next/router';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import {
  TokenDocument,
  UserInfoDocument,
  DeleteUserDocument,
  User,
  UserInfoQuery,
  DeleteUserMutation,
  DeleteUserMutationVariables,
  RefreshDocument,
} from '@game-trade/lib/src/codegen-types';
import {
  api,
  setLink,
  GlobalEventEmitter,
  routes,
  logout,
  resetAuthLocalStorage,
} from '@game-trade/lib';

import { IAuthProviderValue, IProps } from './interfaces';
import { getPromoCode } from '@game-trade/lib/utils/promo-code';
import { getReferralUrl } from '@game-trade/lib/utils/referral-url';

export const AuthContext = createContext<IAuthProviderValue>({} as IAuthProviderValue);
const Provider = AuthContext.Provider;
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
  const [props, setProps] = useState<IProps>({
    isAuthenticated: typeof window !== 'undefined' ? Boolean(localStorage.getItem('token')) : false,
    token: null,
    errorLogin: null,
    userInfoData: null,
  });

  useEffect(() => {
    const listener401 = async () => {
      await logout401Action();
    };

    const listenerRefresh403 = async () => {
      await refreshAction();
    };
    GlobalEventEmitter.on('logout401', listener401);
    GlobalEventEmitter.on('refresh403', listenerRefresh403);

    return () => {
      GlobalEventEmitter.off('logout401', listener401);
      GlobalEventEmitter.off('refresh403', listenerRefresh403);
    };
  }, []);

  const setToken = (token: string | undefined) => {
    if (typeof window !== 'undefined' && token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    // Set ApolloClient link
    setLink(token);

    setProps({
      ...props,
      token: token,
      isAuthenticated: true,
    });

    console.info(
      `%c AUTH INFO - %c: ${token}`,
      'background: coral; color: #333; padding: 5px',
      'background: #8ec3d7; color: #333; padding: 5px'
    );
  };

  const loginWithGoogleAction = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    const referrerLink = getReferralUrl();
    const invitedBy = getPromoCode();

    if (!('profileObj' in response)) {
      console.info(
        `%c APP INFO profileObj - %c: ${response}`,
        'background: coral; color: #333; padding: 5px',
        'background: #8ec3d7; color: #333; padding: 5px'
      );
      return;
    }

    const { data, errors } = await api.mutate({
      mutation: TokenDocument,
      variables: { token: response.tokenId, referrerLink, invitedBy },
      fetchPolicy: 'no-cache',
    });

    if (data?.token.token) {
      setToken(`${data?.token?.token_type} ${data?.token?.token}`);
    }

    if (errors) {
      setProps({
        ...props,
        token: null,
        isAuthenticated: false,
      });
    }

    return data;
  };

  const getUserInfoAction = useCallback(async () => {
    if (!props.isAuthenticated) {
      console.info(
        `%c APP isAuthenticated - %c: ${false}, please login`,
        'background: coral; color: #333; padding: 5px',
        'background: #8ec3d7; color: #333; padding: 5px'
      );
      return;
    }

    const { data } = await api.query<UserInfoQuery>({
      query: UserInfoDocument,
      fetchPolicy: 'no-cache',
    });

    if (data?.me) {
      setProps({
        ...props,
        userInfoData: data && data.me ? ({ ...data.me } as User) : null,
      });
    }
  }, [props.isAuthenticated]);

  const refreshAction = async () => {
    const { data, errors } = await api.mutate({
      mutation: RefreshDocument,
      fetchPolicy: 'no-cache',
    });

    if (data?.refresh.token) {
      setToken(`${data?.refresh?.token_type} ${data?.refresh?.token}`);

      if (typeof window !== 'undefined') {
        location.reload();
      }
    }
    if (errors) {
      setProps({
        ...props,
        token: null,
        isAuthenticated: false,
      });
    }
  };

  const logout401Action = async () => {
    setProps({
      ...props,
      token: null,
      userInfoData: null,
      isAuthenticated: false,
    });
    await logout();
  };

  const logoutAction = async () => {
    resetAuthLocalStorage();

    setProps({
      ...props,
      token: null,
      userInfoData: null,
      isAuthenticated: false,
    });

    await api.clearStore();
    Router.push(`${routes.home}?login=true`);
  };

  const deleteUserAction = async (id: string) => {
    try {
      if (!props.isAuthenticated) {
        console.info(
          `%c APP isAuthenticated - %c: ${false}, please login`,
          'background: coral; color: #333; padding: 5px',
          'background: #8ec3d7; color: #333; padding: 5px'
        );
        return;
      }

      const { data, errors } = await api.mutate<DeleteUserMutation, DeleteUserMutationVariables>({
        mutation: DeleteUserDocument,
        variables: { id },
        fetchPolicy: 'no-cache',
      });

      if (data?.deleteUser) {
        await logoutAction();
        console.warn(data.deleteUser.message);
      }

      if (errors) {
        console.warn(errors[0].message);
      }
    } catch (e) {
      console.warn('deleteUserAction', e);
    }
  };

  return (
    <Provider
      value={{
        setToken,
        loginWithGoogleAction,
        getUserInfoAction,
        logoutAction,
        deleteUserAction,
        authProviderData: props,
      }}>
      {children}
    </Provider>
  );
};
