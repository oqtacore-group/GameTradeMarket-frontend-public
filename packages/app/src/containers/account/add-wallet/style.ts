import styled, { css } from 'styled-components';
import { Button, COLORS, FONTS } from '@game-trade/ui';
import { shadowBorderEdgeGradient } from '@game-trade/ui/src/styles/mixins';

export const ContainerForm = styled.form``;

export const ModalContent = styled.div`
  padding: 25px;
  align-items: center;
  justify-content: start;
  ${shadowBorderEdgeGradient()};
`;

export const Header = styled.div`
  ${FONTS.chakra};
  text-transform: uppercase;
  padding: 0 21px 21px;
  font-size: 20px;
  line-height: 24px;
  color: ${COLORS.pink};
  text-align: center;

  span > span {
    color: ${COLORS.blue};
  }
`;

export const ConfirmModalRowButtons = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px 0;
  justify-content: start;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const NetworkWalletList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export const NetworkWalletItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 21px 40px 21px 44px;
  justify-content: space-between;
  border-top: 1px solid ${COLORS.black90};

  span {
    ${FONTS.chakra};
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLORS.white};
    cursor: pointer;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      > span {
        color: ${COLORS.pink};
      }
    `};

  :hover {
    > span {
      color: ${COLORS.pink};
    }
  }
`;

export const NetworkWalletItemLabel = styled.div`
  display: flex;
  align-items: center;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }
`;

export const ModalButton = styled(Button)`
  margin-right: 24px;

  :last-child {
    margin-right: 0;
  }
`;

export const Notification = styled.div`
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
