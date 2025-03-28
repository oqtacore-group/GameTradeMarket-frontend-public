import styled from 'styled-components';
import { COLORS } from '../../index';

export const ItemsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ItemWrapper = styled.div`
  width: calc(100% / 3);
  position: relative;

  @media (max-width: 992px) {
    width: 80%;
    margin: 0 10%;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 1rem;
  font-size: 1.6rem;
  line-height: 180%;
  span {
    font-weight: 900;
  }
  p {
    font-size: 1.6rem;
  }
`;

export const Item = styled.div`
  padding: 3.4rem 3.4rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  svg {
    margin-bottom: 1.5rem;
  }

  h5 {
    font-style: normal;
    font-weight: 600;
    line-height: 120%;
    color: ${COLORS.pink};
    margin-bottom: 1.1rem;
  }

  p {
    font-size: 1.6rem;
    text-align: center;
    line-height: 180%;
  }
`;
