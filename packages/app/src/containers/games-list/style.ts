import styled from 'styled-components';

export const GamesListContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const GamesListContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const GamesListContentStyled = styled.div`
  padding: 0 20px;
`;

export const MobileTitleWrapper = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
    padding: 35px 20px 10px;
  }
`;

export const DesktopTitleWrapper = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;
