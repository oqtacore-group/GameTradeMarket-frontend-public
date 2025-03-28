import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const FindWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 0 30px 0 20px;
  border-top: 1px solid ${COLORS.black};
  border-bottom: 1px solid ${COLORS.black};

  @media (max-width: 575px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    padding-top: 20px;
  }
`;
