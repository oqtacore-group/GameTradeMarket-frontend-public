import styled, { css } from 'styled-components';
import { PositionLight } from './index';

export const StyledLight = styled.div<{
  color: string;
  position: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  opacity?: number;
  size?: string;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ opacity }) => opacity};
  background: #4e25c4;

  ${({ position }) =>
    position === PositionLight.TopLeft
      ? css`
          top: 0;
          left: 0;
        `
      : position === PositionLight.TopRight
      ? css`
          top: 0;
          right: 0;
        `
      : position === PositionLight.BottomLeft
      ? css`
          bottom: 0;
          left: 0;
        `
      : position === PositionLight.BottomRight
      ? css`
          bottom: 0;
          right: 0;
        `
      : position === PositionLight.Center
      ? css`
          top: 50%;
          transform: translateY(-50%);
        `
      : ''}

  ${({ left }) => (left ? 'left:' + left + 'px' : '')};
  ${({ right }) => (right ? 'left:' + right + 'px' : '')};
  ${({ top }) => (top ? 'left:' + top + 'px' : '')};
  ${({ bottom }) => (bottom ? 'left:' + bottom + 'px' : '')};

  ${({ color, position, size }) =>
    color === 'pink'
      ? css`
          background: radial-gradient(
            circle at ${position},
            #fb41ff4d 0%,
            #fb41ff 0%,
            rgba(0, 212, 255, 0) ${size}
          );
        `
      : css`
          background: radial-gradient(
            circle at ${position},
            #722fff 0%,
            rgba(0, 212, 255, 0) ${size}
          );
        `}

  z-index: -1;
`;
