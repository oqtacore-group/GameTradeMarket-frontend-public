import styled, { css } from 'styled-components';

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
  display: flex;
  justify-content: center;
  min-width: 20%;
  padding: 0 5px;

  @media (max-width: 900px) {
    min-width: calc(100% / 3);
    padding: 0 10px;
  }
`;

export const OverlayImage = styled.div`
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  //background-color: black;
  //opacity: 0.4;
  z-index: 1;
  transition: opacity 0.5ms;
  cursor: pointer;

  &:hover {
    opacity: 0;
    background-color: transparent;
    transition: opacity 0.5ms;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const ImageWrapper = styled.div<{ selected?: boolean }>`
  width: 19rem;
  height: 9.5rem;
  position: relative;
  cursor: pointer;

  //clip-path: polygon(100% 0, 100% 90%, 95% 100%, 0 100%, 0 0);

  ${({ selected }) =>
    selected &&
    css`
      &:after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-repeat: no-repeat;
        background-image: linear-gradient(#379fff, rgba(0, 0, 0, 1)),
          linear-gradient(#ff41b3, #ff41b3, #379fff),
          linear-gradient(to left, #ff41b3, #ff41b3, #379fff),
          linear-gradient(to right, rgba(0, 0, 0, 1), #379fff),
          linear-gradient(
            to top left,
            rgb(37 24 44) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            #379fff calc(50% - 1px),
            #379fff calc(50% + 0.5px),
            transparent calc(25%)
          ),
          linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
        background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
        background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
      }
    `};

  @media (max-width: 1200px) {
    height: 7.5rem;
    width: 100%;
  }
`;
