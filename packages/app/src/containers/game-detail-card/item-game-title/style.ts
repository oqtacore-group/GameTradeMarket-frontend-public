import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const TitleGameItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

export const TitleGameName = styled.h1`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 40px;
  color: ${COLORS.white};
  padding-right: 24px;
  cursor: pointer;

  @media (max-width: 850px) {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    padding-right: 15px;
  }
`;

export const TitleGameVerification = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;

  svg {
    width: 2em;
    height: 2em;
    path:first-child {
      fill: ${COLORS.pink};
    }
    path {
      fill: ${COLORS.white};
    }
  }
`;
