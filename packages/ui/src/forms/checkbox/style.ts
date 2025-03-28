import styled from 'styled-components';

import { FONTS, COLORS } from '../../styles';

export const Label = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const InnerLabel = styled.span`
  ${FONTS.baiJamjuree};
  font-weight: 400;
  color: ${COLORS.white};
  display: inline-block;
  margin-left: 10px;
  flex-basis: fit-content;
`;
