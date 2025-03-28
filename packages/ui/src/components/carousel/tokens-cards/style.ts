import styled from 'styled-components';

export const Carousel = styled.div`
  position: relative;
  padding: 0 25px;
`;

export const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;
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
  margin-left: -10px;
`;

export const CarouselSlide = styled.div`
  position: relative;
  min-width: 20%;
  padding-left: 10px;

  @media (max-width: 900px) {
    min-width: 100%;
    width: 100%;
    & > div {
      min-width: 100%;
      width: 100%;
    }
  }
`;
