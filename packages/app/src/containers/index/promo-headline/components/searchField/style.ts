import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperGames = styled.div`
  width: 420px;
  min-height: 63px;
  position: absolute;
  right: 0;
  background-color: ${COLORS.darkBg};
  z-index: 8;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;

  @media (max-width: 768px) {
    margin-top: 25px;
  }
`;

export const Game = styled.div`
  display: block;
  cursor: pointer;
`;

export const WrapperGame = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px;

  &:not(:first-child) {
    border-top: 1px solid ${COLORS.grayPurple};
  }
`;

export const WrapperImage = css`
  position: relative;
  height: 50px;
  width: 75px;
  margin-right: 10px;
`;

export const GamesNotFound = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
`;

export const NotFound = styled.div`
  text-decoration: underline;
  cursor: pointer;
  margin-left: 10px;
`;
