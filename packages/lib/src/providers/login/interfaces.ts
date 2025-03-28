export interface BaseInterface {
  forAdmin?: boolean;
  handleChangeWindowType?: (type: WINDOW_TYPES) => void;
}

export interface ITempData {
  email?: string;
  code?: string;
  restore?: boolean;
  verify?: boolean;
  afterBuy?: boolean;
}

export interface ILoginProviderValue {
  tempData: ITempData;
  windowType: WINDOW_TYPES;
  isShowLogin?: boolean;
  onShowLoginWindow: () => void;
  onHideLoginWindow: () => void;
  handleSetTempData: (data: ITempData) => void;
  onShowAfterBuying: () => void;
}

export enum VERIFY_STATE {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum WINDOW_TYPES {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  RESTORE = 'RESTORE',
  RESET = 'RESET',
  VERIFY = 'VERIFY',
}

export enum FIELDS {
  Email = 'email',
  Password = 'password',
  ConfirmPassword = 'confirmPassword',
  AcceptAgreement = 'acceptAgreement',
  Remember = 'remember',
  Code = 'code',
  PromoCode = 'promoCode',
}
