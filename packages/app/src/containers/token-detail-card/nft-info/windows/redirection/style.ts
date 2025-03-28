import styled from 'styled-components';
import { COLORS, FONTS, shadowDarkEdgeGradient } from '@game-trade/ui';
import { Button } from '../../style';

export const ModalContent = styled.div`
  padding: 25px;
  min-height: 150px;
  align-items: center;
  justify-content: start;
  ${shadowDarkEdgeGradient()};
`;

export const Header = styled.h4`
  display: block;
  text-align: center;
  ${FONTS.chakra};
  font-size: 24px;
  text-transform: uppercase;
  color: ${COLORS.pink};
  margin: 0 auto 20px;
`;

export const Description = styled.p`
  margin-bottom: 10px;
  text-align: center;

  b {
    background-color: ${COLORS.pink};
    padding: 0 2px 2px;
    border-radius: 4px;
    cursor: alias;
    color: ${COLORS.white};
  }

  &:nth-child(3) {
    font-size: 13px;
    color: ${COLORS.grayPurple};
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 20px;

  ${Button} {
    cursor: alias;
    margin: 0;
  }
`;

export const WrapperCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  p {
    font-size: 14px;
    margin-left: 5px;
    margin-bottom: 0;
  }
`;
