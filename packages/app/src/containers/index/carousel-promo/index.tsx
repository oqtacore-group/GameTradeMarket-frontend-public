import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import { PrevButton, NextButton } from './buttons';
import {
  Carousel,
  CarouselViewport,
  CarouselContainer,
  CarouselSlide,
  ImageWrapper,
  ContentSlide,
  Title,
  ActionButton,
} from './style';
import { SubTitle } from '../style';
import Link from 'next/link';
import { SlideEntity } from '@game-trade/lib/codegen-types';
import { ImageComponent } from '@game-trade/ui/modifiers/get-image-optimization';

interface IProps {
  slides?: SlideEntity[];
}

export const CarouselPromo = ({ slides }: IProps) => {
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
          {slides &&
            slides?.map((item, index: number) => {
              return (
                <CarouselSlide key={index}>
                  <ImageComponent
                    link={item.image_url}
                    alt={item.title}
                    LCP={true}
                    styleWrapper={ImageWrapper}
                  />
                  <ContentSlide>
                    <Title data-text={item.title}>{item.title}</Title>
                    <SubTitle>{item.subtitle}</SubTitle>
                    {item.meta &&
                      item.meta.buttons?.length &&
                      item.meta.buttons?.map((button) => {
                        return (
                          <Link key={button?.link} href={button?.link as string}>
                            <ActionButton>{button?.text as string}</ActionButton>
                          </Link>
                        );
                      })}
                  </ContentSlide>
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
