import styled from 'styled-components';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const BackgroundAnimationComponent = styled.div`
  mask-image: linear-gradient(to bottom, black 60%, rgba(0, 0, 0, 0));
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 85rem;
  z-index: -5;

  @media (max-width: 1200px) {
    height: 80rem;
  }

  @media (max-width: 992px) {
    display: none;
  }
`;
