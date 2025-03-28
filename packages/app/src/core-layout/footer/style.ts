import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

import { Item } from '../navigation/item';

export const FooterContainer = styled.footer`
  position: relative;
  padding-top: 6rem;
  background: rgba(24, 15, 29, 0.5);
`;
export const Content = styled.div`
  position: relative;
  padding-left: 39px;
  padding-right: 39px;
  @media only screen and (max-width: 600px) {
    padding: 20px;
  }
`;
export const Light_3 = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 96vw;
  height: 100vw;
  opacity: 0.5;

  background: #4e25c4;
  background: radial-gradient(
    circle at right bottom,
    #fb41ff 0%,
    #fb41ff 0%,
    rgba(0, 212, 255, 0) 62%
  );
  z-index: -1;

  @media only screen and (max-width: 768px) {
    bottom: 75%;
    height: 150vw;
    background: radial-gradient(circle at right, #fb41ff 0%, #fb41ff 0%, rgba(0, 212, 255, 0) 62%);
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: 600px) and (max-width: 1000px) {
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
`;
export const Form = styled(Row)`
  width: 30%;
  margin-right: 40px;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const LogoFooter = styled.div`
  margin-bottom: 3.5rem;
`;
export const LogoText = styled.div`
  margin-right: 20px;
  max-width: 420px;
  @media only screen and (max-width: 968px) {
    width: 37%;
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }
`;
export const SubscribeComponentWrapper = styled.div`
  max-width: 420px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    max-width: 100%;
  }
`;
export const Copyright = styled.div`
  padding: 2rem 0;
  color: ${COLORS.grayPurple};
  ${FONTS.chakra};
  font-size: 12px;
  line-height: 24px;
  font-weight: 400;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      cursor: pointer;
      text-align: right;
      margin-left: 5rem;
    }
  }

  @media only screen and (max-width: 768px) {
    ul {
      margin-top: 10px;
      li {
        text-align: right;
        margin-left: 0;
        margin-right: 10px;
      }
    }
  }
`;

export const FooterMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 40px;
  flex-wrap: wrap;
`;
export const FooterMenuItem = styled(Item)`
  margin-right: 2.5em;
  margin-bottom: 0.6em;

  :last-of-type {
    margin-right: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  @media only screen and (max-width: 1000px) {
    flex-direction: column;
    ${FooterMenu} {
      padding: 30px 0;
      margin-left: 0;
    }
  }
  @media (max-width: 600px) {
    ${FooterMenu} {
      padding-bottom: 0;
      flex-direction: column;

      &:last-child {
        padding-top: 0;
      }
    }
  }
`;

export const CopyrightWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;

  @media (max-width: 992px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const WrapperChoseLanguage = styled.div`
  margin-top: 20px;
  z-index: 10;
`;

export const WrapperSocialLinks = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: end;
  margin-top: 10px;
  padding: 0;

  @media (max-width: 992px) {
    justify-content: center;
    padding: 0;
  }
`;
