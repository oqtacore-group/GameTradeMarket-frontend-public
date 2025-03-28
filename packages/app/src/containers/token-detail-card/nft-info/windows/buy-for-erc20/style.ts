import styled from 'styled-components';
import { Button, COLORS, FONTS } from '@game-trade/ui';
import { shadowDarkEdgeGradient } from '@game-trade/ui/styles/mixins';

export const ModalContent = styled.div`
  padding: 25px;
  min-height: 150px;
  align-items: center;
  justify-content: start;
  ${shadowDarkEdgeGradient()};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ModalButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Header = styled.div`
  margin-bottom: 10px;
`;

export const Title = styled.h3`
  display: block;
  ${FONTS.chakra};
  font-size: 24px;
  span {
    color: ${COLORS.pink};
  }
`;

export const SubTitle = styled.h3`
  display: flex;
  justify-content: center;
  height: 100px;
  align-items: center;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

export const ModalButton = styled(Button)`
  width: 160px;
  margin: 15px 0 15px 10px;

  :last-child {
    margin-right: 0;
  }
`;
