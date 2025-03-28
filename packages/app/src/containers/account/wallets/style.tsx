import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import Tooltip from '@mui/material/Tooltip';
import { styled as styledMui } from '@mui/material/styles';
import { Button, COLORS, FONTS } from '@game-trade/ui';

export const ListWallets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  min-height: 300px;
  position: relative;
`;

export const Block = styled.div`
  margin-bottom: 14px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const WalletItemStyled = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 45px 34px 36px;
  background-color: ${rgba(COLORS.black, 0.7)};
  margin-bottom: 20px;
`;
export const MainWallet = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 6px 13px;
  text-transform: uppercase;
  ${FONTS.chakra};
  font-size: 9px;
  line-height: 12px;
  color: ${COLORS.white};
  width: 60px;
  background-color: ${COLORS.blue};
`;

export const WalletTitleWrapper = styled.div`
  display: flex;
  align-items: start;
  position: relative;

  svg {
    cursor: pointer;
  }
`;
export const WalletTitle = styled.div`
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 21px;
  line-height: 21px;
  color: ${COLORS.pink};
  margin-right: 12px;
  margin-top: -2px;
`;

export const WalletType = styled.div`
  ${FONTS.chakra};
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  cursor: pointer;

  span:first-child {
    color: ${COLORS.gray};
    display: inline-block;
    margin-right: 9px;
  }
`;
export const CurrencyList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CurrencyItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  background-color: ${COLORS.black90};
  text-transform: uppercase;
  ${FONTS.chakra};
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
  white-space: nowrap;
  cursor: pointer;

  :last-child {
    margin-right: 0;
  }
`;
export const ButtonsList = styled.div`
  display: flex;
  width: 100%;
  align-items: end;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
  }
`;

export const AddWalletStyled = styled.div`
  display: flex;
  align-items: center;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.pink};
  cursor: pointer;
`;
export const ButtonDisconnect = styled(Button)`
  margin-left: auto;
  padding: 0;
  color: ${COLORS.pink} !important;
  width: 135px;
`;

export const TooltipStyled = styledMui(({ className, ...props }: any) => {
  return <Tooltip {...props} classes={{ popper: className }} />;
})`
  & .MuiTooltip-tooltip {
    background-color: ${COLORS.black90};
    font-family: 'ChakraPetch', sans-serif !important;
    font-size: 14px !important;
    opacity: 0.8;
  }
  & .MuiTooltip-arrow {
    color: ${COLORS.black90};
    opacity: 0.8;
  }
`;

export const FormatUnitsBalances = styled.div`
  span:first-child {
    color: ${COLORS.blue};
    display: inline-block;
    margin-right: 5px;
  }

  span:last-child {
    color: ${COLORS.white};
    display: inline-block;
  }
`;

export const TooltipTitleStyled = styled.div<{ isMouseDown: boolean }>`
  ${({ isMouseDown }) => {
    if (isMouseDown) {
      return css`
        background-color: coral;
      `;
    }
  }}
`;
