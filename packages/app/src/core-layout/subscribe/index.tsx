import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Modal, Input } from '@game-trade/ui';
import { useSubscribeMutation } from '@game-trade/lib/src/codegen-types';

import { SubscribeStyled, SubscribeForm, Errors } from './style';

import { ModalContent } from '@/containers/developers/write-to-us/style';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

type Form = {
  k8bd2: string;
  email: string;
};

export const SubscribeComponent = () => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);
  const [subscribeMutation, { loading, data, error }] = useSubscribeMutation();

  useEffect(() => {
    data && data.subscribe && setSubscribeMessage(data?.subscribe?.message);
  }, [data]);

  const handleSubmitForm = (variables: Form) => {
    subscribeMutation({
      variables,
      fetchPolicy: 'no-cache',
    });
  };

  const handleCloseModal = () => {
    setSubscribeMessage(null);
    if (!error) {
      reset({
        email: '',
        k8bd2: '',
      });
    }
  };

  return (
    <SubscribeStyled>
      <SubscribeForm onSubmit={handleSubmit(handleSubmitForm)}>
        <input
          hidden={true}
          type="email"
          {...register('email')}
          id="email"
          placeholder={t('subscribe.placeholder') || ''}
        />
        <Input
          type="text"
          id="k8bd2"
          {...register('k8bd2', {
            required: true,
            minLength: 6,
            maxLength: 50,
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          placeholder={t('subscribe.placeholder') || ''}
        />
        &nbsp;&nbsp;
        <Button
          style={{ width: '150px', marginTop: '2px' }}
          type="submit"
          dimension="m"
          isShadow={false}
          isLoader={loading}
          appearance="secondary">
          {t('subscribe.button')}
        </Button>
      </SubscribeForm>
      {Object.entries(errors).length > 0 && (
        <Errors>
          {errors?.k8bd2?.type === 'required' && <p>This field is required</p>}
          {errors?.k8bd2?.type === 'maxLength' && <p>Email cannot exceed 20 characters</p>}
          {errors?.k8bd2?.type === 'minLength' && <p>Email cannot be less than 6 characters</p>}
          {errors?.k8bd2?.type === 'pattern' && <p>Email is not valid</p>}
        </Errors>
      )}

      {subscribeMessage && (
        <Modal onClose={handleCloseModal} hasHeader={false} isCloseOutside={true} isPadding={false}>
          <ModalContent>{subscribeMessage}</ModalContent>
        </Modal>
      )}
    </SubscribeStyled>
  );
};
