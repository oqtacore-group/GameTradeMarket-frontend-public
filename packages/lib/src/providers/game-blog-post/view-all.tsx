import React from 'react';
import {
  ModalHeader,
  ModalContent,
  Title,
  SubTitle,
  GameBlogPostWrapper,
  PostsWrapper,
} from './style';
import { useGameBlogPostsContext, WINDOW_TYPES } from '@game-trade/lib';
import { GameBlogPost } from '@game-trade/ui';
import { BlogDto } from '@game-trade/lib/src/codegen-types';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export const ViewAll = () => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation.developer' });
  const { tempData, onShowGameBlogPostsWindow, handleSetTempData, setBackToWindowShowAll } =
    useGameBlogPostsContext();
  const { posts } = tempData;

  const handleOpenGameBlogPost = (post: BlogDto) => {
    onShowGameBlogPostsWindow(WINDOW_TYPES.POST_ID);
    handleSetTempData({ ...tempData, post });

    setBackToWindowShowAll(true);
  };

  setBackToWindowShowAll(false);

  return (
    <ModalContent padding={true}>
      <ModalHeader padding={true}>
        <Title>{t('title')}</Title>
        <SubTitle>{t('subTitle')}</SubTitle>
      </ModalHeader>
      <PostsWrapper>
        {posts?.map((post: any, i: number) => {
          return (
            <GameBlogPostWrapper
              onClick={() => handleOpenGameBlogPost(post)}
              key={`${post.id}-${i}`}>
              <GameBlogPost post={post} />
            </GameBlogPostWrapper>
          );
        })}
      </PostsWrapper>
    </ModalContent>
  );
};
