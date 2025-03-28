import styled, { css } from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const ItemStyled = styled.div<{ isFooter?: boolean }>`
  display: flex;
  margin-right: 3em;
  align-items: center;
  ${FONTS.baiJamjuree};
  color: ${({ isFooter }) => (isFooter ? COLORS.pink : COLORS.white)};
  font-size: inherit;
  line-height: inherit;
  text-align: left;
  white-space: nowrap;

  ${({ isFooter }) =>
    isFooter &&
    css`
      ${FONTS.chakra};
      font-weight: 700;
      font-size: 18px;
      line-height: 32px;
    `}
`;

export const List = styled.div<{ isMobile?: boolean }>`
  display: flex;

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      width: 100%;
      padding: 15px 0;
      max-height: 60vh;
      overflow-y: scroll;
      margin-top: 0 !important;

      ${ItemStyled} {
        margin: 0;
        padding: 0;
        width: 100%;
        font-size: 16px;
      }
    `}

  &::-webkit-scrollbar {
    width: 2px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.black};
    border-radius: 2px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.blue};
    border-radius: 2px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.shadowPurple};
  }
`;

export const Burger = styled.div<{ isOpen?: boolean }>`
  cursor: pointer;
  display: none;
  svg {
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenuContent = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
  right: 0;
  left: 0;
  top: 70px;
  z-index: 100;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.pink} calc(50% - 1px),
      ${COLORS.pink} calc(50% + 0.5px),
      ${COLORS.black} calc(25%)
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  hr {
    width: 100%;
  }
`;
export const Hamburger = styled.div`
  display: none;
  justify-content: end;
  z-index: 1;

  @media (max-width: 768px) {
    display: flex;
  }
`;

export const HamburgerMenuButton = styled.div`
  width: 100%;
  margin-bottom: 35px;
  padding: 0 20px;
`;
