import styled from 'styled-components';
import { Button } from '@game-trade/ui';
import { shadowBorderEdgeGradient } from '@game-trade/ui/styles/mixins';

export const ContainerForm = styled.form``;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  font-size: 18px;
  ${shadowBorderEdgeGradient()};
`;

export const ModalButton = styled(Button)`
  margin-top: 24px;
  height: 25px;
  width: 70px;

  :last-child {
    margin-right: 0;
  }
`;
