import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Content = styled.div`
  display: flex;
  margin-top: 30px;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  display: flex;
  position: relative;
  font-size: 52px;
  font-weight: 600;
  width: 66%;
  margin-right: 20px;

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

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

export const IconsWrapper = styled.div`
  width: 45%;
  position: relative;

  @media (max-width: 1100px) {
    order: 2;
    display: flex;
  }
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  padding: 15px;

  @media (max-width: 1100px) {
    position: relative !important;
    left: inherit !important;
    top: inherit !important;
    margin-right: 10px;
  }

  @media (max-width: 600px) {
    padding: 5px;
  }
`;

export const Binance = styled(Icon)`
  top: -20%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  border-bottom: 5px solid ${COLORS.blue};
  z-index: 3;

  box-shadow: 0 0 60px -10px ${COLORS.blue};

  svg {
    fill: #722fff;
  }

  @media (max-width: 900px) {
    width: 100%;
    left: 0;
    top: 0;
  }
`;

export const Polygon = styled(Icon)`
  left: 15%;
  top: 20%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  border-bottom: 5px solid #722fff;
  z-index: 2;

  box-shadow: 0 0 60px -10px #722fff;

  svg {
    fill: #722fff;
  }

  @media (max-width: 900px) {
    width: 100%;
    left: 0;
    top: 0;
  }
`;

export const Ethereum = styled(Icon)`
  left: 30%;
  top: 60%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  border-bottom: 5px solid ${COLORS.pink};
  z-index: 1;

  box-shadow: 0 0 100px -15px ${COLORS.pink};

  svg {
    fill: #722fff;
  }

  @media (max-width: 900px) {
    width: 100%;
    left: 0;
    top: 0;
  }
`;

export const Supported = styled.div`
  position: relative;
  text-decoration: underline;
  width: 100%;
  margin-bottom: 5%;
  margin-top: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 2.2rem;

  @media (max-width: 1100px) {
    font-size: 16px;
    text-align: left;
  }
`;

export const SupportedWrapper = styled.div`
  width: 55%;
  position: relative;
  color: white;

  @media (max-width: 1100px) {
    display: flex;
    align-items: center;
    order: 1;
    width: initial;
    margin-right: 30px;

    svg {
      display: none;
    }
  }

  @media (max-width: 600px) {
    margin-right: 5px;
    width: 40%;
  }
`;

export const RightBlock = styled.div`
  position: relative;
  width: 34%;
  display: flex;

  @media (max-width: 1100px) {
    width: 100%;
  }

  @media (max-width: 767px) {
    margin-top: 20px;
    justify-content: space-between;
  }
`;
