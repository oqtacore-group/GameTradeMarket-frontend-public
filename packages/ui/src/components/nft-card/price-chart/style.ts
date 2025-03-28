import styled from 'styled-components';

import { COLORS } from '../../../styles';

export const TokenCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;

  background-repeat: no-repeat;
  background-image: linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(black, black), linear-gradient(black, black),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      black calc(50% - 1px),
      black calc(50% + 0.5px),
      #19101f calc(25% + 1px)
    ),
    linear-gradient(#19101f, #19101f), linear-gradient(#19101f, #19101f);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
  transition: 0.2s linear;
  &:hover {
    transition: 0.2s linear;
    background-repeat: no-repeat;
    background-image: linear-gradient(black, black), linear-gradient(black, black),
      linear-gradient(black, black), linear-gradient(black, black),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        black calc(50% - 1px),
        black calc(50% + 0.5px),
        #19101f calc(25% + 1px)
      ),
      linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
      linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
    background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
    &:after {
      transition: 0.2s linear;
      opacity: 1;
    }
  }

  &:after {
    transition: 0.2s linear;
    content: '';
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 1)),
      linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
      linear-gradient(to right, rgba(0, 0, 0, 1), ${COLORS.blue}),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        ${COLORS.blue} calc(50% - 1px),
        ${COLORS.blue} calc(50% + 0.5px),
        transparent calc(25%)
      ),
      linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
    background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
  }
`;

export const TokenImage = styled.div`
  position: relative;
  height: 250px;

  @media (max-width: 576px) {
    font-size: 450px;
  }
`;

export const TokenDescription = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 15px;
  margin: auto;
  width: calc(100% - 4px);

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.black} calc(50% - 1px),
      ${COLORS.black} calc(50%),
      ${COLORS.black},
      ${COLORS.black}
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  @media (max-width: 576px) {
    padding: 8px;
  }
`;

export const GameImage = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1;

  svg {
    fill: ${COLORS.pink};
  }
`;

export const GameName = styled.div`
  color: ${COLORS.blue};

  @media (max-width: 576px) {
    font-size: 16px;
  }
`;

export const TokenName = styled.div`
  margin: 0.5rem 0 1rem;
  font-size: 16px;
  font-family: 'ChakraPetch';
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 576px) {
    font-size: 14px;
  }
`;

export const Price = styled.div`
  color: ${COLORS.pink};
  font-family: 'ChakraPetch';
  font-size: 14px;
  margin-top: 15px;
  display: flex;
  white-space: nowrap;

  svg {
    fill: ${COLORS.pink};
  }
`;

export const PriceEth = styled.div`
  max-width: 8rem;
  font-style: normal;
  font-weight: 600;
  margin-right: 2px;

  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const PriceUsdt = styled.div`
  color: ${COLORS.gray};
  font-weight: 400;
`;

export const Stroke = styled.div`
  margin: 0;
  &:after {
    margin-top: 0;
    background-color: ${COLORS.black};
  }
`;
