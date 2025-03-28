import styled from 'styled-components';
import { COLORS } from '../../../../styles';

export const FilterBlockWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FilterBlockHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: 20px 40px;

  align-items: center;
  position: relative;
`;

export const CurrencyFilterBlockHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  margin: 10px 0 10px 0;
  align-items: center;
`;

export const FilterBlockContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FilterBlockTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

export const CurrencyFilterBlockTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 0 5px;
`;

export const FilterBlockTitleIconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 10px;

  svg {
    width: 12px;
    height: 7px;
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
  }
`;

export const CheckboxWrapper = styled.div<{ disabled: boolean }>`
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
    top: 0;
    left: 0;
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
      font-size: 12px;
      cursor: pointer;
    }

    :checked {
      & + span {
        background-color: ${({ disabled }) => (disabled ? 'rgba(15, 9, 18, 0.2)' : COLORS.blue)};

        &:before {
          content: '';
          display: block;
          width: 10px;
          height: 2px;
          background-color: ${COLORS.darkBg};
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          cursor: pointer;
        }
      }
    }
  }
`;
