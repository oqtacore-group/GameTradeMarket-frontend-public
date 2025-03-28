import styled from 'styled-components';

import { COLORS } from '../../../../index';

export const Button = styled.button`
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 50%;
  //transform: translateY(-50%);
  border: 0;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  fill: #1bcacd;
  padding: 0;

  &:disabled {
    cursor: default;
    opacity: 0.3;
  }

  svg {
    width: 100%;
    height: 100%;

    path {
      fill: ${COLORS.blue};
    }
  }
`;

export const PrevBtn = styled(Button)`
  left: 0;
  transform: rotate(90deg);

  @media (max-width: 600px) {
    left: 0rem;
  }
`;

export const NextBtn = styled(Button)`
  right: 0;
  transform: rotate(-90deg);

  @media (max-width: 600px) {
    right: 0rem;
  }
`;
