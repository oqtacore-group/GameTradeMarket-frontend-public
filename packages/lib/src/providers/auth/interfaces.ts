import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { User } from '@game-trade/lib/src/codegen-types';

export interface IAuthProviderValue {
  setToken: (token: string) => void;
  authProviderData: IProps;
  loginWithGoogleAction: (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => Promise<any>;
  getUserInfoAction: () => Promise<any>;
  logoutAction: (goToLanding?: boolean) => void;
  deleteUserAction: (id: string) => Promise<any>;
}

export interface IProps {
  isAuthenticated: boolean;
  token: string | null | undefined;
  errorLogin: string | null;
  userInfoData: User | null;
}
