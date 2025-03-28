import styled from 'styled-components';
import { Button, COLORS, FONTS } from '@game-trade/ui';
import { shadowBorderEdgeGradient } from '@game-trade/ui/styles/mixins';

export const ContainerForm = styled.form``;

export const ModalContent = styled.div`
  padding: 40px;
  align-items: center;
  justify-content: start;
  ${shadowBorderEdgeGradient()};
`;

export const Header = styled.div`
  ${FONTS.chakra};
  font-size: 20px;
  line-height: 24px;
  text-align: left;
  margin-bottom: 10px;
  @media (max-width: 767px) {
    text-align: center;
  }

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
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const NetworkWalletItem = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: 15px 70px 15px 44px;
  justify-content: space-between;
  border: 1px solid rgb(160, 115, 167);
  cursor: pointer;
  @media (max-width: 767px) {
    margin-bottom: 10px;
  }

  span {
    ${FONTS.chakra};
    font-weight: 600;
    font-size: 15px;
    line-height: 19px;
    color: ${COLORS.white};
    cursor: pointer;
  }

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

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.grayPurple};
  margin-bottom: 25px;
`;
