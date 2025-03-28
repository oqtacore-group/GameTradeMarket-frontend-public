import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperItemScore = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 60px;
  margin-bottom: 20px;
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #379fff, #ff41b3);
  background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
  background-size: 100% auto;
  -webkit-background-clip: text;
  background: rgba(21, 12, 26, 0.7);
  backdrop-filter: blur(100px);

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const ScoreWrapper = styled.h2`
  font-size: 24px;
  display: flex;
  margin-left: 5px;
`;

export const Score = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  svg {
    margin-right: 10px;
  }
`;

export const ReferralLink = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.grayPurple};

  svg {
    cursor: pointer;
    margin-left: 10px;
    path {
      stroke: ${COLORS.blue};
    }
  }
`;

export const Navigation = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  border-bottom: 2px solid white;
  &:not(:last-child) {
    margin-right: 20px;
  }
`;
