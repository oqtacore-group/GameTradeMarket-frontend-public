import styled, { css } from 'styled-components';

import { COLORS } from '../../../styles';
import { Button } from '../../../forms/button';

export const GameCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;
  box-shadow: 0px -10px 50px #00000038;
  background-repeat: no-repeat;
`;

export const GameImageContainer = styled.div`
  position: relative;
  height: 260px;

  @media (max-width: 576px) {
    font-size: 45rem;
  }
`;

export const GameInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 1rem 2rem;
  margin: auto;
  width: calc(100% - 4px);
  height: 80px;

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

export const EmptyTokenImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 9px;
  left: 10px;
  font-size: 12px;
  z-index: 1;
`;

export const Pills = styled.div<{ color: string; svg: boolean; newGame?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ svg }) => (svg ? '2px' : '0 7px')};
  color: black;
  margin-right: 5px;

  ${({ color, svg }) => {
    if (color === 'white') {
      return css`
        background-color: white;
        svg {
          fill: black;
        }
      `;
    }

    if (color === 'pink' && svg) {
      return css`
        background-color: ${COLORS.pink};
        svg {
          fill: white;
        }
      `;
    }

    if (color === 'blue' && svg) {
      return css`
        background-color: ${COLORS.blue};
        svg {
          fill: white;
        }
      `;
    }
  }}

  ${({ newGame }) => {
    if (newGame) {
      return css`
        color: white;
        text-transform: uppercase;

        background-repeat: no-repeat;
        background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            ${COLORS.pink} calc(50% - 1px),
            ${COLORS.pink} calc(50% + 0.5px),
            ${COLORS.pink} calc(25% + 1px)
          ),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink});
        background-size: 1px 100%, 1px 80%, 100% 1px, calc(100% - 5px) 1px, 5px 5px, 100% 100%,
          100% 100%;
        background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -5px 0, 0% -5px;
        z-index: 2;
        transition: 0.5ms;
      `;
    }
  }}
`;

export const GameName = styled.div`
  font-size: 16px;
  font-family: 'ChakraPetch';
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ActionButton = styled(Button)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
