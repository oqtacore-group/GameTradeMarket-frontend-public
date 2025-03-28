import React, { useEffect, useState } from 'react';
// import { useSwipeable } from 'react-swipeable';

import { PrevButton, NextButton } from './buttons';
import {
  CarouselWrapper,
  CarouselSlide,
  CarouselSlideContent,
  CarouselContainer,
  CarouselViewport,
  NextButtonWrapper,
  PrevButtonWrapper,
} from './style';
import { GameCardSlideHomePage } from '../game-card-slide-home-page';
import { GameCard } from '@game-trade/lib/codegen-types';
import { PaginationDots } from '../../pagination/pagination-dots';

interface IProps {
  dataSlides: GameCard[];
}

interface ISlide {
  state: string;
  element: any;
  index: number;
}

// react-carousel-3d
const slidesCarousel = (slides: GameCard[]) => {
  return slides?.map((item: GameCard, index: number) => {
    return (
      <CarouselSlide key={index + '_' + Math.random()}>
        <CarouselSlideContent>
          <GameCardSlideHomePage gameCard={item} />
        </CarouselSlideContent>
      </CarouselSlide>
    );
  });
};

export const GameCardCarouselHomePage = ({ dataSlides }: IProps) => {
  const [prepareSlidesToHtml, setPrepareSlidesToHtml] = useState<JSX.Element[] | undefined>();
  const [slideTotal, setSlideTotal] = useState(0);
  const [slideCurrent, setSlideCurrent] = useState(-1);
  const [slides, setSlides] = useState<ISlide[]>();

  useEffect(() => {
    if (dataSlides.length) setPrepareSlidesToHtml(slidesCarousel(dataSlides));
  }, [dataSlides]);

  useEffect(() => {
    const localSlides: ISlide[] = [];
    if (!prepareSlidesToHtml) return;
    const _prepareSlidesToHtml = [...prepareSlidesToHtml];

    _prepareSlidesToHtml.forEach((slide: any, index) => {
      const slideObject = {
        state: 'nextHidden',
        index,
        element: {
          ...slide,
          props: {
            ...slide?.props,
            nextHidden: true,
            prevHidden: false,
            nextActive: false,
            prevActive: false,
            active: false,
          },
        },
      };
      localSlides.push(slideObject);
    });

    setSlides(localSlides);
    setSlideTotal(localSlides.length - 1);
    setSlideCurrent(-1);
  }, [prepareSlidesToHtml]);

  useEffect(() => {
    if (slideCurrent === -1) {
      setTimeout(() => {
        slideRight();
      }, 1500);
    }
  }, [slides]);

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => slideRight(),
  //   onSwipedRight: () => slideLeft(),
  //   touchEventOptions: { passive: true },
  //   trackMouse: true,
  // });

  const changeStateSlide = (
    slide: ISlide,
    prevActiveSlide: ISlide,
    activeSlide: ISlide,
    nextActiveSlide: ISlide,
    index: number
  ) => {
    let _slide = slide;

    if (slide.index === prevActiveSlide?.index) {
      _slide = {
        state: 'prevActive',
        index,
        element: {
          ...prevActiveSlide?.element,
          props: {
            ...prevActiveSlide?.element?.props,
            active: false,
            prevActive: true,
            nextActive: false,
            nextHidden: false,
            prevHidden: false,
          },
        },
      };
    }

    if (slide.index === activeSlide?.index) {
      _slide = {
        state: 'active',
        index,
        element: {
          ...activeSlide?.element,
          props: {
            ...activeSlide?.element?.props,
            active: true,
            nextActive: false,
            prevActive: false,
            nextHidden: false,
            prevHidden: false,
          },
        },
      };
    }

    if (slide.index === nextActiveSlide?.index) {
      _slide = {
        state: 'nextActive',
        index,
        element: {
          ...nextActiveSlide?.element,
          props: {
            ...nextActiveSlide?.element?.props,
            nextActive: true,
            prevActive: false,
            active: false,
            nextHidden: false,
            prevHidden: false,
          },
        },
      };
    }
    return _slide;
  };

  const slideRight = (dotIndex?: any) => {
    if (!slides) return;
    let prevActiveSlide: ISlide;
    let nextActiveSlide: ISlide;
    let activeSlide: ISlide;
    let slideCurrentLocal = typeof dotIndex === 'number' ? dotIndex : slideCurrent;
    let _slides = [...slides];
    const localSlides: ISlide[] = [];

    if (slideTotal > 1) {
      if (typeof dotIndex === 'number') {
        _slides = _slides.map((item, index) => {
          return {
            state: 'nextHidden',
            index,
            element: {
              ...item?.element,
              props: {
                ...item?.element?.props,
                nextHidden: true,
                prevHidden: false,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        });
      }

      if (slideCurrentLocal < slideTotal) {
        slideCurrentLocal++;
      } else {
        slideCurrentLocal = 0;
      }

      if (slideCurrentLocal > 0) {
        prevActiveSlide = _slides[slideCurrentLocal - 1];
      } else {
        prevActiveSlide = _slides[slideTotal];
      }

      activeSlide = _slides[slideCurrentLocal];

      if (slideCurrentLocal < slideTotal) {
        nextActiveSlide = _slides[slideCurrentLocal + 1];
      } else {
        nextActiveSlide = _slides[0];
      }

      _slides.forEach((slide, index) => {
        let _slide = slide;
        if (slide.state === 'prevHidden') {
          _slide = {
            state: 'nextHidden',
            index,
            element: {
              ...slide?.element,
              props: {
                ...slide?.element?.props,
                nextHidden: true,
                prevHidden: false,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        }
        if (slide.state === 'prevActive') {
          _slide = {
            state: 'prevHidden',
            index,
            element: {
              ...slide?.element,
              props: {
                ...slide?.element?.props,
                prevHidden: true,
                nextHidden: false,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        }

        _slide = changeStateSlide(_slide, prevActiveSlide, activeSlide, nextActiveSlide, index);

        localSlides.push(_slide);
      });

      setSlides(localSlides);
      setSlideCurrent(slideCurrentLocal);
    } else if (_slides[0] && _slides[0].state !== 'active') {
      _slides[0] = {
        state: 'active',
        index: _slides[0]?.index,
        element: {
          ..._slides[0]?.element,
          props: {
            ..._slides[0]?.element?.props,
            active: true,
            nextActive: false,
            prevActive: false,
          },
        },
      } as ISlide;
      setSlides(_slides);
      setSlideCurrent(0);
    }
  };

  const slideLeft = (dotIndex?: any) => {
    if (!slides) return;
    if (slideTotal > 1) {
      let prevActiveSlide: ISlide;
      let nextActiveSlide: ISlide;
      let slideCurrentLocal = typeof dotIndex === 'number' ? dotIndex : slideCurrent;
      let _slides = [...slides];
      const localSlides: ISlide[] = [];

      if (typeof dotIndex === 'number') {
        _slides = _slides.map((item, index) => {
          return {
            state: 'nextHidden',
            index,
            element: {
              ...item?.element,
              props: {
                ...item?.element?.props,
                nextHidden: true,
                prevHidden: false,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        });
      }

      if (slideCurrentLocal > 0) {
        slideCurrentLocal--;
      } else {
        slideCurrentLocal = slideTotal;
      }

      const activeSlide: ISlide = _slides[slideCurrentLocal];

      if (slideCurrentLocal < slideTotal) {
        nextActiveSlide = _slides[slideCurrentLocal + 1];
      } else {
        nextActiveSlide = _slides[0];
      }

      if (slideCurrentLocal > 0) {
        prevActiveSlide = _slides[slideCurrentLocal - 1];
      } else {
        prevActiveSlide = _slides[slideTotal];
      }

      _slides.forEach((slide, index) => {
        let _slide = slide;
        if (slide.state === 'nextHidden') {
          _slide = {
            state: 'prevHidden',
            index,
            element: {
              ...slide?.element,
              props: {
                ...slide?.element?.props,
                nextHidden: false,
                prevHidden: true,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        }

        if (slide.state === 'nextActive') {
          _slide = {
            state: 'nextHidden',
            index,
            element: {
              ...slide?.element,
              props: {
                ...slide?.element?.props,
                prevHidden: false,
                nextHidden: true,
                active: false,
                nextActive: false,
                prevActive: false,
              },
            },
          };
        }

        _slide = changeStateSlide(_slide, prevActiveSlide, activeSlide, nextActiveSlide, index);

        localSlides.push(_slide);
      });

      setSlides(localSlides);
      setSlideCurrent(slideCurrentLocal);
    }
  };

  // console.log('slides', slides, slideCurrent);

  return (
    <>
      <CarouselWrapper>
        {/*{...handlers}*/}
        <CarouselContainer>
          <CarouselViewport>
            {slides?.length && slides.map((slide) => slide.element)}
          </CarouselViewport>
        </CarouselContainer>
        <PrevButtonWrapper onClick={slideLeft}>
          <PrevButton enabled={true} />
        </PrevButtonWrapper>
        <NextButtonWrapper onClick={slideRight}>
          <NextButton enabled={true} />
        </NextButtonWrapper>
      </CarouselWrapper>
      {slides?.length && slides?.length > 3 && (
        <PaginationDots
          setSlideCurrent={setSlideCurrent}
          activeSlide={slideCurrent}
          slideLeft={slideLeft}
          slideRight={slideRight}
          dots={slides?.length}
        />
      )}
    </>
  );
};
