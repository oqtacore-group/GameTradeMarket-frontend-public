import styled from 'styled-components';
import { COLORS } from '../../../../../styles';

export const GameListWrapper = styled.div`
  padding: 20px 40px;
`;

export const GameListOuter = styled.div`
  width: 100%;
  max-height: 160px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 2px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-track {
    background: ${COLORS.black};
    border-radius: 2px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: ${COLORS.blue};
    border-radius: 2px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${COLORS.shadowPurple};
  }
`;

export const GameListInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const EmptyGameListMessage = styled.div`
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: ${COLORS.gray};
`;
