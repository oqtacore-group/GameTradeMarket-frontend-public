import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SvgMail, SvgPeople } from '@game-trade/icons';
import { Button, Input, Modal, COLORS, ControlledField } from '@game-trade/ui';
import { useWriteToUsMutation } from '@game-trade/lib/src/codegen-types';

// change

import {
  Title,
  FormSubscribe,
  CardWriteToUs,
  Block,
  Row,
  Textarea,
  Text,
  Errors,
  ModalContent,
} from './style';

type Form = {
  k8bd2: string;
  name: string;
  email: string;
  text: string;
};

export const WriteToUs = () => {
  const [writeToUsMessage, setWriteToUsMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const [writeToUsMutation, { loading, data, error }] = useWriteToUsMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    data && data.writeToUs && setWriteToUsMessage(data.writeToUs.message);
  }, [data]);

  const handleSubmitForm = (variables: Form) => {
    writeToUsMutation({
      variables,
    });
  };

  const handleCloseModal = () => {
    setWriteToUsMessage(null);
    if (error?.graphQLErrors) {
      reset({
        name: '',
        email: '',
        k8bd2: '',
        text: '',
      });
    }
  };

  return (
    <>
      <CardWriteToUs>
        <Title data-text="Write to us">
          <span>Write to us</span>
        </Title>
        <Text>
          Interested in selling your game items through our platform, using it as a white label or
          holding various events for your community with GameTrade? Get in touch with us!{' '}
        </Text>
        <FormSubscribe onSubmit={handleSubmit(handleSubmitForm)}>
          <Block>
            <ControlledField
              name="name"
              control={control}
              rules={{ required: true, minLength: 3, maxLength: 50 }}>
              <Input
                type="text"
                prevIcon={<SvgPeople size={16} color={COLORS.blue} />}
                id="name"
                placeholder="Your name"
              />
            </ControlledField>
          </Block>
          <Block>
            <input
              hidden={true}
              type="email"
              {...register('email')}
              id="email"
              placeholder="E-mail address"
            />
            <ControlledField
              name="k8bd2"
              control={control}
              rules={{
                required: true,
                minLength: 2,
                maxLength: 50,
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}>
              <Input
                prevIcon={<SvgMail size={16} />}
                type="text"
                id="k8bd2"
                placeholder="E-mail address"
              />
            </ControlledField>
          </Block>
          <Block>
            <ControlledField name="text" control={control} rules={{ required: true }}>
              <Textarea placeholder="Message" name="comment" rows={8} />
            </ControlledField>
          </Block>

          <Errors>
            {errors?.k8bd2?.type === 'required' && <p>The email field is required</p>}
            {errors?.k8bd2?.type === 'maxLength' && <p>Email cannot exceed 20 characters</p>}
            {errors?.k8bd2?.type === 'minLength' && <p>Email cannot be less than 6 characters</p>}
            {errors?.k8bd2?.type === 'pattern' && <p>Email is not valid</p>}

            {errors?.name?.type === 'required' && <p>The Name field is required</p>}
            {errors?.name?.type === 'maxLength' && <p>Name cannot exceed 20 characters</p>}
            {errors?.name?.type === 'minLength' && <p>Name cannot be less than 2 characters</p>}
          </Errors>

          <Row justifyContent="flex-end" direction="row">
            <Button type="submit" dimension="m" isLoader={loading} style={{ width: '150px' }}>
              Send
            </Button>
          </Row>
        </FormSubscribe>
      </CardWriteToUs>
      {writeToUsMessage && (
        <Modal onClose={handleCloseModal} hasHeader={false} isCloseOutside={true} isPadding={false}>
          <ModalContent>{writeToUsMessage}</ModalContent>
        </Modal>
      )}
    </>
  );
};
