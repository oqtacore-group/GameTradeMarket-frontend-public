import styled from 'styled-components';
import { COLORS } from '../../../../../../styles';

export const RadioGroupStyled = styled.div<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
`;

export const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  padding: 3px 0;
  margin-bottom: 10px;

  * {
    cursor: pointer;
  }
`;

export const RadioButtonComponent = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid ${COLORS.gray};
  border-radius: 50%;

  &::before {
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    background: ${COLORS.blue};
    border-radius: 50%;
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transition: opacity 200ms ease-out;
  }
`;

export const RadioButtonLabel = styled.label<{ checked: boolean }>`
  max-width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  color: ${({ checked }) => (checked ? COLORS.pink : COLORS.white)};
  transition: color 200ms ease-out;
  margin-left: 7px;
`;
