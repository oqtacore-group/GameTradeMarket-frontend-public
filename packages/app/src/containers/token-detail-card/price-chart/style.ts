import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS } from '@game-trade/ui';

export const WrapperContent = styled.div`
  width: 50%;
  background-color: ${rgba(COLORS.darkBg, 0.8)};
  padding: 23px 0 0 23px;
  position: relative;
`;

export const Headline = styled.div`
  margin: 0 1rem 2rem 0;
  font-size: 20px;
  text-transform: uppercase;
`;

export const Stroke = styled.hr`
  margin: 0;
  z-index: -1;

  &::after {
    margin-top: 0;
    background-color: black;
  }
`;
