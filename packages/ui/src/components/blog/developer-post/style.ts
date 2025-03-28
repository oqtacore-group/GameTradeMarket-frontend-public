import styled from 'styled-components';

import { COLORS } from '../../../styles';

export const GameCardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;
  cursor: pointer;
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
    background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
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

export const GameImageContainer = styled.div`
  position: relative;
  height: 110px;

  @media (max-width: 576px) {
    font-size: 45rem;
  }
`;

export const GameBlogPostInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 10px 1.5rem;
  width: calc(100% - 4px);
  height: calc(100% - 110px);

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

export const EmptyTokenImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Date = styled.div`
  color: ${COLORS.gray};
  font-family: 'ChakraPetch';
  font-size: 14px;
  display: flex;
  white-space: nowrap;
  align-items: center;

  svg {
    margin: 0 5px;
    fill: ${COLORS.gray};
  }
`;

export const GameBlogPostName = styled.div`
  margin-top: 0.5rem;
  font-size: 16px;
  font-family: 'ChakraPetch';
`;

export const Description = styled.div`
  margin-bottom: 1.7rem;
  font-size: 14px;
  max-width: 120px;
  font-family: 'ChakraPetch';
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
