import styled, { css } from 'styled-components';
import { Button, COLORS } from '@game-trade/ui';

export const Carousel = styled.div`
  position: relative;
  padding: 0 25px;

  @media (max-width: 767px) {
    padding: 0;
  }
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

  @media (max-width: 767px) {
    padding: 0;
  }
`;

export const CarouselContainer = styled.div`
  display: flex;
  width: 100%;
  user-select: none;
`;

export const CarouselSlide = styled.div`
  display: flex;
  position: relative;
  padding-left: 10px;

  min-width: 100%;
  width: 100%;
  height: 450px;

  @media (max-width: 1080px) {
    height: 250px;
  }

  @media (max-width: 767px) {
    //min-width: 99%;
    flex-direction: column;
    height: 400px;
  }
`;

export const ImageWrapper = () => css`
  width: 900px;
  height: 100%;
  clip-path: polygon(100% 0px, 100% 94.5%, 97.5% 100%, 0px 100%, 0px 0px);

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
      linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.pink}),
      linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 2px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        ${COLORS.pink} calc(50% - 2px),
        ${COLORS.pink} calc(50% + 1px),
        rgba(0, 0, 0, 0) calc(25%)
      ),
      linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
      linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    background-size: 2px 100%, 2px 100%, 100% 2px, 100% 2px, 25px 25px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
  }

  @media (max-width: 1080px) {
    width: 700px;
    clip-path: polygon(100% 0px, 100% 91%, 95% 100%, 0px 100%, 0px 0px);
  }

  @media (max-width: 767px) {
    width: 100%;
    height: 500px;
    clip-path: polygon(100% 0px, 100% 92%, 96% 100%, 0px 100%, 0px 0px);
  }
`;

export const ContentSlide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;

  @media (max-width: 767px) {
    margin-left: 0;
    margin-top: 30px;
  }
`;

export const Title = styled.h2`
  width: 90%;
  display: flex;
  position: relative;
  font-size: 48px;
  line-height: 62px;
  font-weight: 600;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 2px;
    left: 2px;
    opacity: 1;
    z-index: -1;
    -webkit-text-stroke: 2px #ff41b3;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 1280px) {
    font-size: 36px;
    line-height: 40px;
  }
`;

export const ActionButton = styled(Button)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;
