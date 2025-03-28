import styled from 'styled-components';

export const GamesWrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  display: flex;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

export const GameSlidersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
