import styled from 'styled-components';
import { Button, COLORS, FONTS } from '@game-trade/ui';

export const DisconnectConfirmStyled = styled.div``;

export const Header = styled.div`
  ${FONTS.chakra};
  padding: 24px 24px 20px 24px;
  font-size: 20px;
  line-height: 24px;
  color: ${COLORS.white};
`;

export const ConfirmModalRowButtons = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px auto;
  justify-content: flex-end;
`;

export const ModalButton = styled(Button)`
  margin-right: 24px;
  position: relative;

  :last-child {
    margin-right: 0;
  }
`;
