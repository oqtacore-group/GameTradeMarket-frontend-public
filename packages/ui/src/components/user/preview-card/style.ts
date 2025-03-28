import styled from 'styled-components';

import { COLORS } from '../../../styles';

export const UserCardWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;
  background-repeat: no-repeat;
  background-color: linear-gradient(black, black), linear-gradient(black, black),
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
    pointer-events: none;
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

export const UserImage = styled.div`
  position: relative;
  overflow: hidden;
  margin-top: 55px;
  display: flex;
  justify-content: center;

  > span {
    cursor: pointer;
    border-radius: 50%;
  }

  > div {
    cursor: pointer;
    border-radius: 50%;
    background-color: #6964bf;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const UserCardInner = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  padding-top: 0;
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

export const UserName = styled.div`
  cursor: pointer;
  margin: 0.5rem 0 1rem;
  margin-top: 18px;
  font-size: 16px;
  font-family: 'ChakraPetch';
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
`;

export const UserCoverImage = styled.div`
  background: linear-gradient(124deg, rgba(242, 72, 184, 1) 0%, rgba(102, 139, 239, 1) 100%);
  width: 100%;
  height: 110px;
  position: absolute;
  top: 0;
  left: 0;
`;

export const OnlineStatus = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 7px;
`;

export const ItemsCount = styled.div`
  display: flex;
  justify-content: center;
  color: #379fff;
  margin-bottom: 16px;
`;

export const CompositedButton = styled.div`
  > *:first-child {
    display: block;
  }

  > *:last-child {
    display: none;
  }

  &:hover {
    > *:first-child {
      display: none;
    }

    > *:last-child {
      display: block;
    }
  }
`;
