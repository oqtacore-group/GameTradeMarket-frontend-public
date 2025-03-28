import styled from 'styled-components';

import { COLORS } from '@game-trade/ui/styles';

export const Wrapper = styled.div`
  cursor: pointer;
  padding: 1rem 4rem;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top left, ${COLORS.blue}, ${COLORS.pink});
`;
