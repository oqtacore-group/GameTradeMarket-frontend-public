import styled from 'styled-components';
import { shadowBorderEdgeGradient } from '../../../../../styles/mixins';
import { COLORS } from '../../../../../styles';
import { ComponentWrapper } from '../components/checkbox/style';

export const PopUpWindow = styled.div`
  //display: none;
  width: 200px;
  padding: 10px;
  position: absolute;
  top: 80%;
  font-size: 14px;

  ${shadowBorderEdgeGradient()};
  z-index: -1;

  opacity: 0;
  transition: 0.3s;
`;

export const FriendsInGameContent = styled.div`
  padding: 20px 40px;
  position: relative;
  display: flex;
  align-items: center;
  border-top: 1px solid ${COLORS.black90};

  ${ComponentWrapper} {
    font-size: 18px;
    margin-bottom: 12px;
  }

  svg {
    margin-left: 15px;
    height: 20px;
    width: 20px;
    cursor: help;

    &:hover {
      & + ${PopUpWindow} {
        //display: block;
        opacity: 1;
        transition: 0.3s;
        z-index: 1;
      }
    }

    path {
      fill: ${COLORS.grayPurple};
    }
  }
`;
