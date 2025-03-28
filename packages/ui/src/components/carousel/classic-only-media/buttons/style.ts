import styled from 'styled-components';

import { COLORS, GetMediaSizes } from '../../../../styles';

export const Button = styled.button`
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 40%;
  transform: translateY(-50%);
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

  @media (max-width: ${GetMediaSizes.personal_computer_1200}) {
    top: 20%;
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 15px;
    height: 15px;
    top: 35%;
  }

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    top: 50%;
  }
`;

export const PrevBtn = styled(Button)`
  left: 0;
  transform: rotate(90deg);

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    width: 50%;
    left: -20%;
    top: 35%;
    height: 30%;

    svg {
      display: none;
    }
  }
`;

export const NextBtn = styled(Button)`
  right: 0;
  transform: rotate(-90deg);

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    width: 50%;
    right: -20%;
    top: 35%;
    height: 30%;

    svg {
      display: none;
    }
  }
`;
