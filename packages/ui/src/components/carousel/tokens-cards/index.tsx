import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { TokenCard } from '../../nft-card/preview-card';
import { Card } from '@game-trade/lib/codegen-types';

import { PrevButton, NextButton } from './buttons';
import { Carousel, CarouselViewport, CarouselContainer, CarouselSlide } from './style';
import { useRouter } from 'next/router';

interface IProps {
  data?: Card[] | null;
  gameName?: string;
}

export const CarouselTokensCard = ({ data, gameName }: IProps) => {
  const { query, push } = useRouter();

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

  const refreshPage = async (blockchain: string, contract: string, value: string) => {
    await push(`/marketplace/token/${blockchain}/${contract}/${value}`, undefined, {
      scroll: true,
      shallow: false,
    });
  };

  return (
    <Carousel>
      <CarouselViewport ref={viewportRef}>
        <CarouselContainer>
          {gameName &&
            data?.map((item, index) => {
              return (
                <CarouselSlide
                  onClick={async () => {
                    if (!query?.tokenCardId) return;
                    await refreshPage(item.blockchain, item.contract, item.token_value);
                  }}
                  key={`${item.token_value}-${index}`}>
                  <TokenCard gameName={gameName} tokenCard={item} />
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
