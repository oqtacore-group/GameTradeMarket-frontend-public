import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Root = styled.div`
  height: 100%;
  padding: 0 30px;
`;
export const Header = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;
`;

export const ImageList = styled.div`
  margin-top: 30px;
  width: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ImageItem = styled.div`
  transition: transform 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30px;
  height: 30px;
  margin: 10px;
`;

export const ImageComponent = styled.div`
  margin-bottom: 10px;
  text-align: center;
  align-self: center;

  svg:hover {
    cursor: pointer;
    fill: ${COLORS.blue};
  }
`;

export const TabsBlock = styled.div`
  position: relative;
`;

export const TabContainer = styled.div`
  margin-top: 44px;
  position: relative;
`;
