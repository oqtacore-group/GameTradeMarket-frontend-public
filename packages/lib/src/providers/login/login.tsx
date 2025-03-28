import React, { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { GoogleLogin, GoogleLoginProps } from 'react-google-login';
import { SvgMail, SvgPassword, SvgGmail } from '@game-trade/icons';
import { Button, Checkbox, Input, COLORS } from '@game-trade/ui';
import { useLoginLazyQuery } from '@game-trade/lib/src/codegen-types';
import { useAuthContext, useLoginContext, clientId } from '@game-trade/lib';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { FIELDS_CONFIG, PASSWORD_LOGIN } from './utils';
import {
  ModalLoginContent,
  ModalHeader,
  OR,
  Row,
  ForGot,
  ButtonGoogleLogin,
  RegisterText,
  RegisterButton,
  FormErrors,
  ReflectText,
} from './style';
import { BaseInterface, FIELDS, ITempData, WINDOW_TYPES } from './interfaces';

type Form = {
  [FIELDS.Email]: string;
  [FIELDS.Password]: string;
  [FIELDS.Remember]: boolean;
};

export const Login = (props: BaseInterface & ITempData) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const { loginWithGoogleAction, setToken } = useAuthContext();
  const { onHideLoginWindow } = useLoginContext();
  const [loginLazyQuery, { data, loading, error }] = useLoginLazyQuery();
  const [, setFailGoogleLogin] = useState<any>(false);
  const [loaderGoogleLogin, setLoaderGoogleLogin] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>();

  const rememberField = useWatch({
    control,
    name: FIELDS.Remember,
  });

  useEffect(() => {
    if (data?.login) {
      setToken(`${data?.login?.token_type} ${data?.login?.token}`);
      onHideLoginWindow();
    }
  }, [data]);

  const handleSubmitForm = (data: any, _event: any) => {
    const { password, email } = data;

    loginLazyQuery({
      variables: {
        password,
        email,
      },
    });
  };

  const onError = (errors: any, e: any) => {
    console.error(errors, e);
  };

  const handleFailureGoogleLogin = (err: any) => {
    if (err.error === 'popup_closed_by_user') return;
    setFailGoogleLogin(err);
  };

  const handleLoginWithGoogle: GoogleLoginProps['onSuccess'] = async (response) => {
    console.warn(
      `%c LOGIN INFO handleLoginWithGoogle - %c: ${response}`,
      'background: coral; color: #333; padding: 5px',
      'background: #8ec3d7; color: #333; padding: 5px'
    );
    setLoaderGoogleLogin(true);
    loginWithGoogleAction(response).then((data: any) => {
      setLoaderGoogleLogin(false);
      if (data?.token) {
        onHideLoginWindow();
      }
    });
  };

  const handleMoveRegister = () =>
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.SIGNUP);

  const handleMoveRestore = () =>
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.RESTORE);

  return (
    <ModalLoginContent>
      <ModalHeader>
        <ReflectText
          data-text={!props.forAdmin ? t('modalWindow.logIn.headline') : 'Log in to GT Admin'}>
          {!props.forAdmin ? (
            <span>{t('modalWindow.logIn.headline')}</span>
          ) : (
            <span>Log in to GT Admin</span>
          )}
        </ReflectText>
      </ModalHeader>

      {/*disabled={Boolean(failGoogleLogin)}*/}
      <GoogleLogin
        render={(renderProps) => {
          return (
            <ButtonGoogleLogin onClick={renderProps.onClick}>
              <SvgGmail size={14} fill={COLORS.white} />
              &nbsp;&nbsp; {t('modalWindow.logIn.google')}
            </ButtonGoogleLogin>
          );
        }}
        isSignedIn={rememberField}
        clientId={clientId}
        cookiePolicy={'single_host_origin'}
        onSuccess={handleLoginWithGoogle}
        onFailure={handleFailureGoogleLogin}
      />

      <OR>{t('modalWindow.logIn.or')}</OR>

      <form onSubmit={handleSubmit(handleSubmitForm, onError)}>
        <Row>
          <Input
            placeholder={t('modalWindow.logIn.mail') || 'E-mail'}
            type="email"
            prevIcon={<SvgMail size={16} />}
            {...register(FIELDS.Email, FIELDS_CONFIG[FIELDS.Email])}
          />
        </Row>

        <Row>
          <Input
            prevIcon={<SvgPassword size={16} color={COLORS.blue} />}
            placeholder={t('modalWindow.logIn.password') || 'Password'}
            type="password"
            {...register(FIELDS.Password, PASSWORD_LOGIN[FIELDS.Password])}
          />
        </Row>

        {!props.forAdmin && (
          <Row direction="row">
            <Controller
              name={FIELDS.Remember}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox name="remember" onChange={field.onChange}>
                  {t('modalWindow.logIn.remember')}
                </Checkbox>
              )}
            />

            <ForGot onClick={handleMoveRestore}>{t('modalWindow.logIn.forgot')}</ForGot>
          </Row>
        )}

        <Row>
          {error?.graphQLErrors && (
            <FormErrors>
              {error?.graphQLErrors[0]?.message || t('modalWindow.logIn.errorPassword')}
            </FormErrors>
          )}

          {errors &&
            Object.values(errors).map((err) => (
              <FormErrors key={err.message}>
                {t(err.message as string) ? t(err.message as string) : err.message}
              </FormErrors>
            ))}
        </Row>

        <Row>
          <Button
            dimension="l"
            type="submit"
            isShadow={true}
            isLoader={loading || loaderGoogleLogin}>
            {t('modalWindow.logIn.logIn')}
          </Button>
        </Row>
      </form>

      {!props.forAdmin && (
        <Row justifyContent={'center'} direction={'row'}>
          <RegisterText>{t('modalWindow.logIn.haveAccount')}</RegisterText>
          <RegisterButton onClick={handleMoveRegister}>
            {t('modalWindow.logIn.register')}
          </RegisterButton>
        </Row>
      )}
    </ModalLoginContent>
  );
};
