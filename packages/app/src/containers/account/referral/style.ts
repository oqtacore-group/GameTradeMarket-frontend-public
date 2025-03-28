import styled, { css } from 'styled-components';
import { COLORS, shadowBorderEdgeGradient } from '@game-trade/ui';

export const ReferralContainer = styled.div`
  position: relative;
`;

export const CopyWrapper = styled.div<{ copy: boolean }>`
  position: relative;
  margin-top: auto;
  display: inline-block;
  font-size: 18px;
  margin-left: 5px;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 7px;
  }

  ${({ copy }) =>
    copy &&
    css`
      &:after {
        display: block;
        content: 'promo code copied';
        color: white;
        padding: 1rem;
        position: absolute;
        right: 0;
        top: -100%;
        text-align: center;
        background-color: ${COLORS.darkBg};
        font-size: 10px;
        line-height: 1;
        border-radius: 0.5rem;
        border: 1px solid ${COLORS.blue};
      }
    `}
`;

export const PopUpWindow = styled.div`
  padding: 10px;
  width: 40%;
  position: absolute;
  line-height: 1.2;
  top: -5%;
  font-size: 14px;
  color: white;

  ${shadowBorderEdgeGradient()};
  z-index: -1;

  opacity: 0;
  transition: 0.3s;
`;

export const PromoCode = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: ${COLORS.grayPurple};
  margin-bottom: 10px;

  svg {
    margin-right: 5px;
    height: 20px;
    width: 20px;
    cursor: help;

    &:hover {
      & + ${PopUpWindow} {
        //display: block;
        opacity: 1;
        transition: 0.3s;
        z-index: 1;
      }
    }

    path {
      fill: ${COLORS.grayPurple};
    }
  }
`;
