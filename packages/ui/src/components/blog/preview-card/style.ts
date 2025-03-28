import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles';

export const Wrapper = styled.div<{ animation?: boolean }>`
  width: calc(100% / 3);
  & > a {
    width: 100%;
  }

  ${({ animation }) =>
    animation &&
    css`
      transition: margin-top 0.3s ease-out 100ms;

      &:hover {
        margin-top: -50px;
        transition: margin-top 0.3s ease-out 100ms;

        @media (max-width: 600px) {
          margin-top: 0;
        }
      }
    `};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const MetaData = styled.div`
  display: flex;
  flex-direction: row;
  color: ${COLORS.grayPurple};

  margin-bottom: 10px;
`;

export const Content = styled.div`
  padding: 20px;
  height: 210px;
  display: flex;
  flex-direction: column;
`;

export const Date = styled.div`
  margin-right: 5px;
`;

export const Comments = styled.div`
  margin-left: 5px;
`;

export const Title = styled.h3`
  margin-bottom: 10px;
  font-size: 24px;
`;

export const Description = styled.div`
  margin-bottom: 10px;
  position: relative;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: linear-gradient(0deg, #19101f 15%, rgba(0, 0, 0, 0) 100%);
  }
`;

export const BlogCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  overflow: hidden;
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

    ${Description} {
      &:after {
        background: linear-gradient(0deg, ${COLORS.darkBg} 15%, rgba(0, 0, 0, 0) 100%);
      }
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
