import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const BuyingCoinWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  margin-right: 8px;
  display: flex;
`;

export const Title = styled.div`
  font-size: 32px;
  margin-bottom: 18px;
`;

export const CoinPurchaseButtonWrapper = styled.div`
  background-color: ${COLORS.darkBg};
  margin-top: 30px;
  padding: 17px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CoinPurchaseButton = styled.div`
  width: 270px;
`;

export const BuyCoinWrapper = styled.div``;

export const BuyCoin = styled.div`
  font-weight: 600;
  font-size: 17px;
  line-height: 140%;
  margin-bottom: 4px;
`;

export const BuyCoinDescription = styled.div``;

export const BuyingCoinItemWrapper = styled.div``;

export const GameDescription = styled.h2`
  font-size: 17.3px;
  line-height: 1.5;
  display: flex;
`;

export const BuyingCoinItem = styled.div`
  margin-bottom: 40px;
`;
