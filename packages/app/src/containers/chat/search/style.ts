import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS } from '@game-trade/ui';

export const SearchFieldStyled = styled.div`
  background-color: ${rgba(COLORS.black90, 0.7)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding-left: 40px;
  border-bottom: 1px solid ${COLORS.black90};
  div {
    border: 0 none !important;
    padding-left: 0 !important;
    background-color: transparent !important;
  }
  input {
    background-color: transparent !important;
    ${FONTS.chakra};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    height: 100%;
    border: 0 none !important;
    padding-left: 0 !important;
  }
`;
