import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const MenuWrapper = styled.div`
  width: 235px;
  padding: 18px;
  margin-right: 20px;
  background: rgba(24, 15, 29, 0.7);
  border: 1px solid #0f0912;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Title = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    path {
      stroke: white;
    }
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Category = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid black;
    margin-bottom: 18px;
  }
`;

export const Item = styled.li`
  color: ${COLORS.gray};
  &:not(:last-child) {
    padding-bottom: 16px;
  }
`;
