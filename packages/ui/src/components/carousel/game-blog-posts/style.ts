import styled from 'styled-components';

export const CarouselWrapper = styled.div`
  position: relative;
`;

export const PaginationWrapper = styled.div`
  // position: absolute;
  // width: 100%;
  border-left: 1px solid #150c19;
  border-right: 1px solid #150c19;
`;

export const Carousel = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const CarouselViewport = styled.div`
  overflow: hidden;
  width: 100%;

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
  margin-left: -20px;
`;

export const CarouselSlide = styled.div<{ size?: number }>`
  position: relative;
  padding-left: 20px;

  min-width: calc(100% / ${({ size }) => size});

  @media (max-width: 900px) {
    min-width: 100%;
    width: 100%;
    & > div {
      min-width: 100%;
      width: 100%;
    }
  }
`;
