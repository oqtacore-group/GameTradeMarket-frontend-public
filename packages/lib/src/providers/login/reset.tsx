import React, { useCallback, useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { SvgPassword, SvgError, SvgSuccess } from '@game-trade/icons';
import { Button, Input, VerificationCode, ControlledField, COLORS } from '@game-trade/ui';
import { useResetMutation } from '@game-trade/lib/src/codegen-types';
import { useLoginContext } from '@game-trade/lib';

import { FIELDS_CONFIG } from './utils';
import {
  FormErrors,
  ModalHeader,
  ModalLoginContent,
  ReflectText,
  Row,
  RowIcon,
  TextInfo,
} from './style';
import { BaseInterface, FIELDS, VERIFY_STATE, WINDOW_TYPES } from './interfaces';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

type Form = {
  [FIELDS.Code]: string;
  [FIELDS.Password]: string;
  [FIELDS.ConfirmPassword]: string;
};

export const ResetPasswordForm = (props: BaseInterface) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const { tempData } = useLoginContext();
  const [resetMutation, { data, loading, error }] = useResetMutation();
  const [verifyState, setVerifyState] = useState<VERIFY_STATE | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      [FIELDS.Code]: tempData?.code || '',
    },
  });

  useEffect(() => {
    if (data?.reset) {
      setVerifyState(VERIFY_STATE.SUCCESS);
    }

    if (error) {
      setVerifyState(VERIFY_STATE.ERROR);
      setValue(FIELDS.Password, '');
      setValue(FIELDS.ConfirmPassword, '');
    }

    if (!data) {
      setVerifyState(null);
    }
  }, [data]);

  const password = useWatch({
    control,
    name: FIELDS.Password,
  });

  const password_second = useWatch({
    control,
    name: FIELDS.ConfirmPassword,
  });

  const handleSubmitForm = (data: any) => {
    const { password, code } = data;
    if (password === password_second) {
      resetMutation({
        variables: {
          email: tempData?.email || '',
          password,
          code: Number(code),
        },
        fetchPolicy: 'no-cache',
      });
    }
  };

  const handleMoveLogin = useCallback(() => {
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.LOGIN);
  }, []);

  const handleTryAgain = useCallback(() => {
    setVerifyState(null);
  }, []);

  const isPasswordMismatch = password !== password_second;

  const isCodeErrorValidate =
    errors?.code?.type === 'minLength' || errors?.code?.type === 'maxLength';

  return (
    <ModalLoginContent>
      {verifyState === VERIFY_STATE.SUCCESS && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('modalWindow.reset.thePassword')}>
              <span>{t('modalWindow.reset.thePassword')}</span>
            </ReflectText>
            <ReflectText data-text={t('modalWindow.reset.beenReset')}>
              <span>{t('modalWindow.reset.beenReset')}</span>
            </ReflectText>
          </ModalHeader>
          <Row>
            <TextInfo>{t('modalWindow.reset.nowUse')}</TextInfo>
          </Row>
          <RowIcon justifyContent={'center'} direction={'row'}>
            <SvgSuccess size={40} />
          </RowIcon>
          <Button dimension="l" isShadow={true} type="submit" onClick={handleMoveLogin}>
            {t('modalWindow.reset.done')}
          </Button>
        </>
      )}

      {verifyState === VERIFY_STATE.ERROR && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('modalWindow.reset.yourPassword')}>
              <span>{t('modalWindow.reset.yourPassword')}</span>
            </ReflectText>
            <ReflectText data-text={t('modalWindow.reset.notBeenReset')}>
              <span>{t('modalWindow.reset.notBeenReset')}</span>
            </ReflectText>
          </ModalHeader>
          <Row>
            <TextInfo>{t('modalWindow.reset.errorTryAgain')}</TextInfo>
          </Row>
          <RowIcon justifyContent={'center'} direction={'row'}>
            <SvgError size={40} color={COLORS.pink} />
          </RowIcon>
          <Button dimension="l" isShadow={true} type="submit" onClick={handleTryAgain}>
            {t('modalWindow.reset.tryAgain')}
          </Button>
        </>
      )}

      {!verifyState && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('modalWindow.reset.restorePassword')}>
              <span>{t('modalWindow.reset.restorePassword')}</span>
            </ReflectText>
          </ModalHeader>
          <Row>
            <TextInfo>
              {t('modalWindow.reset.enterCode')} <br />
              {tempData?.email}
            </TextInfo>
          </Row>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Row>
              <ControlledField
                control={control}
                name={FIELDS.Code}
                formDefaultValues={{
                  [FIELDS.Code]: tempData?.code || '',
                }}
                rules={FIELDS_CONFIG[FIELDS.Code]}>
                <VerificationCode autoFocus={true} />
              </ControlledField>
            </Row>
            <Row>
              <TextInfo isWarning={true}>
                {t('modalWindow.reset.eightCharacters')} <br />
                {t('modalWindow.reset.matchMail')}
              </TextInfo>
            </Row>
            <Row>
              <Input
                prevIcon={<SvgPassword size={16} color={COLORS.blue} />}
                placeholder={t('modalWindow.reset.newPassword') || ''}
                type="text"
                {...register(FIELDS.Password, FIELDS_CONFIG[FIELDS.Password])}
              />
            </Row>
            <Row>
              <Input
                prevIcon={<SvgPassword size={16} color={COLORS.blue} />}
                placeholder={t('modalWindow.reset.confirmPassword') || ''}
                type="text"
                {...register(FIELDS.ConfirmPassword, FIELDS_CONFIG[FIELDS.ConfirmPassword])}
              />
            </Row>
            <Row>
              {isPasswordMismatch && (
                <FormErrors>{t('modalWindow.reset.passwordMismatch')}</FormErrors>
              )}
              {isCodeErrorValidate && <FormErrors>{t('modalWindow.reset.codeCannot')}</FormErrors>}
              {errors?.password && (
                <FormErrors>
                  {t('modalWindow.reset.firstPassword')}: {t(errors.password.message as any)}
                </FormErrors>
              )}
              {errors?.confirmPassword?.message && (
                <FormErrors>
                  {t('modalWindow.reset.secondPassword')}:{' '}
                  {t(errors.confirmPassword.message as any)}
                </FormErrors>
              )}
              {error?.graphQLErrors && <FormErrors>{error?.graphQLErrors[0].message}</FormErrors>}
            </Row>
            <Row>
              <Button dimension="l" type="submit" isShadow={true} isLoader={loading}>
                {t('modalWindow.reset.restorePassword')}
              </Button>
            </Row>
          </form>
        </>
      )}
    </ModalLoginContent>
  );
};
