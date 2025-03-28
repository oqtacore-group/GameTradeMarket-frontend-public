import styled from 'styled-components';
import { COLORS } from '../../../../../styles';
import { ComponentWrapper } from '../components/checkbox/style';

export const BlockchainContent = styled.div`
  padding: 20px 40px;
  border-top: 1px solid ${COLORS.black90};

  ${ComponentWrapper} {
    margin-bottom: 12px;
  }
`;
