import {
  Avatar,
  AvatarAndMetadataWrapper,
  Date,
  Icons,
  Metadata,
  NameAndReviewsCountWrapper,
  ReviewContent,
  ReviewsCount,
  Review,
  Text,
  Username,
  DeleteMessage,
  Buttons,
  Warning,
  Content,
} from './style';
import { SvgAvatarPerson, SvgEdit, SvgTrash } from '@game-trade/icons';
import moment from 'moment';
import {
  ReviewDto,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} from '@game-trade/lib/codegen-types';
import {
  FIELD_FORM,
  FIELD_RATE,
  Form,
  HEADLINE_RATE,
} from '@/containers/game-detail-card/interfaces';
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/containers/developers/write-to-us/style';
import { Button, ControlledField } from '@game-trade/ui';
import { PillsRate, PillsWrapper } from '@/containers/game-detail-card/reviews/editor/style';
import { useForm } from 'react-hook-form';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'next-i18next';

export const ItemReview = ({
  review: data_review,
  // user_id,
  user_nick_name,
  setWrittenPost,
}: {
  review: ReviewDto;
  user_id?: string;
  user_nick_name?: string;
  setWrittenPost: (hide: boolean) => void;
}) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.reviews' });
  const isTablet = useMediaQuery('(max-width:900px)');
  const [review, setReview] = useState<ReviewDto>(data_review);
  const { description, author, create_time, id, rating } = review;

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    // reset,
    formState: { errors },
  } = useForm<Form>();

  useEffect(() => {
    setValue(FIELD_FORM.rating, Number(rating - 1));
    setValue(FIELD_FORM.description, description);
  }, []);

  const [messageEditing, handleMessageEditing] = useState(false);

  const [updateReviewMutation, { loading: update_loading, data: update_data }] =
    useUpdateReviewMutation({
      fetchPolicy: 'no-cache',
    });

  useEffect(() => {
    if (update_data && update_data?.updateReview) {
      setReview(update_data.updateReview);
    }
  }, [update_loading, update_data]);

  const handleSubmitForm = (variables: Form) => {
    updateReviewMutation({
      variables: {
        ...variables,
        [FIELD_FORM.rating]: variables[FIELD_FORM.rating] + 1,
        id: Number(id),
      },
    });
    handleMessageEditing(false);
  };

  const [deleteReviewMutation, { loading: delete_loading, data: delete_data }] =
    useDeleteReviewMutation({
      fetchPolicy: 'no-cache',
    });

  const [deleteExactly, setDeleteExactly] = useState(false);

  const deleteMessage = () => {
    // deleteReviews(id)
    setWrittenPost(false);
    deleteReviewMutation({ variables: { id: Number(id) } });
  };

  const [handleDeleteMessage, setHandleDeleteMessage] = useState(false);
  useEffect(() => {
    if (delete_loading || delete_data) {
      setHandleDeleteMessage(true);
    }
  }, [delete_loading, delete_data]);

  if (handleDeleteMessage) return <DeleteMessage>{t('delete')}</DeleteMessage>;

  if (deleteExactly)
    return (
      <Warning>
        <DeleteMessage>{t('wantDelete')}</DeleteMessage>
        <Buttons>
          <Button onClick={deleteMessage} type="submit">
            {t('yes')}
          </Button>
          <Button onClick={() => setDeleteExactly(false)} appearance={'ghost'}>
            {t('no')}
          </Button>
        </Buttons>
      </Warning>
    );

  return (
    <Review>
      <AvatarAndMetadataWrapper>
        {author.image_url ? (
          <Avatar src={author.image_url} />
        ) : (
          <SvgAvatarPerson width="47px" height="47px" style={{ marginRight: '20px' }} />
        )}

        <Metadata>
          <NameAndReviewsCountWrapper>
            <Username>{author.nick_name}</Username>

            {author.review_count > 0 ? (
              <ReviewsCount>
                {author.review_count} {author.review_count > 1 ? t('reviews') : t('review')}
              </ReviewsCount>
            ) : (
              t('noReviews')
            )}
          </NameAndReviewsCountWrapper>
        </Metadata>

        {isTablet && author.nick_name === user_nick_name && (
          <Icons>
            {!messageEditing && <SvgEdit onClick={() => handleMessageEditing(true)} />}
            <SvgTrash onClick={() => setDeleteExactly(true)} />
          </Icons>
        )}
      </AvatarAndMetadataWrapper>

      <ReviewContent>
        <Content>
          {!messageEditing && (
            <>
              <h3>
                {(Object.keys(HEADLINE_RATE) as Array<keyof typeof HEADLINE_RATE>).map(
                  (key, index) => {
                    if (index === rating - 1) {
                      return (
                        <div key={HEADLINE_RATE[key]}>{t('rateNumber.' + HEADLINE_RATE[key])}</div>
                      );
                    }
                  }
                )}
              </h3>

              <Date>
                {t('posted')} {moment(Number(create_time)).format('DD MMMM, YYYY')}
              </Date>

              <Text>{description}</Text>
            </>
          )}

          {messageEditing && !deleteExactly && (
            <form onSubmit={handleSubmit(handleSubmitForm)}>
              <ControlledField
                name={FIELD_FORM.description}
                control={control}
                rules={{ required: t('write') }}>
                <Textarea name={FIELD_FORM.description} rows={8} />
              </ControlledField>

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

              <Buttons>
                <Button type="submit">{t('save')}</Button>
                <Button onClick={() => handleMessageEditing(false)} appearance={'ghost'}>
                  {t('cancel')}
                </Button>
              </Buttons>
            </form>
          )}
        </Content>

        {!isTablet && author.nick_name === user_nick_name && (
          <Icons>
            {!messageEditing && <SvgEdit onClick={() => handleMessageEditing(true)} />}
            <SvgTrash onClick={() => setDeleteExactly(true)} />
          </Icons>
        )}
      </ReviewContent>
    </Review>
  );
};
