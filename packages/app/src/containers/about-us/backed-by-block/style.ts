import styled from 'styled-components';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const OurPartnersWrapper = styled.article`
  margin-top: 130px;
  display: flex;
  align-items: center;
  flex-direction: column;

  h2:after {
    width: 100%;
  }

  @media (max-width: 992px) {
    margin-top: 50px;
  }
`;

export const PartnersWrapper = styled.article`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  row-gap: 30px;
  max-width: 770px;
  width: 100%;

  * + * {
    margin-left: 50px;
  }

  @media (max-width: 992px) {
    img {
      width: auto;
      max-width: 350px;
      max-height: 150px;
      margin: 0;
    }
  }
`;
