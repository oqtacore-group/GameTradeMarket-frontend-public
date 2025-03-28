import styled, { css } from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const Search = styled.input`
  width: 100%;
  padding-left: 1.2rem;
  ${FONTS.chakra}
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 21px;
  color: white;
  background-color: initial;
  border: 0;
  z-index: 2;

  &::placeholder {
    color: ${COLORS.grayPurple};
  }

  &:focus {
    outline: initial;
  }

  + svg {
    cursor: pointer;
    margin-right: 3.2rem;
  }
`;

export const Stroke = styled.div`
  &:after {
    content: '';
    position: absolute;
    width: 1px;
    top: 0;
    bottom: 0;
    height: 100%;
    display: block;
    background-color: ${COLORS.black};
    margin-left: -0.85rem;
  }
`;
export const StrokeNav = styled.div<{ isMarketplacePage: boolean }>`
  ${({ isMarketplacePage }) =>
    isMarketplacePage &&
    css`
      &:after {
        content: '';
        position: absolute;
        width: 1px;
        top: 0;
        bottom: 0;
        height: 100%;
        display: block;
        background-color: ${COLORS.black};
      }
    `}
`;

export const Row = styled.div<{ direction?: string; justifyContent?: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
`;

export const HeaderStyled = styled.header<{ isMarketplacePage: boolean }>`
  display: flex;
  margin: 0 auto;
  padding: 16px 50px;
  justify-content: space-between;
  align-items: center;
  z-index: 1;

  ${({ isMarketplacePage }) =>
    isMarketplacePage &&
    css`
      ${Stroke} {
        position: relative;
        border-bottom: 1px solid ${COLORS.black};
      }
    `};

  @media only screen and (max-width: 768px) {
    padding: 20px;

    .desktopMenu {
      display: none;
    }
  }

  @media (min-width: 576px) and (max-width: 991px) {
    padding: 20px;
    max-width: 100%;
  }
`;
