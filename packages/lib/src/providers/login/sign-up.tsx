import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { GoogleLogin, GoogleLoginProps } from 'react-google-login';
import { SvgGmail, SvgMail, SvgPassword } from '@game-trade/icons';
import { Button, Checkbox, Input, COLORS } from '@game-trade/ui';
import { useSignUpMutation } from '@game-trade/lib/src/codegen-types';
import {
  useAuthContext,
  useLoginContext,
  clientId,
  routes,
  trackEventsPixel,
  getReferralUrl,
  getPromoCode,
  resetPromoCode,
} from '@game-trade/lib';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { FIELDS_CONFIG } from './utils';
import {
  ButtonGoogleLogin,
  FormErrors,
  ModalHeader,
  ModalLoginContent,
  OR,
  ReflectText,
  RegisterButton,
  RegisterText,
  Row,
  TextInfo,
  PromoCodeText,
  TimeToShow,
} from './style';
import { BaseInterface, FIELDS, ITempData, WINDOW_TYPES } from './interfaces';

type Form = {
  [FIELDS.Email]: string;
  [FIELDS.Password]: string;
  [FIELDS.PromoCode]: string;
  [FIELDS.AcceptAgreement]: boolean;
};

export const SignUp = (props: BaseInterface & ITempData) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const [signUp, { data, loading, error }] = useSignUpMutation();
  const { loginWithGoogleAction } = useAuthContext();
  const { onHideLoginWindow, handleSetTempData, tempData } = useLoginContext();
  const [failGoogleLogin, setFailGoogleLogin] = useState<any>(false);
  const [loaderGoogleLogin, setLoaderGoogleLogin] = useState(false);
  const [promoCode, setPromoCode] = useState<string | undefined>(getPromoCode());
  const { afterBuy } = props;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Form>();

  useEffect(() => {
    if (
      error?.graphQLErrors &&
      error?.graphQLErrors[0] &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (error?.graphQLErrors[0]?.code as string) === 'PROMO_CODE_DOES_NOT_EXISTS'
    ) {
      setPromoCode('');
      resetPromoCode('');
    }
    // if(errors)
  }, [error]);

  const handleSubmitForm = (data: any) => {
    const { password, email, promoCode } = data;
    const referrerLink = getReferralUrl();
    signUp({
      variables: {
        password,
        email,
        invitedBy: promoCode ? promoCode : getPromoCode(),
        referrerLink,
      },
      fetchPolicy: 'no-cache',
    });
    handleSetTempData({ email });
    trackEventsPixel('CompleteRegistration', {
      content_name: email,
      status: 'Data entered. Getting a verification code',
    });
  };

  const handleMoveLogin = () => {
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.LOGIN);
  };

  const handleMoveVerify = () => {
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.VERIFY);
  };

  const handleLoginWithGoogle: GoogleLoginProps['onSuccess'] = async (response) => {
    setLoaderGoogleLogin(true);
    loginWithGoogleAction(response).then((data: any) => {
      setLoaderGoogleLogin(false);
      if (data?.token) {
        onHideLoginWindow();
      }
    });
  };

  const handleFailureGoogleLogin = (err: any) => {
    setFailGoogleLogin(err);
  };

  return (
    <ModalLoginContent>
      <ModalHeader>
        <ReflectText data-text={t('modalWindow.signUp.headline')}>
          <span>{t('modalWindow.signUp.headline')}</span>
        </ReflectText>
      </ModalHeader>

      {data?.signup && (
        <>
          <Row>
            <TextInfo>
              {t('modalWindow.signUp.sentCode.part_1')} {tempData?.email}{' '}
              {t('modalWindow.signUp.sentCode.part_2')}
            </TextInfo>
          </Row>
          <Button dimension="l" isShadow={true} onClick={handleMoveVerify}>
            {t('modalWindow.signUp.continue')}
          </Button>
        </>
      )}

      {afterBuy && (
        <TimeToShow>And now it's time to show off the token in your profile!</TimeToShow>
      )}

      {(!data?.signup || error?.graphQLErrors) && (
        <>
          <GoogleLogin
            render={(renderProps) => (
              <ButtonGoogleLogin onClick={renderProps.onClick} disabled={Boolean(failGoogleLogin)}>
                <SvgGmail size={14} fill={COLORS.white} />
                &nbsp;&nbsp; {t('modalWindow.signUp.google')}
              </ButtonGoogleLogin>
            )}
            clientId={clientId}
            cookiePolicy={'single_host_origin'}
            onSuccess={handleLoginWithGoogle}
            onFailure={handleFailureGoogleLogin}
          />

          <OR>{t('modalWindow.signUp.or')}</OR>

          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Row>
              <Input
                placeholder={t('modalWindow.signUp.mail') || 'E-mail'}
                type="email"
                prevIcon={<SvgMail size={16} />}
                {...register(FIELDS.Email, FIELDS_CONFIG[FIELDS.Email])}
              />
            </Row>
            <Row>
              <Input
                prevIcon={<SvgPassword size={16} color={COLORS.blue} />}
                placeholder={t('modalWindow.signUp.password') || 'Password'}
                type="password"
                {...register(FIELDS.Password, FIELDS_CONFIG[FIELDS.Password])}
              />
            </Row>
            <Row direction="row">
              <Controller
                name={FIELDS.AcceptAgreement}
                control={control}
                rules={FIELDS_CONFIG[FIELDS.AcceptAgreement]}
                defaultValue={false}
                render={({ field }) => (
                  <Checkbox name="acceptAgreement" onChange={field.onChange}>
                    {t('modalWindow.signUp.accept')}{' '}
                    <a target="_blank" href={routes.terms} rel="noreferrer">
                      {t('modalWindow.signUp.agreement')}
                    </a>
                  </Checkbox>
                )}
              />
            </Row>
            <Row>
              {errors &&
                Object.values(errors).map((err) => (
                  <FormErrors key={err.message}>
                    {t(err.message as string) ? t(err.message as string) : err.message}
                  </FormErrors>
                ))}

              {error?.graphQLErrors && <FormErrors>{error?.graphQLErrors[0].message}</FormErrors>}
            </Row>
            <Row>
              {promoCode && <PromoCodeText>{t('modalWindow.signUp.code')}</PromoCodeText>}
              <Input
                placeholder={t('modalWindow.signUp.code') || 'code'}
                type="text"
                value={promoCode}
                disabled={Boolean(promoCode)}
                {...register(FIELDS.PromoCode, FIELDS_CONFIG[FIELDS.PromoCode])}
              />
            </Row>
            <Row>
              <Button
                dimension="l"
                type="submit"
                isShadow={true}
                isLoader={loading || loaderGoogleLogin}>
                {t('modalWindow.signUp.signUp')}
              </Button>
            </Row>
          </form>
          <Row justifyContent={'center'} direction={'row'}>
            <RegisterText>{t('modalWindow.signUp.member')}</RegisterText>
            <RegisterButton onClick={handleMoveLogin}>
              {t('modalWindow.signUp.logIn')}
            </RegisterButton>
          </Row>
        </>
      )}
    </ModalLoginContent>
  );
};
