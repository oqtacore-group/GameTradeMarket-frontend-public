import styled from 'styled-components';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const BackgroundStreet = styled.div`
  position: absolute;
  width: 100%;
  height: 80rem;
  left: 0;
  z-index: -10;

  @media (max-width: 1200px -1) {
    //height: 80rem;
  }

  @media (max-width: 992px -1) {
    //display: none;
  }
`;
