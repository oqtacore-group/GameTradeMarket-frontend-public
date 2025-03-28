import styled from 'styled-components';

export const Headline = styled.div`
  padding: 20px;
  width: 100%;
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;
`;

export const WrapperColumns = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Column = styled.div`
  width: 100%;
  border-right: 1px solid black;
  border-bottom: 1px solid black;

  &:first-child {
    border-left: 1px solid black;
  }
`;

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;

    & > div {
      width: 100%;
    }
  }
`;
