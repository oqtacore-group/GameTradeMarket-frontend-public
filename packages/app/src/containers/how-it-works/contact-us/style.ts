import styled from 'styled-components';
import { FONTS } from '@game-trade/ui';

export const ContactUsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 20px 67px;

  @media (max-width: 768px) {
    padding: 40px 40px 47px;
  }

  @media (max-width: 320px) {
    padding: 46px 20px 44px;
  }
`;

export const Title = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 31px;
  }
`;

export const Description = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 18px;
  }
`;

export const ButtonWrapper = styled.div``;
export const ButtonsList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  ${ButtonWrapper} {
    margin-right: 14px;

    &:last-child {
      margin-right: 0;
    }
  }

  @media (max-width: 320px) {
    flex-direction: column;

    ${ButtonWrapper} {
      margin-right: 0;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
