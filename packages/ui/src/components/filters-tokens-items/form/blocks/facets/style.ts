import styled from 'styled-components';
import { COLORS } from '../../../../../styles';
import { Button } from '../../../../../forms/button';

export const FacetsContent = styled.div`
  padding: 20px 40px;
  border-top: 1px solid ${COLORS.black90};
`;

export const FacetsButtonsList = styled.div`
  width: 100%;
  display: grid;
  gap: 30px;
  grid-template-columns: 1fr 1fr;
`;

export const ResetButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  padding: 0 10px;

  svg {
    cursor: pointer;
    fill: ${COLORS.gray};
  }
`;

export const ApplyButton = styled(Button)``;
