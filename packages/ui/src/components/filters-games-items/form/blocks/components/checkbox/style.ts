import styled from 'styled-components';
import { COLORS } from '../../../../../../styles';

export const CheckboxWrapperStyled = styled.div<{ disabled: boolean }>`
  position: relative;
  width: 16px;
  height: 16px;
  margin: 0;
  background: transparent;
  outline: none;
  border: 1px solid ${({ disabled }) => (disabled ? COLORS.gray : COLORS.blue)};
  cursor: pointer;

  & input {
    position: absolute;
    top: -1px;
    left: -1px;
    width: 16px;
    height: 16px;
    opacity: 0;
    z-index: 1;
    cursor: pointer;

    & + span {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 14px;
      height: 14px;
      cursor: pointer;
      font-size: 12px;
    }

    :checked {
      & + span {
        background-color: ${({ disabled }) => (disabled ? 'rgba(15, 9, 18, 0.2)' : COLORS.blue)};

        &:before {
          content: '\\2713';
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${COLORS.darkBg};
          font-size: 12px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          cursor: pointer;
          text-align: center;
        }
      }
    }
  }
  }
`;

export const ComponentWrapper = styled.div<{ disabled: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${({ disabled }) => (disabled ? COLORS.gray : COLORS.white)};
`;

export const Label = styled.label`
  line-height: 20px;
  cursor: pointer;
  margin-left: 10px;
  user-select: none;
  color: inherit;
`;

export const GroupLabel = styled.div`
  width: 100%;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
  padding-bottom: 5px;
`;

export const CheckboxGroupStyled = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};

  ${ComponentWrapper} {
    ${({ direction }) => (direction === 'column' ? 'margin-bottom: 5px' : 'margin-right: 5px')};

    &:last-child {
      margin-bottom: 0;
      margin-right: 0;
    }
  }
`;
