import styled from 'styled-components';
import { borderGradientMenu } from '@game-trade/ui/src/styles/mixins';
import { COLORS } from '@game-trade/ui/src/styles/colors';

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
  width: 100%;
  padding-bottom: clamp(10rem, 100%, 30rem);
`;

export const Description = styled.div`
  font-size: 17px;
  margin: 20px 0;
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Date = styled.div`
  font-size: 17px;
  color: ${COLORS.grayPurple};
`;

export const Published = styled.div`
  font-size: 17px;
  color: ${COLORS.grayPurple};
`;

export const NotPublished = styled.div`
  font-size: 17px;
  display: flex;
  align-items: center;
  width: 100%;
  color: ${COLORS.grayPurple};
`;

export const Author = styled.span`
  font-size: 17px;
  color: ${COLORS.pink};
`;

export const GameBlogPostWrapper = styled.div`
  flex: 0 0 calc(50% - 10px);
`;

export const PostsWrapper = styled.div`
  max-height: 70vh;
  overflow-y: scroll;
  padding: 0 20px 50px;
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  gap: 20px;
  width: 100%;

  &::-webkit-scrollbar-thumb {
    background-color: #a073a7;
  }

  &::-webkit-scrollbar-track {
    background-color: rgba(160, 115, 167, 0.2);
  }

  &::-webkit-scrollbar {
    width: 10px;
  }
`;
