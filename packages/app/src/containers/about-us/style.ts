import styled, { css, keyframes } from 'styled-components';
import { COLORS } from '@game-trade/ui';

const rotateDeg = keyframes`
  from {
    border-image-source: linear-gradient(60deg, #FF41B3 20.25%, #379FFF 100%);
  }

  to {
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-image-source: linear-gradient(206deg, #FF41B3 20.25%, #379FFF 100%);
  }
`;

// const rotateDegText = keyframes`
//   to {
//     background-size: 200% auto;
//
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

export const AboutUsWrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0 50px;

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin-bottom: 90px;
    margin-top: 90px;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
    max-width: 540px;
  }
`;

export const HeadlineGradient = styled.h3`
  font-style: normal;
  font-weight: bold;
  padding-bottom: 2rem;

  background: linear-gradient(59.29deg, ${COLORS.pink} 20.25%, ${COLORS.blue} 100%);
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    animation: ${rotateDeg} 1s linear 0s infinite alternate;
  }
`;

export const Headline = styled.h2`
  position: relative;
  padding-bottom: 2.5rem;
  min-width: 6%;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 4px;
    left: 3px;
    opacity: 0.5;
    z-index: -1;
    -webkit-text-stroke: 1px ${COLORS.pink};
    -webkit-text-fill-color: transparent;
  }
`;

export const ShadowBorder = styled.div<{ item: number; color: string }>`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;

  z-index: -1;
  background-repeat: no-repeat;

  ${({ color }) =>
    color &&
    css`
      background-image: linear-gradient(${color}, ${color}), linear-gradient(${color}, ${color}),
        linear-gradient(${color}, ${color}), linear-gradient(${color}, ${color}),
        linear-gradient(
          to top left,
          rgba(0, 0, 0, 0) calc(50% - 1px),
          rgba(0, 0, 0, 0) calc(50% - 1px),
          ${color} calc(50% - 1px),
          ${color} calc(50%),
          rgba(0, 0, 0, 0) calc(25% + 1px)
        ),
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    `};

  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0 0, -25px 100%, 100% 100%, -25px 0, 0 -25px;

  ${({ item }) =>
    item == 1 &&
    css`
      left: -1rem;
      top: 2rem;
      opacity: 0.5;
    `}

  ${({ item }) =>
    item == 2 &&
    css`
      left: -2rem;
      top: 4rem;
      opacity: 0.2;
    `}

  ${({ item }) =>
    item == 3 &&
    css`
      left: 1rem;
      top: 1rem;
      opacity: 0.8;
    `}

  ${({ item }) =>
    item == 4 &&
    css`
      left: 2rem;
      top: 2rem;
      opacity: 0.3;
    `}
`;
