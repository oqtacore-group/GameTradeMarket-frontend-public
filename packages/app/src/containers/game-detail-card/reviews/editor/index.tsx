import { SvgAvatarPerson } from '@game-trade/icons';
import {
  PillsRate,
  HeadlineRate,
  FormReview,
  MessageWrapper,
  PillsWrapper,
  ErrorRate,
  ErrorMessage,
  ButtonMobile,
} from './style';
import { Button, ControlledField } from '@game-trade/ui';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/containers/developers/write-to-us/style';
import { ReviewDto, useCreateReviewMutation } from '@game-trade/lib/codegen-types';
import { Form, FIELD_RATE, FIELD_FORM } from '../../interfaces';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';

export const EditorReview = ({
  image_url,
  nick_name,
  user_id,
  game_code,
  addReviews,
}: {
  image_url?: string | null;
  nick_name?: string;
  user_id: string;
  game_code: string;
  addReviews: (review: ReviewDto) => void;
}) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.reviews' });
  const isTablet = useMediaQuery('(max-width:900px)');
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<Form>();

  // const [messageSent, changeMessageSent] = useState(false);

  const [createReviewMutation, { loading, data }] = useCreateReviewMutation({
    fetchPolicy: 'no-cache',
  });

  const handleSubmitForm = (variables: Form) => {
    createReviewMutation({
      variables: { ...variables, rating: variables.rating + 1, user_id, game_code },
    });
  };

  useEffect(() => {
    if (data && data.createReview) {
      addReviews(data.createReview);
    }
  }, [data]);

  useEffect(() => {
    if ((loading && data) || data) {
      // changeMessageSent(true);
      reset();
    }
  }, [loading, data]);

  // if (messageSent)
  //   return (
  //     <HeadlineMessageSent>
  //       Message sent successfully{' '}
  //       <Button onClick={() => changeMessageSent(false)}>Submit new</Button>
  //     </HeadlineMessageSent>
  //   );

  return (
    <FormReview onSubmit={handleSubmit(handleSubmitForm)}>
      <MessageWrapper error={!!errors[FIELD_FORM.description]?.message}>
        {image_url ? (
          <img
            alt="user avatar"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#379fff',
              border: '1px solid #fff',
              flexShrink: '0',
              marginRight: '15px',
              objectFit: 'cover',
            }}
            src={image_url}
          />
        ) : (
          <SvgAvatarPerson width="30px" height="30px" style={{ marginRight: '20px' }} />
        )}

        <ControlledField
          name={FIELD_FORM.description}
          control={control}
          rules={{ required: t('write') }}>
          <Textarea
            placeholder={nick_name ? t('addReview') + ' ' + nick_name : ''}
            name={FIELD_FORM.description}
            rows={isTablet ? 2 : 1}
          />
        </ControlledField>

        {isTablet && <ButtonMobile type="submit">{t('post')}</ButtonMobile>}
        {!isTablet && <Button type="submit">{t('post')}</Button>}
      </MessageWrapper>

      {errors[FIELD_FORM.description] && (
        <ErrorMessage>{errors[FIELD_FORM.description]?.message}</ErrorMessage>
      )}

      <HeadlineRate>
        {errors[FIELD_FORM.rating] ? (
          <ErrorRate>{errors[FIELD_FORM.rating]?.message}</ErrorRate>
        ) : (
          t('rateGame')
        )}
      </HeadlineRate>

      <ControlledField
        name={FIELD_FORM.rating}
        control={control}
        rules={{ required: t('choiceRating') }}>
        <PillsWrapper>
          {(Object.keys(FIELD_RATE) as Array<keyof typeof FIELD_RATE>).map((key, index) => (
            <PillsRate
              key={key}
              error={!!errors[FIELD_FORM.rating]?.message}
              selected={getValues(FIELD_FORM.rating) === index}
              onClick={() => setValue(FIELD_FORM.rating, index, { shouldValidate: true })}>
              {t('rateNumber.' + FIELD_RATE[key])}
            </PillsRate>
          ))}
        </PillsWrapper>
      </ControlledField>
    </FormReview>
  );
};
