import styled from 'styled-components';

import { COLORS } from '@game-trade/ui/src/index';

export const Notifications = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  margin-right: 15px;
  cursor: pointer;
  position: relative;
`;

export const NotificationsDropdown = styled.div`
  cursor: default;
  position: absolute;
  top: 100%;
  right: 0;
  width: 380px;
  padding: 20px;
  z-index: 100;
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

  &:after {
    pointer-events: none;
    transition: 0.2s linear;
    content: '';
    opacity: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
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

  h4 {
    color: ${COLORS.pink};
    font-size: 18px;
    margin-bottom: 20px;

    span {
      color: #a073a7;
      font-family: 'Bai Jamjuree';
      font-weight: 400;
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;

export const NotificationsInner = styled.div`
  max-height: 638px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const NotificationsList = styled.div``;

export const NotificationItem = styled.div`
  position: relative;

  & + & {
    padding-top: 20px;
    margin-top: 20px;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
    }
  }
`;

export const DateAndRemove = styled.div`
  color: #a073a7;
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

export const Heading = styled.div`
  font-weight: 600;
  font-family: 'Bai Jamjuree';
  padding: 5px 0;
`;

export const Desc = styled.div`
  font-size: 14px;
  font-family: 'Bai Jamjuree';
  padding-bottom: 8px;
  font-weight: 300;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Btn = styled.div`
  color: #a073a7;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #b895be;
  }

  & + & {
    margin-left: 20px;
  }
`;
