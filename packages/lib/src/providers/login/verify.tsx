import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SvgError, SvgSuccess } from '@game-trade/icons';
import {
  Button,
  COLORS,
  VerificationCode,
  ControlledField,
  Loader,
  SIZE,
  ALIGN,
} from '@game-trade/ui';
import { useVerifyMutation } from '@game-trade/lib/src/codegen-types';

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
import { FIELDS_CONFIG } from './utils';

import { useLoginContext } from './index';
import { trackEventsPixel } from '@game-trade/lib/utils/track-metrics';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import { ButtonContent, StyledButton } from '@game-trade/ui/forms/button/style';

type Form = {
  [FIELDS.Code]: string;
};

export const Verify = (props: BaseInterface) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation.modalWindow.verify' });
  const { tempData } = useLoginContext();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();
  const [verifyMutation, { data, loading, error }] = useVerifyMutation();
  const [verifyState, setVerifyState] = useState<VERIFY_STATE | null>(null);

  useEffect(() => {
    if (data?.verify) {
      setVerifyState(VERIFY_STATE.SUCCESS);
    }

    if (error) {
      setVerifyState(VERIFY_STATE.ERROR);
      setValue(FIELDS.Code, '');
    }

    if (!data) {
      setVerifyState(null);
    }
  }, [data]);

  const handleSubmitForm = (data: any) => {
    const { code } = data;
    verifyMutation({
      variables: {
        code: Number(code),
        email: tempData.email || '',
      },
      fetchPolicy: 'no-cache',
    });

    trackEventsPixel('CompleteRegistration', {
      content_name: tempData.email,
      status: t('completed'),
    });
  };

  const handleMoveLogin = useCallback(() => {
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.LOGIN);
  }, []);

  const handleTryAgain = useCallback(() => {
    setVerifyState(null);
  }, []);

  const isCodeErrorValidate =
    errors?.code?.type === 'minLength' || errors?.code?.type === 'maxLength';

  return (
    <ModalLoginContent>
      {verifyState === VERIFY_STATE.SUCCESS && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('accountHasBeen')}>
              <span>{t('accountHasBeen')}</span>
            </ReflectText>
            <ReflectText data-text={t('successfully')}>
              <span>{t('successfully')}</span>
            </ReflectText>
          </ModalHeader>
          <RowIcon justifyContent={'center'} direction={'row'}>
            <SvgSuccess size={40} />
          </RowIcon>
          <Button dimension="l" isShadow={true} type="submit" onClick={handleMoveLogin}>
            {t('done')}
          </Button>
        </>
      )}
      {verifyState === VERIFY_STATE.ERROR && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('error')}>
              <span>{t('error')}</span>
            </ReflectText>
            <ReflectText data-text={t('pleaseTryAgain')}>
              <span>{t('pleaseTryAgain')}</span>
            </ReflectText>
          </ModalHeader>
          <RowIcon justifyContent={'center'} direction={'row'}>
            <SvgError size={40} color={COLORS.pink} />
          </RowIcon>
          <Button dimension="l" isShadow={true} type="submit" onClick={handleTryAgain}>
            {t('tryAgain')}
          </Button>
        </>
      )}
      {!verifyState && (
        <>
          <ModalHeader>
            <ReflectText data-text={t('signUp')}>
              <span>{t('signUp')}</span>
            </ReflectText>
          </ModalHeader>
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Row>
              <TextInfo>
                {t('enterCode')} <br /> {tempData?.email}
              </TextInfo>
            </Row>
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
              {isCodeErrorValidate && <FormErrors>{t('errorCodeMessage')}</FormErrors>}
              {error && <FormErrors>{t('invalid')}</FormErrors>}
            </Row>
            <Row>
              <StyledButton
                appearance="primary"
                dimension="l"
                type="submit"
                isShadow={true}
                id="sign-up"
                isLoader={loading}>
                {loading && <Loader size={SIZE.MINI} position={ALIGN.CENTER} />}
                {!loading && <ButtonContent id="sign-up">{t('verify')}</ButtonContent>}
              </StyledButton>
            </Row>
          </form>
        </>
      )}
    </ModalLoginContent>
  );
};
