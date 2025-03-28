import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Item = styled.a`
  margin-right: 17px;
  :last-child {
    margin-right: 0;
  }

  svg {
    width: 30px;
    height: 20px;
    path {
      fill: ${COLORS.grayPurple};
    }
    fill: ${COLORS.grayPurple};

    &:hover {
      fill: ${COLORS.pink};
      path {
        fill: ${COLORS.pink};
      }
    }
  }
`;
