import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  cursor: pointer;
  @media (max-width: 767px) {
    max-width: 100px;
    margin: 0 auto;
  }
`;

export const AvatarImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  border: 2px solid ${COLORS.pink};
  background: linear-gradient(59.29deg, #ff41b3 20.25%, #9f6ed7 58.46%, #379fff 100%);

  svg {
    width: 37px;
    height: 37px;
  }
`;
export const WrapperArrow = styled.div`
  padding: 13px;

  svg {
    fill: ${COLORS.blue};
  }
`;

export const WrapperDefaultAvatar = styled.div`
  svg {
    stroke: ${COLORS.blue};
    fill: ${COLORS.blue};
    path {
      stroke: ${COLORS.pink};
      fill: ${COLORS.pink};
    }
    circle {
      stroke: ${COLORS.blue};
      fill: ${COLORS.blue};
    }
  }
`;
