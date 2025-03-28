import styled from 'styled-components';
import { borderGradientMenu } from '@game-trade/ui/styles/mixins';
import { COLORS } from '@game-trade/ui/styles/colors';

export const ModalContent = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '0 0 20px' : '17px 20px')};
  background: ${COLORS.darkBg};
  ${borderGradientMenu()};
`;

export const ModalHeader = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '17px 20px 0' : '0')};
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const SubTitle = styled.div`
  font-size: 17px;
`;

export const WrapperImage = styled.div`
  position: relative;
  margin-right: 20px;
  width: 12%;
  display: flex;
  justify-content: center;
`;

export const Description = styled.div`
  font-size: 16px;
  margin: 10px 0 20px;
`;

export const WrapperRules = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Rule = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export const Headline = styled.div`
  font-size: 18px;
  color: ${COLORS.pink};
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LeftContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  margin-right: 44px;
`;

export const RightContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;

export const ContentAbout = styled.div``;
