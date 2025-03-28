import styled from 'styled-components';
import { Title, SubTitle } from '../style';
// import { COLORS } from '@game-trade/ui';

export const OurBlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 120px;

  ${Title} {
    margin-bottom: 40px;

    @media (max-width: 900px) {
      margin-bottom: 0;
    }
  }

  ${SubTitle} {
    font-size: 24px;
    margin-top: 0;
    margin-bottom: 15px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10%;
`;

export const PaginationWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BlogCardsWrapper = styled.div`
  column-gap: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 50px;

  @media (max-width: 767px) {
    margin-top: 30px;
    margin-bottom: 50px;
    column-gap: 0;
  }
`;
