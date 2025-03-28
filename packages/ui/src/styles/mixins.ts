import { css } from 'styled-components';

import { COLORS } from './index';

export const clipPathRightCorner = () => css`
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 23px), calc(100% - 24px) 100%, 0 100%);
`;

/**
 * ///////////////////////
 * DEPRECATED
 * ///////////////////////
 * */
export const roundBottomRightCorner = (
  isBackground = true,
  isGradient = false,
  color = COLORS.pink
) => css`
  & > div {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;

    & > div {
      border-radius: 100%;
      position: absolute;
      transition: 0.3s;

      ${() =>
        !isBackground
          ? css`
              border-color: ${color};
              border-style: solid;
            `
          : 'border: 0;'}

      &:first-child {
        width: 100%;
        height: 40%;
        border-radius: 0;

        ${() => {
          if (isBackground) {
            return css`
              background-color: ${color};
            `;
          } else {
            if (isGradient) {
              return css`
                border-color: #379fff;
              `;
            }

            return css`
              border-bottom-width: 0;
              border-left-width: 0;
              border-top-width: 1px;
              border-right-width: 1px;
            `;
          }
        }}
      }

      &:nth-child(2) {
        width: 100%;
        height: 20%;
        top: 39%;

        border-radius: 0;

        ${() => {
          if (isBackground) {
            return css`
              background-color: ${color};
            `;
          } else {
            if (isGradient) {
              return css`
                border-color: #379fff;
              `;
            }

            return css`
              height: 15%;
              border-right-width: 1px;
              border-bottom-width: 0;
              border-left-width: 0;
              border-top-width: 0;
            `;
          }
        }}
      }

      &:nth-child(3) {
        width: 100%;
        height: 46%;
        top: 54%;
        border-radius: 0;

        ${() => {
          if (isBackground) {
            return css`
              background-color: ${color};
              clip-path: polygon(-2% 0, 94% 3%, 104% 8%, 21% 100%, -2% 100%);
            `;
          } else {
            return css`
              border-width: 0;
              &:after {
                content: '';
                position: absolute;
                width: 115%;
                left: 1%;
                height: 1px;
                display: block;
                background-color: ${isGradient ? '#379FFF' : '#FF41B3'};
                bottom: 48.2%;
                border-radius: 0;
                -webkit-transform: rotate(137deg);
                transform: rotate(136deg);
              }
            `;
          }
        }}
      }

      &:nth-child(4) {
        ${() => {
          if (isBackground) {
            return css`
              width: 15%;
              height: 20%;
              top: 80%;
              border-radius: 0;
              background-color: ${color};
            `;
          } else {
            return css`
              width: 19%;
              height: 9%;
              top: 91%;
              border-radius: 0;
              border-bottom-width: 1px;
              border-right-width: 0;
              border-left-width: 0;
              border-top-width: 0;
              ${isGradient ? 'border-color: #379FFF;' : ''}
            `;
          }
        }}
      }
    }
  }
`;

export const shadowTextStroke = () => css`
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 4px;
    left: 3px;
    opacity: 0.5;
    z-index: 1;
    white-space: nowrap;
    -webkit-text-stroke: 1px #ff41b3;
    -webkit-text-fill-color: transparent;
  }
`;

export const shadowBorderEdgeGradient = () => css`
  z-index: -1;
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25%)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const shadowDarkEdgeGradient = () => css`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.black} calc(25%)
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const borderCutEdgeInverseWithBlackBg = () => css`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(55, 159, 255, 0.15)),
    linear-gradient(to left, rgba(0, 0, 0, 0.1), ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.blue}, rgba(55, 159, 255, 0.15)),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25% + 1px)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const borderGradient = () => css`
  position: relative;
  background-clip: padding-box;
  border: 2px solid transparent;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    margin: -2px;
    border-radius: inherit;
    background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
  }

  & > * {
    margin: 2px;
  }
`;

export const borderGradientMenu = () => css`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}, ${COLORS.pink}),
    // left line
    linear-gradient(to bottom, ${COLORS.pink}, ${COLORS.pink}),
    // right line
    linear-gradient(to right, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.pink}),
    // top line
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.blue}, ${COLORS.pink}),
    // top bottom
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 1px 1px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, 0 0, 0 0;
`;

export const gradientText = () => css`
  font-style: normal;
  font-weight: bold;
  background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const gradientBorder = (height = 3) => css`
  &:before {
    content: '';
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    height: ${height}px;
    border-radius: 2px;
    background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
  }
`;
