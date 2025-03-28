import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const InventoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InventoryBody = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const InventoryContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InventoryContentStyled = styled.div`
  padding: 0 20px;
`;

export const MobileTitleWrapper = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
    padding: 35px 20px 10px;
  }
`;

export const DesktopTitleWrapper = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const TextEmptyInventory = styled.div`
  width: 100%;
  text-align: center;
  padding: 25px 0 150px;

  a {
    text-decoration: underline;
    color: ${COLORS.blue};
    &:hover {
      color: ${COLORS.pink};
    }
  }
`;
