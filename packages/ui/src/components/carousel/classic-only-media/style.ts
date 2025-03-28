import styled from 'styled-components';
import { GetMediaSizes } from '../../../styles';

export const Carousel = styled.div`
  position: relative;
  padding: 0 25px;
  height: 100%;

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    padding: 0;
  }
`;

export const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  padding: 0 2px;

  &.IsDraggable {
    cursor: grab;
  }

  &.IsDragging {
    cursor: grabbing;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  user-select: none;
  height: 100%;
`;

export const CarouselSlide = styled.div`
  display: flex;
  position: relative;
  min-width: 100%;
  padding: 0 20px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    height: 200px;
  }

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    min-width: 85%;
    height: 145px;
    margin-right: 20px;
    padding: 0;
  }
`;
