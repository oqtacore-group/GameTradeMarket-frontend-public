import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from '@game-trade/ui';

export const WrapperContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 23px 23px 23px 50px;
  background-color: ${rgba(COLORS.darkBg, 0.8)};
`;

export const Headline = styled.div`
  margin: 0 10px 12px;
  font-size: 20px;
  text-transform: uppercase;
`;

export const WrapperListCard = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Stroke = styled.hr`
  margin: 0;
  //z-index: -1;

  &::after {
    margin-top: 0;
    background-color: black;
  }
`;
