import styled from 'styled-components';

export const WrapperComponents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  min-height: 600px;
  width: 100%;

  @media (max-width: 767px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const WrapperProperties = styled.div`
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;

    & > div {
      width: 100%;
    }
  }
`;
