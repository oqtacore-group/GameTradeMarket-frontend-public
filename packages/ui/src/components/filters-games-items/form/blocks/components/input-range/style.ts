import styled from 'styled-components';
import { COLORS } from '../../../../../../styles';

export const InputStyled = styled.div`
  width: 100%;
  background: transparent;

  input {
    width: 100%;
    text-align: center;
    color: ${COLORS.white};
    background: rgba(15, 9, 18, 0.2);
    border: 1px solid ${COLORS.black90};

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${COLORS.grayPurple};
    }
  }
`;

export const InputStyledFrom = styled(InputStyled)`
  grid-area: inputFrom;
`;
export const InputStyledTo = styled(InputStyled)`
  grid-area: inputTo;
`;

export const SeparatorWrapper = styled.div`
  grid-area: separator;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
`;

export const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.div`
  width: 100%;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
  padding-bottom: 5px;
`;

export const ValueWrapper = styled.div`
  display: grid;
  grid-template: 'inputFrom separator inputTo' auto / 1fr 30px 1fr;
  flex-direction: row;
  width: 100%;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.5px;
`;
