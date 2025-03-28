import styled from 'styled-components';
import { Button, COLORS } from '@game-trade/ui';

export const SupportedGames = styled.article`
  position: relative;
  margin-top: 13rem;
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const GamesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5rem;
  width: 50%;

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 0;
  }
`;

export const WrapperText = styled.div`
  width: 50%;
  padding-right: 10%;

  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 50px;
  }
`;

export const Game = styled.div`
  position: relative;
  width: calc(100% / 5);
  margin-bottom: 5rem;
  margin-right: 3rem;

  @media (max-width: 992px) {
    width: calc(100% / 3);
    margin-right: 0;
  }
`;

export const WrapperImage = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 65%;
`;

export const GameTitle = styled.div`
  font-family: 'ChakraPetch';
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 120%;
  width: 100%;
`;

export const ShadowBorderFill = styled.div`
  display: block;
  width: 100%;
  height: 100%;

  position: absolute;
  left: 2rem;
  top: 1rem;
  z-index: -1;
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25%)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const ButtonVisitPage = styled(Button)`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Additional = styled.h5`
  display: block;
  font-family: 'ChakraPetch';
  font-style: normal;
  font-weight: bold;
  line-height: 120%;
  color: ${COLORS.pink};

  margin-top: 2rem;
  margin-bottom: 1.3rem;
`;
