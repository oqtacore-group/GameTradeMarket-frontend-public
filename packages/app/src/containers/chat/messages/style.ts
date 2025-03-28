import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS } from '@game-trade/ui';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 550px;
  align-items: stretch;
  //overflow: hidden;
`;

export const Header = styled.div`
  ${FONTS.chakra};
  width: 100%;
  display: flex;
  height: 67px;
  align-items: center;
  flex-direction: row;
  padding: 0 22px;
  justify-content: space-between;
  border-bottom: 1px solid ${COLORS.black90};
  background-color: ${rgba(COLORS.black90, 0.7)};

  span {
    font-weight: 700;
    font-size: 18px;
    line-height: 23px;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding: 14px 24px;
  border-top: 1px solid ${COLORS.black90};
  background-color: ${rgba(COLORS.black90, 0.7)};
  min-height: 68px;
`;

export const Visit = styled.div<{ isActive?: boolean }>`
  color: ${COLORS.gray};

  ${({ isActive }) =>
    isActive &&
    css`
      color: ${COLORS.pink};
    `}
`;
export const Content = styled.div`
  position: relative;
  padding: 22px 22px 0;
  flex-grow: 1;
  max-height: 550px;
  overflow-y: scroll;
  overflow-x: hidden;
  //min-height: 100%;
  display: flex;
  flex-direction: column-reverse;
  background: transparent;

  ::-webkit-scrollbar {
    position: absolute;
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;

    border: 6px solid transparent;
    border-radius: 12px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${COLORS.blue};
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.blue};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${COLORS.blue};
    }
  }
`;

export const ScrollBox = styled.div`
  padding-bottom: 22px;
`;

export const UserName = styled.div<{ youMessage?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 12px;
  font-size: 18px;
  ${({ youMessage }) => {
    if (youMessage) {
      return css`
        color: ${COLORS.pink};
      `;
    }
  }}

  svg {
    cursor: pointer;
    fill: ${COLORS.blue};
  }
`;
export const EmptyMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  color: ${COLORS.gray};
`;

export const GroupDate = styled.div`
  margin-bottom: 27px;
`;

export const FormatDate = styled.div`
  margin-bottom: 27px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    display: inline-block;
    padding: 6px 14px;
    background-color: ${rgba(COLORS.gray, 0.1)};
    color: ${rgba(COLORS.gray, 1)};
    text-align: center;
  }
`;

export const GroupMessagesContainer = styled.div`
  //border: 1px solid red;
`;

export const GroupMessagesItem = styled.div`
  margin-bottom: 20px;
  padding-left: 40px;
`;

export const ContentItem = styled.div`
  padding-left: 61px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export const UserItemAvatarWrapper = styled.div<{ hasMessages?: boolean }>`
  margin-right: 9px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  position: relative;
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

export const UserItem = styled.div<{ isActive?: boolean }>`
  position: relative;
  height: 45px;
  display: flex;
  align-items: center;
`;

export const UserNameMessage = styled.div`
  overflow: hidden;
`;
export const UserNameWrapper = styled.div`
  padding-right: 6px;
  vertical-align: center;
  display: flex;
  align-items: center;
`;

export const UserDateSend = styled.div`
  font-size: 12px;
  padding-top: 5px;
  color: ${COLORS.grayPurple};
`;

export const WrapperUploader = styled.div`
  width: 100%;
  display: block;
`;
