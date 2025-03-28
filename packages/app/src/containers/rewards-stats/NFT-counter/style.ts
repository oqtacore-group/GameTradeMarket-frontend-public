import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperNFTCounter = styled.div`
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

export const Count = styled.div`
  margin-left: 5px;

  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
`;

export const Left = styled.div`
  display: flex;
  ${Count} {
    color: ${COLORS.pink};
  }
`;

export const Common = styled.div`
  display: flex;
  ${Count} {
    color: ${COLORS.blue};
  }
`;

export const Rare = styled.div`
  display: flex;
  ${Count} {
    color: #722fff;
  }
`;

export const Legendary = styled.div`
  display: flex;
  ${Count} {
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
  }
`;
