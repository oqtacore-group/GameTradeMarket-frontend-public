import { FIELDS } from './interfaces';

export const PASSWORD_LOGIN = {
  [FIELDS.Password]: {
    required: 'errors.passwordFieldIsRequired',
    minLength: {
      value: 8,
      message: 'errors.passwordCannotBeLess',
    },
    maxLength: {
      value: 99,
      message: 'errors.passwordCannotExceed',
    },
    pattern: {
      value: /^\S*$/,
      message: 'errors.PasswordWillNotHaveSpaces',
    },
  },
};

export const FIELDS_CONFIG = {
  [FIELDS.Email]: {
    required: 'errors.emailFieldIsRequired',
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'errors.invalidEmail',
    },
    minLength: {
      value: 6,
      message: 'errors.invalidEmail',
    },
    maxLength: {
      value: 50,
      message: 'errors.invalidEmail',
    },
  },
  [FIELDS.Password]: {
    required: 'errors.passwordFieldIsRequired',
    minLength: {
      value: 8,
      message: 'errors.passwordCannotBeLess',
    },
    maxLength: {
      value: 99,
      message: 'errors.passwordCannotExceed',
    },
    pattern: {
      value: /^\S*$/,
      message: 'errors.PasswordWillNotHaveSpaces',
    },
  },
  [FIELDS.ConfirmPassword]: {
    required: true,
    minLength: {
      value: 8,
      message: 'errors.passwordCannotBeLess',
    },
    maxLength: {
      value: 99,
      message: 'errors.passwordCannotExceed',
    },
    pattern: {
      value: /^\S*$/,
      message: 'errors.PasswordWillNotHaveSpaces',
    },
  },
  [FIELDS.Code]: {
    required: true,
    minLength: {
      value: 6,
      message: 'errors.codeCannotBeLess',
    },
    maxLength: {
      value: 6,
      message: 'errors.codeCannotExceed',
    },
  },
  [FIELDS.PromoCode]: {
    required: false,
    minLength: {
      value: 8,
      message: 'errors.codeCannotBeLessThan8',
    },
    maxLength: {
      value: 8,
      message: 'errors.codeCannotExceed8',
    },
  },
  [FIELDS.AcceptAgreement]: {
    required: 'errors.pleaseAccept',
  },
};
