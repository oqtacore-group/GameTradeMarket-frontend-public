import styled, { css } from 'styled-components';
import { FONTS, shadowBorderEdgeGradient, COLORS } from '@game-trade/ui';
import { rgba } from 'polished';

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
  bottom: -72px;
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

  img {
    object-fit: cover;
  }
`;

export const HeadContent = styled.div`
  padding: 20px 40px 20px 258px;
  background: #150c19;
  min-height: 80px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;

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

export const FilterRow = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FilterCell = styled.div`
  position: relative;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    &:before {
      display: none;
    }
  }

  &:before {
    content: '';
    position: absolute;
    right: 0;
    height: 100%;
    width: 1px;
    background: #180f1d;
  }

  last-child {
    &:before {
      display: none;
    }
  }
`;

export const ItemsTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 26px 0px 42px;

  @media (max-width: 1280px) {
    padding: 20px 26px 12px 40px;
  }

  @media (max-width: 768px) {
    padding: 24px 10px 14px 20px;
    display: grid;
    grid-gap: 14px;
    grid-template-columns: 1fr 1fr 1fr;
  }

  > * {
    cursor: pointer;
  }
`;

export const ItemBox = styled.div`
  width: 120px;
  height: 120px;
  min-width: 120px;
  min-height: 120px;
  margin-right: 16px;
  margin-bottom: 20px;
  border: 1px solid #0f0912;
  background: #19101f;
  position: relative;

  @media (max-width: 1280px) {
    margin-right: 14px;
    margin-bottom: 14px;
    width: 102px;
    height: 102px;
    min-width: 102px;
    min-height: 102px;
  }

  @media (max-width: 768px) {
    margin-right: 10px;
    margin-bottom: 10px;
    width: 86px;
    height: 86px;
    min-width: 86px;
    min-height: 86px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 200px;
  width: 100% ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #a073a7;
`;

export const LoadingWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
`;

export const ButtonWrapper = styled.div``;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: row;

  > * + * {
    margin-left: 20px;
  }

  ${ButtonWrapper} {
    margin-right: 14px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;

    ${ButtonWrapper} {
      margin-right: 0;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

export const ButtonContent = styled.div`
  padding: 0 40px;
`;

export const HeadFlex = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FriendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  min-width: 390px;
  height: auto;
  background: ${rgba('#180F1D', 0.7)};
  min-height: calc(100vh - 89px - 362px - 80px - 256px);

  @media (max-width: 1280px) {
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: auto;
    flex-direction: column;
  }
`;

export const FriendsBlock = styled.div`
  width: 100%;

  @media (max-width: 1280px) {
    width: 50%;
    border-right: 1px solid #0f0912;

    :last-child {
      border-right: none;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    border: none;
  }
`;

export const FriendsHeader = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  border-top: 1px solid #0f0912;
  border-bottom: 1px solid #0f0912;
  padding: 0px 36px;
  cursor: pointer;

  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  @media (max-width: 1280px) {
    height: 60px;
    padding: 0px 34px;
  }

  @media (max-width: 768px) {
    height: 50px;
    padding: 0px 20px;
  }
`;

export const FriendsCount = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #379fff;
  margin-left: 12px;
`;

export const FriendsContent = styled.div`
  display: grid;
  grid-column-gap: 34px;
  grid-row-gap: 22px;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 40px 46px;
  max-height: 320px;
  width: 100%;
  cursor: pointer;

  @media (max-width: 1280px) {
    padding: 44px;
    height: 312px;
    grid-column-gap: 34px;
    grid-row-gap: 34px;
  }

  @media (max-width: 768px) {
    padding: 32px 22px;
    height: 300px;
    width: 100%;
    grid-column-gap: 24px;
    grid-row-gap: 28px;
  }
`;

export const FlexContentBlock = styled.div`
  display: flex;

  @media (max-width: 1280px) {
    flex-direction: column;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const LeftFlexSide = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

export const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FriendNick = styled.div`
  margin-top: 8px;
  font-family: BaiJamjuree;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
`;

export const FriendImageBox = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
`;

export const FriendImage = styled.div`
  border-radius: 50%;
  height: 75px;
  width: 75px;
  overflow: hidden;
`;

export const StatusDot = styled.div`
  position: absolute;
  bottom: 0;
  right: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #379fff;
  border: 2px solid #19101f;
`;

export const EmptyFriends = styled.div`
  width: 100%;
  height: 100%;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: ${rgba('#ffffff', 0.5)};

  padding: 40px 46px;
  height: 320px;
  width: 100%;

  @media (max-width: 1280px) {
    padding: 44px;
    height: 312px;
  }

  @media (max-width: 768px) {
    padding: 32px 22px;
    height: 300px;
    width: 100%;
  }
`;

export const PaginationBox = styled.div`
  margin-top: auto;
`;

export const EmptyTokenImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transform: scale(0.5);
  }
`;

export const NameWrapper = styled.div`
  margin-top: auto;
  display: flex;
  position: relative;
`;

export const CopyWrapper = styled.div<{ copy: boolean }>`
  margin-top: auto;
  display: flex;
  font-size: 18px;
  margin-left: 5px;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 7px;
  }

  ${({ copy }) =>
    copy &&
    css`
      &:after {
        display: block;
        content: 'promo code copied';
        color: white;
        padding: 1rem;
        position: absolute;
        right: 0;
        top: -50%;
        text-align: center;
        background-color: ${COLORS.darkBg};
        font-size: 10px;
        line-height: 1;
        border-radius: 0.5rem;
        border: 1px solid ${COLORS.blue};
      }
    `}
`;

export const PopUpWindow = styled.div`
  padding: 10px;
  position: absolute;
  line-height: 1.2;
  top: -100%;
  margin-left: 3%;
  font-size: 14px;
  color: white;

  ${shadowBorderEdgeGradient()};
  z-index: -1;

  opacity: 0;
  transition: 0.3s;
`;

export const PromoCode = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  font-size: 18px;
  color: ${COLORS.grayPurple};

  svg {
    margin-left: 15px;
    margin-right: 5px;
    height: 20px;
    width: 20px;
    cursor: help;

    &:hover {
      & + ${PopUpWindow} {
        //display: block;
        opacity: 1;
        transition: 0.3s;
        z-index: 1;
      }
    }

    path {
      fill: ${COLORS.grayPurple};
    }
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
