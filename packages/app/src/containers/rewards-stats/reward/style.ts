import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperReward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  padding: 20px;
  background: ${COLORS.darkBg};
  border: 1px solid black;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const ImageWrapper = styled.div`
  min-height: 420px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid black;
  background-color: ${COLORS.darkBg};
  position: relative;
`;

export const Headline = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
`;

export const Earn = styled.span`
  width: 100%;
  margin-bottom: 20px;
  background-color: ${COLORS.blue};
  color: white;
  text-align: center;
`;

export const RarityWrapper = styled.div`
  width: 100%;
  display: flex;
  font-size: 24px;
`;

export const Rarity = styled.span`
  margin-left: 9px;
  background: linear-gradient(
    93.95deg,
    #ffffff -1.23%,
    #eacc60 -1.23%,
    #fee58d 52.01%,
    #eacc60 104.11%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const Available = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 35px;
  font-size: 18px;
  color: ${COLORS.grayPurple};
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  font-size: 18px;
`;

export const Regenerate = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;

  svg {
    fill: white;
    margin-left: 10px;
    margin-right: 10px;
  }
`;
