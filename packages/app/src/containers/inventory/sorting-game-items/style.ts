import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const SortingWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 30px 30px 15px 20px;
  border-bottom: 1px solid ${COLORS.black};

  @media (max-width: 576px) {
    padding: 0;
  }
`;

export const ControlsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 80px;
  width: 250px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: auto;
  }

  @media (max-width: 576px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const ControlItemWrapper = styled.div<{ isHide?: boolean }>`
  display: ${({ isHide }) => (isHide ? 'none' : 'block')};

  @media (max-width: 576px) {
    border-right: 1px solid ${COLORS.black};

    :last-child {
      border-right: 0;
    }
  }
`;
