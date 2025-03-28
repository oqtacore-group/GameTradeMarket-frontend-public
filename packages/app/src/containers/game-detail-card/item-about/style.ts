import styled from 'styled-components';
import { gradientText, gradientBorder } from '@game-trade/ui';

export const AboutWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const AboutTitle = styled.div`
  font-size: 32px;
  margin-bottom: 18px;
`;

export const GameDescription = styled.h2`
  font-size: 17.3px;
  line-height: 1.5;
  display: flex;
`;

export const SocialNetworks = styled.div`
  display: flex;
  flex-wrap: wrap;
  a {
    margin-right: 20px;
  }

  @media only screen and (max-width: 600px) {
    a {
      margin-right: 0;
      svg {
        margin-top: 12px;
        margin-right: 20px;
      }
    }
  }
`;

export const LoaderWrapper = styled.div`
  position: relative;
  height: 100px;
`;

export const LinkGameSite = styled.div`
  margin-top: 20px;
  margin-bottom: 15px;

  a {
    ${gradientText};
    position: relative;
    padding-bottom: 5px;

    ${gradientBorder(1)};
  }
`;
