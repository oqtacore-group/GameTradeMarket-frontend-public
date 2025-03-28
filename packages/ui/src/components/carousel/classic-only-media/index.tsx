import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, CarouselViewport, CarouselContainer, CarouselSlide } from './style';
import { NextButton, PrevButton } from './buttons';
import { ImageComponent } from '../../../modifiers/get-image-optimization';
import VideoPlayer from '../../../modifiers/get-video-player';
import { useMediaQuery } from 'react-responsive';

export interface ClassicSlide {
  src: any;
  alt?: string;
  video: boolean;
  poster?: any;
  youtube?: boolean;
  muted?: boolean;
  autoplay?: boolean;
}

export const ClassicCarouselOnlyMedia = ({ data }: { data: ClassicSlide[] }) => {
  if (!data) return <></>;
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: 'trimSnaps',
    loop: !isMobile,
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

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

  return (
    <Carousel>
      <CarouselViewport ref={viewportRef}>
        <CarouselContainer>
          {data.map((item: ClassicSlide, index: number) => {
            if (item.video) {
              return (
                <CarouselSlide key={item.alt + ' ' + index}>
                  <VideoPlayer
                    className={'videoWrapper'}
                    src={item.src}
                    poster={item.poster}
                    youtube={item.youtube}
                  />
                </CarouselSlide>
              );
            }
            return (
              <CarouselSlide key={item.alt + ' ' + index}>
                <ImageComponent
                  link={item.src}
                  alt={item.alt}
                  LCP={false}
                  objectFit={'contain'}
                  styleWrapper={{
                    // height: '260px',
                    width: '100%',
                    // position: 'initial',
                  }}
                />
              </CarouselSlide>
            );
          })}
        </CarouselContainer>
      </CarouselViewport>

      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </Carousel>
  );
};
