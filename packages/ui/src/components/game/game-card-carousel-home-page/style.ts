import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles';
import { NextBtn, PrevBtn } from './buttons/style';
import { GameCardWrapper, ActionButton } from '../game-card-slide-home-page/style';

export const CarouselWrapper = styled.div`
  // react-3d-carousel - static
  position: relative;
  //padding: 0 25px;
  width: 100%;
  height: 320px;
`;

export const CarouselContainer = styled.div`
  // slider-container - static

  //display: flex;
  //width: 100%;
  //user-select: none;

  position: absolute;
  left: 50%;
  top: 0;
  width: 100%;
  height: 100%;
  margin: -0px auto 0px -50%;
`;

export const CarouselViewport = styled.div`
  // slider-content - static

  position: relative;
  top: 0;
  left: 50%;
  width: 450px;
  height: 100%;
  transform: translateX(-50%);

  @media (max-width: 600px) {
    width: 350px;
  }
`;

export const CarouselSlideContent = styled.div`
  // slider-single-content - dynamic
`;

export const CarouselSlide = styled.div<{
  nextHidden?: boolean;
  nextActive?: boolean;
  prevActive?: boolean;
  prevHidden?: boolean;
  active?: boolean;
}>`
  position: absolute;
  z-index: 0;
  left: 0;
  top: 0;
  width: 460px;
  transition: z-index 0ms;
  //transition: z-index 0ms calc(500ms / 2);

  @media (max-width: 600px) {
    width: 350px;
  }

  ${CarouselSlideContent} {
    display: flex;
    justify-content: center;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    transition: 500ms cubic-bezier(0.17, 0.67, 0.55, 1.3);
    transform: scale(0);
    opacity: 0;
  }

  ${({ prevHidden }) =>
    prevHidden &&
    css`
      ${CarouselSlideContent} {
        transform: translateX(50%) scale(0);
      }
    `}

  ${({ prevActive }) =>
    prevActive &&
    css`
      z-index: 1;
      ${CarouselSlideContent} {
        //border: 1px solid orange;
        opacity: 1;
        transform: translateX(-55%) scale(0.9);

        @media (max-width: 1280px) {
          transform: translateX(-25%) scale(0.9);
        }

        @media (max-width: 980px) {
          transform: translateX(-10%) scale(0.9);
        }

        @media (max-width: 600px) {
          transform: translateX(0%) scale(0.9);
        }
      }

      ${GameCardWrapper} {
        background-image: linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            black calc(50% - 1px),
            black calc(50% + 0.5px),
            ${COLORS.darkBg} calc(25% + 1px)
          ),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
        background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
        background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
      }

      ${ActionButton} {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding: 0 4rem;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});

        background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
        background-size: 100% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        & > span {
          & > span {
            background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
            -webkit-background-clip: text;
          }
        }
      }
    `}

  ${({ nextActive }) =>
    nextActive &&
    css`
      z-index: 1;
      ${CarouselSlideContent} {
        //border: 1px solid green;
        opacity: 1;
        transform: translateX(55%) scale(0.9);

        @media (max-width: 1280px) {
          transform: translateX(25%) scale(0.9);
        }

        @media (max-width: 980px) {
          transform: translateX(10%) scale(0.9);
        }

        @media (max-width: 600px) {
          transform: translateX(0%) scale(0.9);
        }
      }

      ${GameCardWrapper} {
        background-image: linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(${COLORS.grayPurple}, ${COLORS.grayPurple}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            ${COLORS.grayPurple} calc(50% - 1px),
            ${COLORS.grayPurple} calc(50% + 0.5px),
            ${COLORS.darkBg} calc(25% + 1px)
          ),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
        background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
        background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
      }

      ${ActionButton} {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-left: 20px;
        padding: 0 4rem;
        border: 2px solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});

        background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
        background-size: 100% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        & > span {
          & > span {
            background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
            -webkit-background-clip: text;
          }
        }
      }
    `}

  ${({ nextHidden }) =>
    nextHidden &&
    css`
      ${CarouselSlideContent} {
        transform: translateX(50%) scale(0);
      }
    `}

  ${({ active }) =>
    active &&
    css`
      ${NextBtn}, ${PrevBtn} {
      }
      z-index: 2;
      ${CarouselSlideContent} {
        opacity: 1;
        transform: translateX(0%) scale(1);
      }

      ${GameCardWrapper} {
        background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
          linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 2px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            ${COLORS.pink} calc(50% - 2px),
            ${COLORS.pink} calc(50% + 1px),
            ${COLORS.darkBg} calc(25%)
          ),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
          linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
        background-size: 2px 100%, 2px 100%, 100% 2px, 100% 2px, 25px 25px, 100% 100%, 100% 100%;
        background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
      }
    `}
`;

export const NextButtonWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  width: calc((100% - 460px) / 2);
  height: 100%;
  position: absolute;
  right: 0;
  //border: 1px solid green;
`;

export const PrevButtonWrapper = styled.div`
  cursor: pointer;
  display: inline-block;
  width: calc((100% - 460px) / 2);
  height: 100%;
  position: absolute;
  left: 0;
  //border: 1px solid green;
`;
