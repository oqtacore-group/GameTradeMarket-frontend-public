import styled from 'styled-components';
import { GetMediaSizes } from '@game-trade/ui';

export const YoutubeWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    margin: 0 auto;
    width: 400px;
  }
`;
