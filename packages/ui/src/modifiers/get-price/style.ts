import styled from 'styled-components';

import { COLORS, FONTS } from '../../styles';

export const BlockPrice = styled.div<{ fontSize?: string }>`
  ${FONTS.chakra};
  color: ${COLORS.pink};
  font-size: ${({ fontSize }) => fontSize || '36px'};
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  svg {
    fill: ${COLORS.pink};
  }
`;

export const Crypto = styled.div<{ onlyCrypto?: boolean }>`
  max-width: 60%;
  font-style: normal;
  font-weight: 600;
  margin-right: ${({ onlyCrypto }) => !onlyCrypto && '0.4em'};
  margin-left: 0.2em;
`;

export const USDT = styled.div<{ colorUSDT?: string }>`
  color: ${({ colorUSDT }) => colorUSDT || COLORS.pink};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CoinLogo = styled.img<{ isDetailLogoSize?: boolean }>`
  width: ${({ isDetailLogoSize }) => (isDetailLogoSize ? '45px' : '20px')};
  height: ${({ isDetailLogoSize }) => (isDetailLogoSize ? '45px' : '20px')};
  @media (max-width: 768px) {
    width: 10%;
    height: 10%;
  }
`;

export const Undefined = styled.div`
  font-size: 14px;
  color: ${COLORS.grayPurple};
`;

export const CoinName = styled.div`
  font-weight: bold;
  background: -webkit-linear-gradient(
    45deg,
    ${COLORS.blue},
    ${COLORS.blue},
    ${COLORS.pink},
    ${COLORS.pink},
    ${COLORS.pink}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
