import styled, { createGlobalStyle, css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainImage = styled.div<{ isVideo: boolean }>`
  display: flex;
  flex-direction: row;
  position: relative;
  padding-bottom: clamp(10rem, 100%, 60rem);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    padding-bottom: clamp(10rem, 100%, 25rem);
  }

  ${({ isVideo }) =>
    isVideo &&
    css`
      padding-bottom: 0;
      height: 60rem;
      width: 100%;
    `}

  clip-path: polygon(100% 0,100% 94%,97% 100%,0 100%,0 0);
`;

export const VideoClasses = createGlobalStyle`
  .videoSlideWrapper {
    width: 19rem;
    height: 9rem;
  }
`;

export const WrapperPills = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
`;

export const Pill = styled.div`
  padding: 0 7px;
  font-size: 15px;
  margin-right: 10px;
`;

export const RowBlue = styled.div`
  display: flex;
  margin-top: 10px;

  ${Pill} {
    background-color: ${COLORS.blue};
  }
`;

export const RowWhite = styled.div`
  display: flex;

  ${Pill} {
    background-color: white;
    color: black;
  }
`;

export const RowPink = styled.div`
  display: flex;
  margin-top: 10px;
  ${Pill} {
    background-color: ${COLORS.pink};
  }
`;
