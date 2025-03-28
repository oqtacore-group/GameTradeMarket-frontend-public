import {
  SubHeadline,
  ButtonViewAll,
  CardsCarouselWrapper,
} from '@/containers/game-detail-card/style';
import { CarouselGameBlogPosts } from '@game-trade/ui';
import { useGameBlogPostsContext } from '@game-trade/lib';
import { WINDOW_TYPES } from '@game-trade/lib/providers/game-blog-post';
import { useGameCardBlogQuery } from '@game-trade/lib/codegen-types';
import { useTranslation } from 'next-i18next';

interface IProps {
  gameCode?: string;
}

export const ItemDevelopersBlog = ({ gameCode }: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation.blog' });
  const { onShowGameBlogPostsWindow, handleSetTempData, tempData } = useGameBlogPostsContext();

  const handleMoveViewAll = () => {
    onShowGameBlogPostsWindow(WINDOW_TYPES.VIEW_ALL);
    handleSetTempData({ ...tempData, posts: gameBlog });
  };

  const { data: getDataGameBlog } = useGameCardBlogQuery({
    variables: { code: gameCode as string },
    fetchPolicy: 'cache-and-network',
    returnPartialData: true,
  });

  const gameBlog = getDataGameBlog?.getBlogs;

  if (!gameBlog?.length) return <></>;

  return (
    <CardsCarouselWrapper>
      <h3>{t('title')}</h3>

      <SubHeadline>
        <p>{t('subTitle')}</p>
        <ButtonViewAll onClick={handleMoveViewAll}>{t('view')}</ButtonViewAll>
      </SubHeadline>

      {gameBlog && <CarouselGameBlogPosts posts={gameBlog} />}
    </CardsCarouselWrapper>
  );
};
