import styled from 'styled-components';
import { COLORS } from '../../../../../../../styles';

interface IInputStyledProps {
  iconWrapperWidth: number;
}

const INPUT_PADDING_RIGHT = 35;

export const InputStyled = styled.input<IInputStyledProps>`
  width: 100%;
  background: transparent;
  color: ${COLORS.white};
  outline: none;
  border: none;
  padding-right: ${({ iconWrapperWidth }) => iconWrapperWidth}px;

  &::placeholder {
    color: ${COLORS.grayPurple};
  }
`;

export const ComponentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 18px ${INPUT_PADDING_RIGHT}px 18px 40px;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  cursor: text;
  border-top: 1px solid ${COLORS.black};
  border-bottom: 1px solid ${COLORS.black};
`;

export const IconWrapper = styled.div`
  position: absolute;
  right: ${INPUT_PADDING_RIGHT}px;
  bottom: 0;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
