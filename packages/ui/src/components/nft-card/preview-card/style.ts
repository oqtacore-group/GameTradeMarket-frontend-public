import styled, { css } from 'styled-components';

import { COLORS } from '../../../styles';

export const TokenCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
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
        ${COLORS.darkBg} calc(25% + 1px)
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
    pointer-events: none;
  }
`;

export const TokenImage = () => css`
  position: relative;
  height: 25rem;

  @media (max-width: 576px) {
    font-size: 45rem;
  }
`;

export const TokenDescription = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 1.5rem;
  margin: auto;
  width: calc(100% - 4px);

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

export const GameName = styled.div`
  color: ${COLORS.blue};
  font-size: 14px;
  line-height: 18px;

  @media (max-width: 576px) {
    font-size: 16px;
    line-height: 20px;
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
`;

export const Stroke = styled.div`
  margin: 0;
  &:after {
    margin-top: 0;
    background-color: ${COLORS.black};
  }
`;

export const PriceAndLikesWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Like = styled.div`
  color: #ff41b3;
  font-size: 16px;
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  width: 100%;
  & > a {
    width: 100%;
  }
`;
