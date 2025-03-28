import styled from 'styled-components';
import { FONTS } from '@game-trade/ui';

export const Wrapper = styled.div`
  margin: 0 20px 58px 20px;
`;

export const Content = styled.div`
  max-width: 1064px;
  margin: 0 auto 0 auto;
  text-align: center;

  h4 {
    margin-bottom: 20px;
  }
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

export const GoogleCalendar = styled.iframe`
  border: 0;
  border-radius: 5px;
  width: 100%;
  height: 75vh;
  filter: invert(1) saturate(1.4) hue-rotate(225deg);

  @media (max-width: 768px) {
  }

  @media (max-width: 520px) {
  }
`;
