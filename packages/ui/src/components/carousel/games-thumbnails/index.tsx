import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { PrevButton, NextButton } from './buttons';
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  ImageWrapper,
  OverlayImage,
} from './style';
import { MediaLink } from '@game-trade/lib/codegen-types';
import VideoPlayer from '../../../modifiers/get-video-player';
import { IPicture } from '@game-trade/app/src/containers/game-detail-card/item-content/media-content';
import { ImageComponent } from '../../../modifiers/get-image-optimization';

interface IProps {
  data?: IPicture[];
  gameName?: string;
  logo: string;
  setPicture: (picture: MediaLink) => void;
}

export const CarouselGamesThumbnails = ({ data, setPicture, logo }: IProps) => {
  if (!data) return <></>;
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
          {data.map((item, index: number) => {
            return (
              <CarouselSlide key={index} onClick={() => setPicture(item)}>
                <ImageWrapper selected={item.selected}>
                  <OverlayImage />
                  {item.type === 'image' ? (
                    <ImageComponent
                      link={item.link}
                      LCP={false}
                      setImage={setPicture}
                      styleWrapper={{ position: 'initial' }}
                    />
                  ) : (
                    <VideoPlayer className={'videoSlideWrapper'} src={item.link} poster={logo} />
                  )}
                </ImageWrapper>
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
