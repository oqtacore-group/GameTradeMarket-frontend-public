import styled from 'styled-components';
import { GetMediaSizes, gradientText } from '@game-trade/ui';

export const CarouselPromoWrapper = styled.div`
  width: 100%;
  position: relative;
  margin-top: 40px;

  @media (max-width: ${GetMediaSizes.mobile_576}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Home = styled.div`
  position: relative;
`;

export const HomeWrapper = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0 50px;

  @media (max-width: 1440px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    padding: 0 20px;
  }
`;

export const Title = styled.h3`
  padding: 0 1px;
  display: flex;
  position: relative;
  font-size: 36px;
  font-weight: 600;
  line-height: 30px;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 2px;
    left: 2px;
    opacity: 1;
    z-index: -1;
    -webkit-text-stroke: 2px #ff41b3;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    margin-bottom: 0 !important;
  }
`;

export const SubTitle = styled.h3`
  display: flex;
  position: relative;

  margin-top: 20px;
  padding-bottom: 5px;
  ${gradientText};

  text-transform: uppercase;
`;

export const Browse = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  border-bottom: 2px solid white;

  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const WrapperTransaction = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;

  ${Title} {
    font-size: 20px;
    margin-bottom: 30px !important;
  }
`;
