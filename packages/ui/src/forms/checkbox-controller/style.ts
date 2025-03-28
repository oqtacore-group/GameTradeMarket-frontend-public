import styled, { css } from 'styled-components';

import { COLORS } from '../../styles';

export const CheckboxStyled = styled.div<{ isDisable?: boolean }>`
  position: relative;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;

  label {
    cursor: pointer;
    display: flex;
    align-items: baseline;
  }

  .value {
    margin-left: 7px;
  }

  &:last-child {
    label {
      margin-bottom: 2rem;
    }
  }

  ${({ isDisable }) =>
    isDisable &&
    css`
      pointer-events: none;

      .value {
        color: #a073a7;
      }
    `}

  .field {
    &:disabled {
      background-color: rgba(15, 9, 18, 0.2);
      border-color: #a073a7;
    }

    .wrapper {
      position: relative;
      display: flex;
    }

    height: 14px;
    width: 14px;
    appearance: none;
    border: 1px solid ${COLORS.blue};
    outline: none;
    transition-duration: 0.3s;
    background-color: transparent;
    cursor: pointer;

    & + span {
      cursor: pointer;
      font-size: 1.4rem;
    }

    &:checked {
      background-color: ${COLORS.blue};

      & + span {
        &:before {
          content: '\2713';
          display: block;
          color: ${COLORS.darkBg};
          font-size: 12px;
          position: absolute;
          top: -10%;
          left: 15%;
          bottom: 0;

          cursor: pointer;
          text-align: center;
          z-index: 1;
        }
      }
    }
  }
`;
