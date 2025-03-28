import styled, { css } from 'styled-components';
import { COLORS, borderGradientMenu } from '@game-trade/ui';

export const ModalContent = styled.div<{ padding?: boolean }>`
  padding: 23px 0;
  background: ${COLORS.darkBg};
  ${borderGradientMenu()};
`;

export const ModalWrapperWallet = styled.div`
  padding: 20px 50px;
`;

export const ModalHeader = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '17px 20px 0' : '0')};
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ModalHeaderPending = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '17px 20px 0' : '0')};
  margin-bottom: 120px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: ${COLORS.pink};
`;

export const SubTitle = styled.div`
  font-size: 17px;
`;

export const Error = styled.div`
  font-size: 17px;
  margin-top: 10px;
  color: red;
`;

export const ContainerForm = styled.form``;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Description = styled.div`
  font-size: 17px;
  margin-bottom: 10px;
  color: ${COLORS.pink};
`;

export const ExchangeRate = styled.div`
  width: 180px;
  margin-left: 10px;
`;

export const ModalFooter = styled.div`
  font-size: 17px;
  margin-top: 20px;
  color: ${COLORS.grayPurple};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WrapperCount = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  input {
    height: 40px;
  }
`;

export const WrapperButton = styled.span`
  width: 180px;
`;

export const ListWallets = styled.div``;

export const WalletAddress = styled.div`
  margin-bottom: 5px;
`;

export const WalletBalance = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 140%;
  color: ${COLORS.pink};
`;

export const WalletItem = styled.div<{ isActive?: boolean }>`
  position: relative;
  padding: 10px 15px;
  border: 1px solid ${COLORS.grayPurple};
  margin-bottom: 15px;

  ${({ isActive }) =>
    isActive &&
    css`
      ${borderGradientMenu()};
    `}
`;
