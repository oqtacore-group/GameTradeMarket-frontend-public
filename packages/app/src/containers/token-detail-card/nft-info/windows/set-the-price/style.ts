import styled from 'styled-components';
import { Button, COLORS, FONTS } from '@game-trade/ui';
import { shadowDarkEdgeGradient } from '@game-trade/ui/styles/mixins';
import { InputStyledFrom } from '@game-trade/ui/components/filters-games-items/form/blocks/components/input-range/style';
import { StyledButton } from '@game-trade/ui/forms/button/style';

export const ContainerForm = styled.form``;

export const ModalContent = styled.div`
  padding: 25px;
  align-items: center;
  justify-content: start;
  ${shadowDarkEdgeGradient()};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Content = styled.div`
  padding-left: 17px;
`;

export const ImageWrapper = styled.div`
  width: 200px;
  border: 1px solid black;
  background-color: ${COLORS.darkBg};
  position: relative;
`;

export const SelectCoin = styled.div`
  ${FONTS.chakra};
  color: ${COLORS.pink};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const SelectPrice = styled.div`
  ${FONTS.chakra};
  color: ${COLORS.pink};
  font-weight: 600;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    height: 48px;
    border: 1px solid ${COLORS.gray};
  }

  ${InputStyledFrom} {
    width: 100px;
  }
`;

export const ExchangeRate = styled.div`
  width: 180px;
  margin-left: 10px;
`;

export const TokenCardName = styled.div`
  ${FONTS.chakra};
  color: ${COLORS.white};
  font-weight: 600;
  font-size: 36px;
  margin-bottom: 15px;
`;

export const Header = styled.div`
  margin-bottom: 10px;
  span {
    display: block;
    ${FONTS.chakra};
    font-size: 24px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  justify-content: start;
  width: 100%;
`;

export const ConfirmModalRowButtons = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: start;

  ${StyledButton} {
    width: 180px;
  }
`;

export const ModalButton = styled(Button)`
  margin-right: 24px;

  :last-child {
    margin-right: 0;
  }
`;

export const Error = styled.div`
  color: ${COLORS.red60};
`;
