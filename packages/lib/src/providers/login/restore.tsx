import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SvgMail } from '@game-trade/icons';
import { Button, Input } from '@game-trade/ui';
import { useRestoreMutation } from '@game-trade/lib/src/codegen-types';
import { useLoginContext } from '@game-trade/lib';

import { FIELDS_CONFIG } from './utils';
import {
  FormErrors,
  ModalHeader,
  ModalLoginContent,
  ReflectText,
  RegisterButton,
  Row,
  TextInfo,
} from './style';
import { BaseInterface, FIELDS, VERIFY_STATE, WINDOW_TYPES } from './interfaces';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

type Form = {
  [FIELDS.Email]: string;
};

export const Restore = (props: BaseInterface) => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const [restoreMutation, { data, loading, error }] = useRestoreMutation();
  const { handleSetTempData } = useLoginContext();
  const [verifyState, setVerifyState] = useState<VERIFY_STATE | null>(null);

  useEffect(() => {
    if (data?.restore) {
      props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.RESET);
    }

    if (error) {
      setVerifyState(VERIFY_STATE.ERROR);
    }

    if (!data) {
      setVerifyState(null);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const handleSubmitForm = (data: any, event: any) => {
    const { email } = data;
    handleSetTempData({ email });
    restoreMutation({
      variables: {
        email,
      },
      fetchPolicy: 'no-cache',
    });
  };

  const handleMoveWindow = () => {
    props.handleChangeWindowType && props.handleChangeWindowType(WINDOW_TYPES.LOGIN);
  };

  return (
    <ModalLoginContent>
      <ModalHeader>
        <ReflectText data-text={t('modalWindow.restore.headline')}>
          <span>{t('modalWindow.restore.headline')}</span>
        </ReflectText>
      </ModalHeader>

      {!verifyState && (
        <>
          <Row>
            <TextInfo>{t('modalWindow.restore.description')}</TextInfo>
          </Row>

          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Row>
              <Input
                placeholder={t('modalWindow.restore.mail') || ''}
                type="email"
                prevIcon={<SvgMail size={16} />}
                {...register(FIELDS.Email, FIELDS_CONFIG[FIELDS.Email])}
              />
            </Row>
            <Row>
              {errors && !error && (
                <FormErrors>
                  {Object.values(errors).map((err) => (
                    <p key={err.message}>
                      {t(err.message as string) ? t(err.message as string) : err.message}
                    </p>
                  ))}
                </FormErrors>
              )}
              {error && (
                <FormErrors>
                  <p>{error.message}</p>
                </FormErrors>
              )}
            </Row>
            <Row>
              <Button dimension="l" type="submit" isShadow={true} isLoader={loading}>
                {t('modalWindow.restore.continue')}
              </Button>
            </Row>
          </form>
          <Row justifyContent={'center'} direction={'row'}>
            <RegisterButton onClick={handleMoveWindow}>
              {t('modalWindow.restore.receive')}
            </RegisterButton>
          </Row>
        </>
      )}
    </ModalLoginContent>
  );
};
