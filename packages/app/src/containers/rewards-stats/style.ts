import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto 50px;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const WrapperReward = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;
