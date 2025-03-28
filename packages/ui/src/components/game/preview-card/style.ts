import styled, { css } from 'styled-components';

import { COLORS, GetMediaSizes } from '../../../styles';
import { SvgStarFill } from '@game-trade/icons';
import { ImageWrapper } from '../../../modifiers/get-image-optimization/style';
// import { shadowBorderEdgeGradient } from '@game-trade/ui';

export const GameCardImageWrapper = styled.div``;

export const ShopItems = styled.button`
  top: 80%;
  right: 2%;
  position: absolute;
  pointer-events: auto;
  display: none;

  width: 156px;
  height: 37px;
  padding: 5px 32px 26px 32px;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.pink});
  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.pink});

  color: white;
  font-size: 16px;

  &:hover {
    background-image: linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(
        to left top,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgb(249, 138, 205) calc(50%),
        rgb(249, 138, 205) calc(50% + 0.5px),
        rgb(249, 138, 205) calc(25% + 1px)
      ),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205));
  }

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    width: 40%;
    top: 75%;
    right: 5%;
    height: 15%;

    svg {
      display: none;
    }
  }
`;

export const GameCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-image: linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      black calc(50% - 1px),
      black calc(50% + 0.5px),
      #19101f calc(25% + 1px)
    ),
    linear-gradient(#19101f, #19101f), linear-gradient(#19101f, #19101f);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
  transition: 0.2s linear;

  &:hover {
    transition: 0.2s linear;
    background-repeat: no-repeat;
    background-image: linear-gradient(black, black), linear-gradient(black, black),
      linear-gradient(black, black), linear-gradient(black, black),
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
    background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

    ${ImageWrapper} {
      &:after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.42);
      }
    }

    ${ShopItems} {
      display: block;
    }

    &:after {
      transition: 0.2s linear;
      opacity: 1;
    }
  }

  &:after {
    transition: 0.2s linear;
    content: '';
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 1)),
      linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to right, rgba(0, 0, 0, 1), ${COLORS.blue}),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        ${COLORS.blue} calc(50% - 1px),
        ${COLORS.blue} calc(50% + 0.5px),
        transparent calc(25%)
      ),
      linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
    background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
    pointer-events: none;
  }
`;

// export const Explore = styled.div`
//   width: 50px;
//   margin-right: 10px;
//   display: flex;
//   justify-content: center;
//   font-size: 16px;
//   color: white;
//   pointer-events: auto;
//
//   background-repeat: no-repeat;
//   background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
//     linear-gradient(${COLORS.pink}, ${COLORS.pink}), linear-gradient(${COLORS.pink}, ${COLORS.pink}),
//     linear-gradient(${COLORS.pink}, ${COLORS.pink}),
//     linear-gradient(
//       to top left,
//       rgba(0, 0, 0, 0) calc(50% - 1px),
//       rgba(0, 0, 0, 0) calc(50% - 1px),
//       ${COLORS.pink} calc(50%),
//       ${COLORS.pink} calc(50% + 0.5px),
//       ${COLORS.pink} calc(25% + 1px)
//     ),
//     linear-gradient(${COLORS.pink}, ${COLORS.pink}), linear-gradient(${COLORS.pink}, ${COLORS.pink});
//   background-size: 1px 100%, 1px 55%, 100% 1px, calc(100% - 5px) 1px, 5px 5px, 100% 100%, 100% 100%;
//   background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -5px 0, 0% -5px;
//   z-index: 2;
//   transition: 0.5ms;
//
//   &:hover {
//     background-image: linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
//       linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
//       linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
//       linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
//       linear-gradient(
//         to left top,
//         rgba(0, 0, 0, 0) calc(50% - 1px),
//         rgba(0, 0, 0, 0) calc(50% - 1px),
//         rgb(249, 138, 205) calc(50%),
//         rgb(249, 138, 205) calc(50% + 0.5px),
//         rgb(249, 138, 205) calc(25% + 1px)
//       ),
//       linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
//       linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205));
//   }
//
//   @media (max-width: 786px) {
//     margin-right: 15px;
//   }
// `;

export const GameImageContainer = styled.div`
  position: relative;
  height: 240px;
  overflow: hidden;

  @media (max-width: 576px) {
    font-size: 45rem;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1rem 1.5rem 1rem 1rem;
  margin: auto;
  width: calc(100% - 4px);
  @media (max-width: 576px) {
    padding: 8px;
  }
`;

export const EmptyTokenImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PriceRatingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 21px;

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: left;
    align-items: baseline;
  }
`;

export const Wrapper = styled.div`
  width: 100%;

  & > a {
    width: 100%;
  }
`;

export const Price = styled.div`
  color: ${COLORS.gray};
  font-family: 'ChakraPetch';
  font-size: 14px;
  display: flex;
  white-space: nowrap;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

export const Rating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;

  svg {
    margin-right: 6px;
  }

  ${SvgStarFill} {
    fill: ${COLORS.pink};
  }
`;

export const RatingModal = styled.div`
  position: absolute;
  bottom: 35px;
  right: 10px;
  padding: 0 13px;
  display: none;
  font-size: 14px;
  color: white;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      transparent calc(25%)
    ),
    linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 10px 10px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -10px, 0% 0%, -10px 100%, 100% 100%, -10px 0%, 0% -10px;
`;

export const RatingCount = styled.div`
  color: ${COLORS.grayPurple};
  font-size: 14px;
  z-index: 1;

  &:hover + ${RatingModal} {
    display: block;
  }
`;

export const BorderLine = styled.hr`
  margin: 1rem 0;

  &:after {
    background-color: ${COLORS.black90};
    margin: 0;
  }
`;

export const PriceEth = styled.div`
  max-width: 8rem;
  font-style: normal;
  font-weight: 600;
  margin-right: 2px;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PriceUsdt = styled.div`
  color: ${COLORS.gray};
  font-weight: 400;
`;

export const PillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 9px;
  left: 10px;
  font-size: 12px;
  z-index: 1;
  align-items: flex-start;
`;

export const Pills = styled.div<{ color: string; svg: boolean; newGame?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ svg }) => (svg ? '2px' : '0 7px')};
  color: black;
  margin-right: 5px;

  ${({ color, svg }) => {
    if (color === 'white') {
      return css`
        background-color: white;
        svg {
          fill: black;
        }
      `;
    }

    if (color === 'pink' && svg) {
      return css`
        background-color: ${COLORS.pink};
        svg {
          fill: white;
        }
      `;
    }

    if (color === 'blue' && svg) {
      return css`
        background-color: ${COLORS.blue};
        svg {
          fill: white;
        }
      `;
    }
  }}

  ${({ newGame }) => {
    if (newGame) {
      return css`
        color: white;
        text-transform: uppercase;

        background-repeat: no-repeat;
        background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            ${COLORS.pink} calc(50% - 1px),
            ${COLORS.pink} calc(50% + 0.5px),
            ${COLORS.pink} calc(25% + 1px)
          ),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink});
        background-size: 1px 100%, 1px 80%, 100% 1px, calc(100% - 5px) 1px, 5px 5px, 100% 100%,
          100% 100%;
        background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -5px 0, 0% -5px;
        z-index: 2;
        transition: 0.5ms;
      `;
    }
  }}
`;

export const GameName = styled.div`
  font-size: 16px;
  font-family: 'ChakraPetch';
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
