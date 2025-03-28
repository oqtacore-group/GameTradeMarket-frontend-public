import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

interface IInputStyledProps {
  iconWrapperWidth: number;
}

export const InputStyled = styled.input<IInputStyledProps>`
  width: 100%;
  background: transparent;
  color: ${COLORS.white};
  outline: none;
  border: none;

  &::placeholder {
    color: ${COLORS.grayPurple};
  }
`;

export const ComponentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 10px 10px 20px;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  cursor: text;
  border: 1px solid ${COLORS.black};
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: 15px;
  bottom: 0;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
