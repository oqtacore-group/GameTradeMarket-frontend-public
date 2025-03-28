import styled, { css } from 'styled-components';
import { COLORS } from '../../styles';

export const Item = styled.div<{ isLastChild?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;

  & > div:first-child,
  & > div:last-child {
    font-size: 17px;
  }

  & > div:last-child {
    color: #ff41b3;
    display: flex;
    align-items: center;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to left,
      ${COLORS.pink},
      ${COLORS.pink},
      ${COLORS.blue},
      ${COLORS.blue}
    );
  }

  &:last-child::after {
    display: none;
  }

  svg {
    margin-right: 5px;
    path {
      fill: ${COLORS.pink};
    }
  }

  ${({ isLastChild }) =>
    isLastChild &&
    css`
      &:after {
        display: none;
      }
    `}
`;
