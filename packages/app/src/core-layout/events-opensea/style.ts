import styled, { css, keyframes } from 'styled-components';

import { COLORS } from '@game-trade/ui';

const moveWindow = keyframes`
  from {
    bottom: -50rem;
  }

  to {
    bottom: 0;
  }
`;

export const Wrapper = styled.div`
  padding: 20px;
  margin: 0 2rem 2rem 0;
  width: 320px;
  break-inside: avoid;
  box-shadow: 0px -10px 50px #00000038;
  background-repeat: no-repeat;

  background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 2px 100%, 2px 100%, 100% 2px, 100% 2px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, 0 0, 0 0;

  z-index: 9990;
  animation: ${moveWindow} 1s ease;
  pointer-events: initial;

  @media (max-width: 767px) {
    width: 100%;
    margin: 0;
    animation: none;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

export const HeaderLeft = styled.div`
  display: flex;
`;

export const Status = styled.div`
  padding: 4px 10px;
  font-weight: bold;
  background: linear-gradient(59.29deg, ${COLORS.pink} 20.25%, ${COLORS.blue} 100%);
  margin-right: 20px;
`;

export const ImageWrapper = () => css`
  display: flex;
  width: 31px;
  break-inside: avoid;
  cursor: pointer;

  &:after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    content: '';
    background-repeat: no-repeat;

    background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
      linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.pink}),
      linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
      linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
    background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, 0 0, 0 0;
  }
`;

export const Time = styled.div`
  color: ${COLORS.grayPurple};
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  color: ${COLORS.grayPurple};
`;
export const TokenDetail = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
`;
export const Token = styled.div`
  color: ${COLORS.blue};
  margin-right: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 45%;
`;
export const Collection = styled.div`
  color: ${COLORS.blue};
  margin-left: 10px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50%;
`;

export const Address = styled.div<{ copy: boolean }>`
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 50%;
  margin-left: 10px;
  color: ${COLORS.white};

  ${({ copy }) =>
    copy &&
    css`
      &:after {
        display: block;
        content: 'address copied';
        color: white;
        padding: 0 1rem;
        position: absolute;
        text-align: center;
        background-color: ${COLORS.darkBg};
        font-size: 10px;
        border-radius: 0.5rem;
        border: 1px solid ${COLORS.blue};
      }
    `}
`;

export const AddressFrom = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: calc(320px - 40px);
  margin-bottom: 5px;

  svg {
    margin-left: 10px;
  }

  ${Address} {
    max-width: 45%;
  }
`;

export const AddressTo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;

  svg {
    margin-left: 10px;
  }

  ${Address} {
    width: 100%;
  }
`;

export const Seller = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 5px;

  svg {
    margin-left: 0px;
  }

  ${Address} {
    width: initial;
    margin-right: 10px;
  }
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Price = styled.div`
  color: ${COLORS.pink};
  margin-left: 10px;
`;
export const WrapperLoader = styled.div`
  position: relative;
  min-height: 140px;
`;
