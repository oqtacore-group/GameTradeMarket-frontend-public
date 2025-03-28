import styled from 'styled-components';

export const FeaturesBlockWrapper = styled.article`
  margin-top: 13rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: 992px) {
    img {
      width: auto;
      max-width: 350px;
      max-height: 150px;
      margin: 0;
    }
  }
`;
