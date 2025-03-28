import styled from 'styled-components';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const BackgroundStreet = styled.div`
  position: absolute;
  width: 100%;
  height: 65rem;
  left: 0;
  z-index: -10;

  > span:first-child {
    display: block !important;
  }

  > span:nth-child(2) {
    display: none !important;
  }

  @media (max-width: 767px) {
    > span:first-child {
      display: none !important;
    }

    > span:nth-child(2) {
      display: block !important;
    }
  }
`;
