import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const Wrapper = styled.div``;

export const HeadBg = styled.div`
  position: relative;
  height: 248px;

  @media (max-width: 1280px) {
    height: 185px;
  }

  @media (max-width: 768px) {
    height: 143px;
  }
`;

export const HeadImageBg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 80px;
  bottom: -60px;
  width: 144px;
  height: 144px;
  border-radius: 50%;
  padding: 2px;
  background: linear-gradient(59.29deg, #ff41b3 20.25%, #9f6ed7 58.46%, #379fff 100%);
  overflow: hidden;

  @media (max-width: 1280px) {
    width: 108px;
    height: 108px;
    left: 40px;
    bottom: -54px;
  }

  @media (max-width: 768px) {
    width: 108px;
    height: 108px;
    left: 20px;
    bottom: -54px;
  }
`;

export const HeadImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 1280px) {
    width: 104px;
    height: 104px;
  }

  @media (max-width: 768px) {
    width: 104px;
    height: 104px;
  }
`;

export const HeadContent = styled.div`
  padding: 20px 40px 20px 258px;
  background: #150c19;
  min-height: 60px;

  @media (max-width: 1280px) {
    padding: 14px 40px 14px 166px;
  }

  @media (max-width: 768px) {
    padding: 68px 20px 24px 20px;
  }
`;

export const LoginRow = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 47px;

  @media (max-width: 1280px) {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
  }

  @media (max-width: 768px) {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 31px;
  }
`;

export const WalletRow = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-family: BaiJamjuree;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: #a073a7;
  margin-top: 4px;

  @media (max-width: 1280px) {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
  }

  @media (max-width: 768px) {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
  }
`;

export const CopyBox = styled.div`
  margin-left: 14px;
  cursor: pointer;

  svg {
    path {
      stroke: #379fff;
    }
  }

  :active {
    svg {
      path {
        stroke: #ff41b3;
      }
    }
  }
`;

export const StatusRow = styled.div`
  font-family: BaiJamjuree;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #ff41b3;
  margin-top: 4px;

  @media (max-width: 1280px) {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
  }

  @media (max-width: 768px) {
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 17px;
  }
`;

export const WrapperDefaultAvatar = styled.div`
  svg {
    stroke: ${COLORS.blue};
    fill: ${COLORS.blue};
    path {
      stroke: ${COLORS.pink};
      fill: ${COLORS.pink};
    }
    circle {
      stroke: ${COLORS.blue};
      fill: ${COLORS.blue};
    }
  }
`;
