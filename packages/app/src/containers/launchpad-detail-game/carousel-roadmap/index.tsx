import { ItemCarouselRoadmap } from './item';
import {
  Wrapper,
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  ProgressLine,
} from './style';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { NextButton, PrevButton } from './buttons';
import { useMediaQuery } from 'react-responsive';

export interface IRoadmapItem {
  quarter: string;
  date: string;
  list: {
    completed: boolean;
    value: string;
  }[];
}

export const CarouselRoadmap = ({ items }: { items: IRoadmapItem[] | undefined }) => {
  if (!items) return <></>;
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    console.log('embla.canScrollNext()', embla);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <Wrapper>
      <Carousel>
        <ProgressLine />
        <CarouselViewport ref={viewportRef}>
          <CarouselContainer>
            {items.map((item, index) => {
              return (
                <CarouselSlide key={item.quarter + index}>
                  <ItemCarouselRoadmap item={item} />
                </CarouselSlide>
              );
            })}
            {isTablet ? '' : <CarouselSlide />}
          </CarouselContainer>
        </CarouselViewport>

        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
      </Carousel>
    </Wrapper>
  );
};
