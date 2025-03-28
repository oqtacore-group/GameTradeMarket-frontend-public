import styled from 'styled-components';

export const GameDetailCard = styled.div`
  position: relative;
`;

export const GameDetailCardContainerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  padding: 30px 50px;

  @media (max-width: 900px) {
    padding: 20px;
  }
`;

export const GameDetailCardContentWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-right: 40px;

  @media (max-width: 900px) {
    width: 100%;
    padding-right: 0;
  }
`;

export const CardsCarouselWrapper = styled.div`
  margin-top: 50px;

  @media (max-width: 960px) {
    width: 100%;
  }

  h3 {
    margin-bottom: 20px;
  }
`;

export const SubHeadline = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const ButtonViewAll = styled.div`
  cursor: pointer;
`;

export const RevewsWrapper = styled.div`
  grid-area: reviews;
  margin-top: 20px;

  h3 {
    margin-bottom: 30px;

    small {
      font-size: 17px;
      color: #a073a7;
      margin-left: 20px;
    }
  }
`;

export const ContractsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IContractsHeaderProps {
  isContractsOpened: boolean;
}
export const ContractsHeader = styled.div<IContractsHeaderProps>`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;

  > *:first-child {
    cursor: pointer;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: ${(p) => (!p.isContractsOpened ? 5 : 11)}px;
      right: -25px;
      width: 10px;
      height: 10px;
      border: 1px solid #379fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(${(p) => (!p.isContractsOpened ? 45 : -135)}deg);
    }
  }

  > *:last-child > * + * {
    margin-left: 13px;
  }
`;
