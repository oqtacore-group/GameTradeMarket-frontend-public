import styled from 'styled-components';
import { Title, SubTitle } from '../style';
import { COLORS } from '@game-trade/ui';

export const HowToSellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 120px;

  ${Title} {
    margin-bottom: 30px;
    @media (max-width: 450px) {
      font-size: 20px;
      margin-bottom: 0;
      line-height: initial;
    }
  }

  ${SubTitle} {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 15px;

    @media (max-width: 450px) {
      margin-bottom: 0;
    }
  }

  @media (max-width: 450px) {
    margin-top: 10px;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 20px;

  @media (max-width: 767px) {
    margin-top: 30px;
    flex-wrap: wrap;
  }

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;

export const Step = styled.div<{ width: number | null }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ width }) => (width ? `${45}%` : 'calc(100% / 3)')};

  @media (max-width: 767px) {
    width: 47%;
  }

  @media (max-width: 450px) {
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 23px;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  @media (max-width: 767px) {
    margin-bottom: 20px;
  }

  @media (max-width: 450px) {
    width: 120px;
  }
`;

export const Line = styled.div`
  height: 1px;
  position: absolute;
  left: 80px;
  right: 0;
  margin-left: 15px;
  background-color: ${COLORS.grayPurple};

  @media (max-width: 767px) {
    display: none;
  }
`;

export const Description = styled.div`
  margin-top: 20px;
  height: 100px;

  @media (max-width: 767px) {
    height: initial;
    margin-top: 0;
    margin-bottom: 50px;
  }

  @media (max-width: 450px) {
    width: 200px;
    height: initial;
    margin-top: 0;
  }

  @media (max-width: 600px) {
    width: 150px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
