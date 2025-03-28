import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PaginationNew } from '../../pagination/pagination-new';
import { GameBlogPost } from '../../blog/developer-post';

import { PrevButton, NextButton } from './buttons';
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  CarouselWrapper,
  PaginationWrapper,
} from './style';
// import { useRouter } from 'next/router';
import { useGameBlogPostsContext, WINDOW_TYPES } from '@game-trade/lib';
import { BlogDto } from '@game-trade/lib/codegen-types';
import useMediaQuery from '@mui/material/useMediaQuery';

export const CarouselGameBlogPosts = ({ posts }: { posts: BlogDto[] }) => {
  if (!posts) return <></>;
  const isTablet = useMediaQuery('(max-width:900px)');
  const { onShowGameBlogPostsWindow, handleSetTempData, tempData } = useGameBlogPostsContext();
  const SLIDE_COUNT = isTablet ? 1 : 6;

  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: SLIDE_COUNT,
    skipSnaps: false,
    containScroll: 'trimSnaps',
    draggable: false,
  });

  const [page, setPage] = useState(1);

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const total = Math.ceil(posts?.length / SLIDE_COUNT);

  const emblaScrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const emblaScrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  const onChangePage = (page: number) => {
    setPage(page);

    if (embla) {
      embla.scrollTo(page - 1, true);
    }
  };

  const scrollPrev = () => {
    emblaScrollPrev();
    setPage(page - 1);
  };

  const scrollNext = () => {
    emblaScrollNext();
    setPage(page + 1);
  };

  const handleOpenGameBlogPost = (post: BlogDto) => {
    onShowGameBlogPostsWindow(WINDOW_TYPES.POST_ID);
    handleSetTempData({ ...tempData, post });
  };

  return (
    <CarouselWrapper>
      <Carousel>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <CarouselViewport ref={viewportRef}>
          <CarouselContainer>
            {posts.map((post: any, i: number) => {
              return (
                <CarouselSlide
                  key={`${post.id}-${i}`}
                  onClick={() => handleOpenGameBlogPost(post)}
                  size={SLIDE_COUNT}>
                  <GameBlogPost post={post} />
                </CarouselSlide>
              );
            })}
          </CarouselContainer>
        </CarouselViewport>
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </Carousel>
      <PaginationWrapper>
        <PaginationNew
          offsetStep={1}
          total={total || 0}
          page={page}
          onPageChange={onChangePage}
          showButton={false}
          isHideArrow={true}
        />
      </PaginationWrapper>
    </CarouselWrapper>
  );
};
