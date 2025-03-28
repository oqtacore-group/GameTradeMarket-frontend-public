import styled, { css } from 'styled-components';
import { rgba } from 'polished';

export const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 68px;
  width: 100%;
  border-top: 1px solid #0f0912;
  border-bottom: 1px solid #0f0912;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

export const Tab = styled.div<{ isActive?: boolean; isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: ${({ isActive }) => (isActive ? '#FF41B3' : '#A073A7')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer;')};
  background: ${rgba('#180F1D', 0.7)};

  &:before {
    content: '';
    position: absolute;
    right: 0;
    height: 100%;
    width: 1px;
    background: #0f0912;
  }

  last-child {
    &:before {
      display: none;
    }
  }
`;

export const TabCounter = styled.div`
  margin-left: 8px;
  color: #379fff;
`;

export const LoaderBox = styled.div`
  position: relative;
  margin-left: 8px;
  height: 16px;
  width: 16px;
`;

export const SelectWrapper = styled.div<{ isOpen?: boolean }>`
  display: flex;
  justify-content: center;
`;

export const SelectPopup = styled.div<{
  isOpen?: boolean;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
}>`
  position: absolute;
  left: ${({ left }) => left || 0}px;
  top: ${({ top, height }) => (top && height ? top + height : 0)}px;
  width: ${({ width }) => width || 0}px;
  display: none;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #180f1d;
  ${({ isOpen }) =>
    isOpen &&
    css`
      display: flex;
      clip-path: polygon(
        0% 0,
        0 0%,
        0 0%,
        100% 0,
        100% calc(100% - 20px),
        calc(100% - 20px) 100%,
        0 100%,
        0% calc(100%)
      );
    `}
  overflow: hidden;

  &:before {
    z-index: 1;
    position: absolute;
    bottom: 10px;
    left: calc(100% - 24px);
    content: '';
    width: 31px;
    height: 1px;
    transform: rotate(-45deg);
    background: #180f1d;
  }
`;

export const SelectOption = styled.div<{ isActive?: boolean; isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 18px;
  height: 100%;
  width: 100%;
  position: relative;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: ${({ isActive }) => (isActive ? '#FF41B3' : '#ffffff')};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer;')};
  background: ${rgba('#180F1D', 0.95)};
  height: 50px;

  &:hover {
    color: #379fff;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: #180f1d;
  }

  last-child {
    &:before {
      display: none;
    }
  }
`;

export const SelectValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  background: ${rgba('#180F1D', 0.7)};
  height: 50px;
  padding: 0 12px 0 18px;

  &:hover {
    color: #ff41b3;
  }

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: #180f1d;
  }

  last-child {
    &:before {
      display: none;
    }
  }
`;

export const SelectIconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  height: 24px;
  align-items: center;
  padding-left: 20px;

  svg {
    width: 12px;
    height: 7px;
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
  }
`;
