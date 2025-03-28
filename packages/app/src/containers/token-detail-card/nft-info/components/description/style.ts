import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Block = styled.div`
  position: relative;
  padding: 20px 77px;

  @media (max-width: 900px) {
    padding: 20px 25px;
  }
`;

export const BlockGameName = styled.div`
  color: ${COLORS.blue};
  display: flex;
  justify-content: space-between;
`;

export const GameName = styled.div`
  color: ${COLORS.blue};
  cursor: pointer;
  text-decoration: underline;
`;

export const Name = styled.h2`
  font-size: 37px;
  padding-top: 10px;
`;

export const List = styled.div`
  margin-top: 15px;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const Key = styled.div`
  margin-right: 10px;
  color: ${COLORS.pink};
`;

export const Value = styled.div`
  color: ${COLORS.blue};
`;

export const Headline = styled.div`
  font-size: 20px;
  margin: 20px 0 5px;
`;

export const Text = styled.h3`
  font-size: 16px;
  line-height: 1.5;
  min-height: 150px;
`;
