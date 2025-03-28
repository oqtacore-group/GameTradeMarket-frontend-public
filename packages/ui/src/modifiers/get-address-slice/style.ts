import styled, { css } from 'styled-components';

import { COLORS } from '../../styles';

export const AddressTextWrapper = styled.div`
  display: flex;
`;

export const AddressText = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 7vw;
  white-space: nowrap;
`;

export const AddressWrapper = styled.div<{ copy: boolean }>`
  display: flex;
  align-items: flex-end;

  ${({ copy }) => {
    if (copy) {
      return css`
        color: ${COLORS.grayPurple};
        cursor: pointer;
      `;
    } else {
      return css`
        color: white;
      `;
    }
  }}
`;

export const Clipboard = styled.button<{ hiddenTooltip: boolean }>`
  &:active {
    svg {
      path {
        stroke: ${COLORS.pink};
      }
    }
  }

  ${({ hiddenTooltip }) => {
    if (!hiddenTooltip) {
      return css`
        position: relative;

        &:after {
          display: block;
          content: 'Copied!';
          color: white;
          min-width: 100px;
          position: absolute;
          top: -100%;
          left: 0;
          background-color: ${COLORS.darkPurple};
          font-size: 10px;
          border-radius: 0.5rem;
          border: 1px solid ${COLORS.blue};
        }
      `;
    }
  }}
`;
