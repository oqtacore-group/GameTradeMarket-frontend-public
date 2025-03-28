import styled from 'styled-components';

export const WrapperCarousel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 50px;
  margin-bottom: 20px;

  @media (max-width: 900px) {
    padding: 0 25px;
  }
`;

export const WrapperHeadline = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Headline = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  padding-left: 25px;
  font-size: 20px;
  text-transform: uppercase;
`;
