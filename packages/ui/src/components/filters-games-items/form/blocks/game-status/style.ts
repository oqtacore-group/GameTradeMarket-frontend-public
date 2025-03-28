import styled from 'styled-components';
import { COLORS } from '../../../../../styles';
import { ComponentWrapper } from '../components/checkbox/style';
import { Grid } from '../../../../../modifiers/smart-grid-styled/style';

export const GameStatusContent = styled.div`
  padding: 20px 40px;
  border-top: 1px solid ${COLORS.black90};

  ${ComponentWrapper} {
    margin-bottom: 12px;
  }

  ${Grid} {
    grid-row-gap: 10px;
  }
`;

export const GameStatusButtonsList = styled.div`
  width: 100%;
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
`;

export const ResetButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const ResetButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${COLORS.gray};
  cursor: pointer;

  svg {
    cursor: pointer;
    fill: ${COLORS.gray};
  }
`;
