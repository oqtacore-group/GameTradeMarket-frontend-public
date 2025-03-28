import { COLORS, GetMediaSizes } from '@game-trade/ui';
import styled from 'styled-components';

export const ItemStyled = styled.div`
  width: 100%;
  padding: 20px;
  break-inside: avoid;
  position: relative;
  cursor: pointer;
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 1)),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, rgba(0, 0, 0, 1), ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25%)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  &:after {
    content: '';
    position: absolute;
    top: -25px;
    left: 0;
    border-radius: 50px;
    width: 12px;
    height: 12px;
    background-color: ${COLORS.pink};
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
`;

export const Carousel = styled.div`
  position: relative;
  overflow: hidden;
  padding: 0 50px;
  height: 100%;
  width: 100%;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    padding: 0 25px;
  }
  @media (max-width: ${GetMediaSizes.mobile_576}) {
    padding: 0;
  }
`;

export const CarouselViewport = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-top: 20px;

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
  width: 125%;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 100%;
  }
`;

export const CarouselSlide = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: calc(100% / 5);
  padding: 0 10px;
  margin-top: 20px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 85%;
    min-width: 70%;
    padding: 0 10px;
  }
`;

export const ProgressLine = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 20px;
  position: absolute;
  left: 0;
  right: 0;
  background: linear-gradient(
    270deg,
    rgba(15, 9, 18, 0) 0%,
    rgba(55, 159, 255, 1) 12%,
    rgba(55, 159, 255, 1) 88%,
    rgba(0, 212, 255, 0) 100%
  );
`;

export const Quarter = styled.div`
  color: ${COLORS.pink};
  font-size: 18px;
  margin-right: 10px;
`;
export const Date = styled.div`
  font-size: 16px;
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
`;
export const Task = styled.div`
  margin-left: 10px;
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const InProgress = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border: 1px solid ${COLORS.pink};
  z-index: 3;

  &:after {
    content: '';
    width: 10px;
    height: 10px;

    position: absolute;
    top: -3px;
    left: -3px;
    background-color: ${COLORS.blue};
  }
`;
