import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const GridViewWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
`;

export const GridViewItem = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 40px;
    height: 40px;
    fill: ${({ isActive }) => (isActive ? COLORS.pink : COLORS.gray)};
  }

  @media (max-width: 576px) {
    border-right: 1px solid ${COLORS.black};

    :last-child {
      border-right: 0;
    }
  }
`;
