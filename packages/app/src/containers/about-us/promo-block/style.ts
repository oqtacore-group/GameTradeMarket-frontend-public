import styled from 'styled-components';
import { Button } from '@game-trade/ui';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const WrapperContent = styled.article`
  min-height: 40vw;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TextWrapper = styled.article`
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MascotWrapper = styled.article`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Mascot = styled.article`
  width: 100%;

  @media (max-width: 992px) {
    width: 50rem;
    position: relative;
    background-size: cover;
    background-position: 100%;
  }

  @media (max-width: 768px) {
    margin-top: 4rem;
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    background-size: cover;
    background-position: 100%;
  }
`;

export const ExploreButton = styled(Button)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Headline = styled.h1`
  position: relative;

  & + p {
    margin-top: 1.4rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 1200px) {
    font-size: 8rem;
  }

  @media (max-width: 992px) {
    font-size: 36px;
    font-weight: 600;
  }
`;

export const LineBreakHeadline = styled.br`
  display: block;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const LineBreakHeadlineMobile = styled.br`
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
`;
