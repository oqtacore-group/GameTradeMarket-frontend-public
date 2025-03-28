import { useEffect, useState } from 'react';

import { useAuthContext } from '@game-trade/lib';
// import { useAddReviewMutation, useRemoveReviewMutation } from '@game-trade/lib/src/codegen-types';

import { ReviewsContent, Headline, WrapperReviews } from './style';
import { ReviewDto, useGetReviewsQuery } from '@game-trade/lib/codegen-types';
import { ItemReview } from './item-review';
import { EditorReview } from './editor';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameCode?: string;
}

export const Reviews = ({ gameCode }: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.reviews' });
  const {
    authProviderData: { userInfoData, isAuthenticated },
  } = useAuthContext();

  const { data: dataReviews } = useGetReviewsQuery({
    variables: {
      code: gameCode,
    },
  });

  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [writtenPost, setWrittenPost] = useState(false);

  useEffect(() => {
    if (!userInfoData && dataReviews?.getReviews) {
      setReviews(dataReviews.getReviews);
    }
  }, [dataReviews, userInfoData]);

  const sortingReviews = (data: ReviewDto[]) => {
    if (data?.length) {
      const reviewForSort = [...data];

      if (userInfoData?.nick_name) {
        reviewForSort.sort((firstItem) => {
          if (firstItem.author.nick_name === userInfoData.nick_name) {
            return -1;
          }
          return 1;
        });
      }

      setReviews(reviewForSort);

      if (data.find((item) => item.author.nick_name === userInfoData?.nick_name))
        setWrittenPost(true);
    }
  };

  useEffect(() => {
    if (dataReviews && dataReviews.getReviews?.length && userInfoData)
      sortingReviews(dataReviews.getReviews);
  }, [dataReviews, userInfoData]);

  const handleReviews = (message: ReviewDto) => {
    //   const foundItem = reviews?.find((item) => item.id === message.id);
    // if (foundItem) {
    //   console.log('foundItem', foundItem);
    // } else {
    const updateReview = [message, ...reviews];
    sortingReviews(updateReview);
    // }
  };

  if (!reviews?.length && !isAuthenticated) return <></>;

  return (
    <ReviewsContent>
      <Headline>
        {t('title')} <small>{t('subTitle')}</small>
      </Headline>
      <WrapperReviews>
        {isAuthenticated && userInfoData?.id && !writtenPost && gameCode && (
          <EditorReview
            image_url={userInfoData?.image_url}
            user_id={userInfoData?.id}
            nick_name={userInfoData?.nick_name}
            game_code={gameCode}
            addReviews={handleReviews}
          />
        )}

        {reviews?.length ? (
          reviews?.map((review: ReviewDto) => (
            <ItemReview
              key={JSON.stringify(review)}
              review={review}
              user_id={userInfoData?.id}
              user_nick_name={userInfoData?.nick_name}
              setWrittenPost={setWrittenPost}
            />
          ))
        ) : (
          <p>{t('noReviews')}</p>
        )}
      </WrapperReviews>
    </ReviewsContent>
  );
};
