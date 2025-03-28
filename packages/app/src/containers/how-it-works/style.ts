import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const PageWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

export const Light1 = styled.div`
  position: absolute;
  top: -350px;
  right: -150px;
  width: 96vw;
  height: 100vw;
  opacity: 0.5;

  background: #4e25c4;
  background: radial-gradient(circle at right top, #4e25c4 0, rgba(0, 212, 255, 0) 62%);
  z-index: -1;
`;
export const PageContentWrapper = styled.div`
  display: grid;
  grid-template: 'header content' auto / minmax(220px, 30%) 1fr;
  padding: 66px 40px;

  @media (max-width: 768px) {
    padding: 0 0 49px;
    grid-template:
      'header' auto
      'content' auto;
  }

  @media (max-width: 320px) {
    padding: 0 0 26px;
    grid-template:
      'header' auto
      'content' auto;
  }
`;

export const Header = styled.div`
  grid-area: header;
  display: flex;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 47px;

  @media (max-width: 768px) {
    padding: 49px 40px 20px;
    font-size: 24px;
    line-height: 31px;
    border-bottom: 1px solid ${COLORS.black};
  }

  @media (max-width: 320px) {
    padding: 26px 20px 9px;
    font-size: 24px;
    line-height: 31px;
    border-bottom: 1px solid ${COLORS.black};
  }
`;

export const Content = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
`;
