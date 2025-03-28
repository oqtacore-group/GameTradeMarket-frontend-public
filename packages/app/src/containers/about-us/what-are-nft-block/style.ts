import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WhatAreNftBlockWrapper = styled.article`
  position: relative;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1200px) {
    //height: 80rem;
  }

  @media (max-width: 992px) {
    //display: none;
    flex-direction: column;
  }
`;

export const ImagesWrapper = styled.div`
  width: 40%;
  display: flex;
  position: relative;
  align-items: center;

  @media (max-width: 992px) {
    width: 100%;
    order: 2;
  }
`;

export const ImageWrapper = styled.div<{ justifyContent?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;

  &:first-child {
    width: 20%;
    margin-right: 3%;
  }

  &:nth-child(2) {
    width: 20%;
    margin-right: 3%;
  }

  &:nth-child(3) {
    width: 40%;
    margin-right: 3%;
  }

  > span {
    overflow: hidden;
  }

  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: center;
      align-items: center;

      > span {
        border-radius: 1rem;
      }
    `}

  > span:first-child {
    border-radius: 1rem;
    margin-bottom: 5rem !important;
  }
`;

export const Card = styled.div`
  position: relative;
  width: 25rem;
  height: 25rem;
  margin-bottom: 6rem;
  margin-left: 2rem;
  padding: 1rem;
  display: flex;
  align-items: center;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 0.1)),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25%)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  + div {
    width: 40%;
    border-radius: 1rem;
    overflow: hidden;
  }
`;

export const TextWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;

  @media (max-width: 992px) {
    width: 100%;
    order: 1;
  }
`;

export const TextContent = styled.div``;

export const ImageCardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 3rem;
`;
