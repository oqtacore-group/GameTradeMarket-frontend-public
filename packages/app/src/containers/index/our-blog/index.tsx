import { Title, Browse } from '../style';
import { OurBlogWrapper, Header, Content, PaginationWrapper, BlogCardsWrapper } from './style';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogCard } from '@game-trade/ui/components/blog/preview-card';
import { PaginationNew } from '@game-trade/ui';
import { useMediaQuery } from 'react-responsive';
import { useGetMarketBlogsQuery } from '@game-trade/lib/codegen-types';
import { useTranslation } from 'next-i18next';

export const OurBlog = () => {
  const { t } = useTranslation('homePage', { keyPrefix: 'translation' });
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const browse = 'https://blog.gametrade.market/';
  const offset = isTablet ? 1 : 3;

  const { data: dataOurBlogPosts } = useGetMarketBlogsQuery({
    fetchPolicy: 'no-cache',
  });

  const blogPosts = dataOurBlogPosts?.getMarketBlogs;

  useEffect(() => {
    if (blogPosts) {
      setTotal(blogPosts?.length);
    }
  }, [blogPosts]);

  const onChangePage = (_page: any) => {
    setPage(_page);
  };

  if (!blogPosts?.length) return <></>;

  return (
    <OurBlogWrapper>
      <Header>
        <Title data-text={t('ourBlog')}>{t('ourBlog')}</Title>
        {browse && (
          <Browse>
            <Link href={browse}>
              <a target="_blank" rel="noreferrer">
                {t('browseMore')}
              </a>
            </Link>
          </Browse>
        )}
      </Header>
      <Content>
        <BlogCardsWrapper>
          {blogPosts?.slice(page * offset - offset, page * offset).map((post, index) => {
            const animation = blogPosts?.slice(page * offset - offset, page * offset).length === 3;
            if (post && post?.is_published) {
              return <BlogCard animation={animation} post={post} key={index + post.create_time} />;
            }
          })}
        </BlogCardsWrapper>
        <PaginationWrapper>
          <PaginationNew
            offsetStep={offset}
            total={Number(total)}
            page={page}
            onPageChange={onChangePage}
            showButton={false}
          />
        </PaginationWrapper>
      </Content>
    </OurBlogWrapper>
  );
};
