import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS, ScrollableBox } from '@game-trade/ui';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 600px;
  align-items: stretch;
`;

export const ColumnUsers = styled.div<{ isActive: boolean; isMobile: boolean }>`
  width: 303px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${COLORS.black90};
  background-color: ${COLORS.blue90};
  transition: all 450ms linear;

  ${({ isActive }) =>
    !isActive &&
    css`
      width: 60px;
    `}

  ${({ isMobile }) =>
    isMobile &&
    css`
      width: 100%;
    `}
`;

export const UsersHeader = styled.div<{ isActive: boolean }>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 23px;
  border-bottom: 1px solid ${COLORS.black90};

  svg {
    cursor: pointer;
    fill: ${COLORS.blue};

    ${({ isActive }) =>
      isActive &&
      css`
        transform: scale(-1, 1);
      `}
  }

  ${({ isActive }) =>
    isActive &&
    css`
      padding-right: 13px;
    `}
`;

export const Content = styled.div`
  position: relative;
  flex-grow: 1;
  background: transparent;
`;

export const ScrollBox = styled(ScrollableBox)`
  max-height: 550px;
  width: 100%;
`;

export const UserItemAvatarWrapper = styled.div<{ online?: boolean }>`
  margin-right: 9px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    bottom: 0;
    right: 0;
    border-radius: 50%;
    background-color: #a073a7;
    border: 2px solid #19101f;
    z-index: 10;
    ${({ online }) =>
      online &&
      css`
        background-color: #379fff; ;
      `}
  }
`;

export const UserItemAvatar = styled.div`
  position: relative;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid ${COLORS.pink};
`;

export const UserItem = styled.div<{ isActive?: boolean; isOpenColumns?: boolean }>`
  position: relative;
  height: 66px;
  width: 100%;
  //max-width: 250px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-top: 1px solid ${COLORS.black90};
  cursor: pointer;
  transition: all 450ms linear;

  :first-of-type {
    border-top: 0 none;
  }

  :hover {
    background-color: ${rgba(COLORS.black90, 0.7)};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${rgba(COLORS.black90, 0.7)};
    `}

  ${({ isOpenColumns }) =>
    !isOpenColumns &&
    css`
      padding-left: 10px;
    `}
`;

export const ColumnMenuHeader = styled.div`
  height: 67px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  background-color: ${COLORS.blue90};
`;

export const UnReadMessages = styled.span`
  border-radius: 50px;
  padding: 2px 4px;
  color: ${COLORS.black90} !important;
  background-color: ${COLORS.blue};
  ${FONTS.chakra};
  font-weight: 700;
  font-size: 10px;
  line-height: 13px;
  letter-spacing: 0.5px;
  margin-left: 4px;
  min-width: 17px;
  text-align: center;
  display: inline-block;
`;

export const UserName = styled.span`
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${COLORS.white};
`;
export const LastMessage = styled.div`
  ${FONTS.baiJamjuree};
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${COLORS.gray};

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding-right: 10px;
`;
export const UserNameMessage = styled.div`
  overflow: hidden;
`;
export const UserNameWrapper = styled.div`
  padding-right: 20px;
  vertical-align: center;
  display: flex;
  align-items: center;
`;
