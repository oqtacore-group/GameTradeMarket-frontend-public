import styled from 'styled-components';

export const GameSlidersWrapper = styled.div`
  margin-bottom: 100px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Browse = styled.span`
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  border-bottom: 2px solid white;
`;

export const SubTitle = styled.h4`
  margin-top: 10px;
`;

export const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameCardCarouselWrapper = styled.div`
  margin-top: 42px;

  @media (max-width: 600px) {
    margin-top: 20px;
  }
`;

export const Title = styled.h3`
  padding: 0 1px;
  display: flex;
  position: relative;
  font-size: 36px;
  font-weight: 600;
  line-height: 30px;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 2px;
    left: 2px;
    opacity: 1;
    z-index: -1;
    -webkit-text-stroke: 2px #ff41b3;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
