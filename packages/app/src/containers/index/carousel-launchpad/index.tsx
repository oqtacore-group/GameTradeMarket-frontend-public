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
  ImageContainer,
  Date,
  Items,
  PriceItemsWrapper,
  BlockchainWrapper,
  StartInWrapper,
  Time,
} from './style';
import Link from 'next/link';
import { COLORS, ImageComponent, PriceComponent } from '@game-trade/ui';
import { BlockchainIconComponent } from '@game-trade/ui/modifiers/get-blockchain-icon-and-text';
import { useGameCardsMintQuery } from '@game-trade/lib/codegen-types';
import moment from 'moment';
import { showRemainingTime } from './helpers/helper';

// interface IProps {
//   slides?: SlideEntity[];
// }

export const CarouselLaunchpad = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: 1,
    skipSnaps: false,
    containScroll: 'trimSnaps',
  });

  const { data: getGameCardsMint } = useGameCardsMintQuery({
    variables: {},
    fetchPolicy: 'no-cache',
    returnPartialData: true,
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
    <>
      {getGameCardsMint?.gameCardsMint && (
        <Carousel>
          <CarouselViewport ref={viewportRef}>
            <CarouselContainer>
              {getGameCardsMint?.gameCardsMint.map((item, index) => (
                <CarouselSlide key={index}>
                  <ImageContainer>
                    <Date>{moment(item.start_mint).format('DD MMMM')}</Date>
                    <ImageComponent
                      link={item.media.find((item) => item.type === 'image')?.link || ''}
                      alt={item.title || ''}
                      LCP={true}
                      styleWrapper={ImageWrapper}
                    />
                  </ImageContainer>
                  <ContentSlide>
                    <Title data-text={item.title || ''}>{item.title || ''}</Title>
                    <PriceItemsWrapper>
                      <PriceComponent
                        fontSize={'16px'}
                        minWidthUSDT={1}
                        colorUSDT={COLORS.gray}
                        price={item.start_price?.split(' ')[0]}
                        usdPrice={
                          Number(
                            (Number(item.start_price.split(' ')[0]) * item.usd_price).toFixed(2)
                          ) || 0
                        }
                        isGame={true}
                        blockchain={item?.blockchain}
                      />
                      <Items>{item.amount_items} items</Items>
                    </PriceItemsWrapper>
                    <BlockchainWrapper>
                      Blockchain:{' '}
                      <BlockchainIconComponent blockchain={item.blockchain || ''} text={true} />
                    </BlockchainWrapper>
                    <Link href={'/launchpad/' + item.title}>
                      <ActionButton>Explore</ActionButton>
                    </Link>
                    {showRemainingTime(
                      moment(item.start_mint).format('YYYY-MM-DD'),
                      moment(item.start_mint).format('HH'),
                      moment(item.start_mint).format('MM')
                    ) ? (
                      <StartInWrapper>
                        Start in:
                        <Time>
                          {showRemainingTime(
                            moment(item.start_mint).format('YYYY-MM-DD'),
                            moment(item.start_mint).format('HH'),
                            moment(item.start_mint).format('MM')
                          )}
                        </Time>
                      </StartInWrapper>
                    ) : (
                      <StartInWrapper>
                        <Time>Mint started</Time>
                      </StartInWrapper>
                    )}
                  </ContentSlide>
                </CarouselSlide>
              ))}
            </CarouselContainer>
          </CarouselViewport>

          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </Carousel>
      )}
    </>
  );
};
