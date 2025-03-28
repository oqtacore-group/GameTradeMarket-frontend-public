import styled, { css, keyframes } from 'styled-components';

import { COLORS } from '../../styles';

import { IProps, ALIGN, SIZE } from './interfaces';

const align = {
  [ALIGN.CENTER]: css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `,
  [ALIGN.LEFT]: css`
    position: absolute;
    left: 10px;
    top: 5px;
  `,
  [ALIGN.RIGHT]: css`
    position: absolute;
    right: 10px;
    top: 5px;
  `,
};

const sizeLoader = {
  [SIZE.BASE]: css`
    width: 56px;
    height: 56px;
  `,
  [SIZE.MINI]: css`
    width: 28px;
    height: 28px;
  `,
  [SIZE.BIG]: css`
    width: 76px;
    height: 76px;
  `,
  [SIZE.MICRO]: css`
    width: 16px;
    height: 16px;
  `,
};

const sizeBorder = {
  [SIZE.BASE]: css`
    border: 5px solid ${COLORS.blue};
  `,
  [SIZE.MINI]: css`
    border: 3px solid ${COLORS.blue};
  `,
  [SIZE.MICRO]: css`
    border: 2px solid ${COLORS.blue};
  `,
  [SIZE.BIG]: css`
    border: 6px solid ${COLORS.blue};
  `,
};

const circle = keyframes`
 from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderContainer = styled.div<Partial<IProps>>`
  position: relative;
  ${({ position }) => (position ? align[position] : '')};
  ${({ size }) => (size ? sizeLoader[size] : '')};
  pointer-events: none;
  z-index: 1;
`;

export const Spinning = styled.div<Partial<IProps>>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: auto;
  ${({ size }) => (size ? sizeLoader[size] : '')};
  ${({ size }) => (size ? sizeBorder[size] : '')};
  border-radius: 50%;
  background-color: transparent;
  border-width: 3px;
  border-style: solid;
  border-left-color: ${COLORS.pink};
  border-top-color: ${COLORS.blue};
  z-index: 1;
  animation: ${circle} 1s linear infinite;
`;
