import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperTimeLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const Day = styled.div<{ active: boolean }>`
  display: flex;
  padding: 1px 0;
  width: calc(100% / 3);
  justify-content: center;
  font-size: 17px;

  ${({ active }) => {
    if (active) {
      return css`
        background-color: ${COLORS.grayPurple};
      `;
    }
    return css`
      border: 2px solid ${COLORS.grayPurple};
    `;
  }}

  &:not(:last-child) {
    margin-right: 20px;
  }
`;
