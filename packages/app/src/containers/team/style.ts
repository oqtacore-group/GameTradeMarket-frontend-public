import styled from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS } from '@game-trade/ui';

export const Wrapper = styled.div`
  margin: 0 20px 58px 20px;
`;

export const Content = styled.div`
  max-width: 1064px;
  margin: 0 auto 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 47px;
  margin-top: 60px;
  margin-bottom: 22px;
`;

export const List = styled.div<{ isMobile?: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'column1 column2 column3';
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: 'column1 column2';
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-areas: 'column1';
  }
`;

export const ItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  break-inside: avoid;
`;

export const WrapperImage = styled.div`
  min-height: 300px;
  position: relative;
  width: 100%;
  background-color: ${COLORS.darkBg};
`;

export const Position = styled.div`
  font-size: 16px;
  color: ${COLORS.blue};
`;

export const WrapperInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 250px;
  position: relative;
  padding: 15px 20px;
  background-color: ${rgba('#150C1A', 1)};
  z-index: 1;
`;

export const Name = styled.div`
  font-size: 20px;
  color: ${COLORS.pink};
  padding-bottom: 10px;
`;

export const Stroke = styled.hr`
  margin: 0;
  z-index: -1;

  &::after {
    margin-top: 0;
    background-color: black;
  }
`;

export const Description = styled.div`
  font-size: 14px;
  color: white;
  padding-top: 15px;
`;
