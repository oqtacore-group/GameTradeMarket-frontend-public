import styled from 'styled-components';

import { COLORS, FONTS } from '../../../styles';

export const WrapperContent = styled.div`
  margin: 15px 25px;
`;

export const DonutChart = styled.div`
  display: inline-block;
  text-align: center;
  position: relative;
  top: 5px;
  margin-right: 10px;
  overflow: hidden;
`;

export const WrapperCounterCircle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 1rem;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

interface ICounterCircleProps {
  count: number;
}
export const CounterCircle = styled.div<ICounterCircleProps>`
  display: inline-block;
  position: relative;
  font-size: ${({ count }) => {
    if (count < 1000) {
      return 14;
    } else if (count >= 1000 && count < 10000) {
      return 11;
    } else {
      return 10;
    }
  }}px;
`;

export const Information = styled.div`
  display: inline-block;
`;

export const Title = styled.span`
  display: inline-block;
  ${FONTS.chakra};
  font-size: 18px;
  line-height: 18px;
  color: ${COLORS.pink};
`;

export const WrapperCounter = styled.p`
  font-size: 16px;
  margin-bottom: 0;
  span {
    color: ${COLORS.blue};
  }
`;

export const SvgCircle = styled.svg`
  stroke-width: 1rem;
  stroke: #7e5d84;
  width: 100%;
  max-width: 4.4rem;
  transform: rotate(270deg) translatex(50%);
  transform-origin: 75% 75% 0;
`;

export const CircleFront = styled.circle<{ count: number; maxCount: number; fillLength: number }>``;

export const CircleBack = styled.circle`
  fill: none;
`;
