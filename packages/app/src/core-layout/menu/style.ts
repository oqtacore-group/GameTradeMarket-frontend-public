import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';
import { AddressWrapper } from '@game-trade/ui/src/modifiers/get-address-slice/style';
import { borderGradientMenu } from '@game-trade/ui/src/styles/mixins';

import { List, ItemStyled } from '../navigation/style';

import { Socials } from '@/core-layout/social-links/style';
import { Item } from '@game-trade/ui/modifiers/get-social-network-icon/style';

export const WrapperMenu = styled.div<{ open?: boolean }>`
  display: block;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(21, 12, 25, 0);
  backdrop-filter: blur(15px);
  z-index: 10;
  cursor: pointer;
  transition: visibility 0s, opacity 0.2s linear;

  ${({ open }) =>
    open &&
    css`
      background: rgba(21, 12, 25, 0.7);
      backdrop-filter: blur(15px);
    `}
`;

export const Menu = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 0;
  overflow-y: scroll;
  background-color: ${COLORS.black};
  cursor: initial;
  transition: width 0.2s linear;
  padding: 30px;
  ${borderGradientMenu()};

  ${({ open }) =>
    open &&
    css`
      width: 25%;
    `};

  @media (max-width: 768px) {
    width: 75%;
  }
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;
  svg {
    cursor: pointer;
    fill: ${COLORS.blue};
    margin-bottom: 20px;
    transition: 0.5s;

    &:hover {
      fill: ${COLORS.pink};
      transition: 0.5s;
    }
  }
`;

export const Stroke = styled.hr`
  width: 100%;
  &:after {
    margin-top: 0;
    background-image: linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue});
  }
`;

export const InvertStroke = styled.hr`
  width: 100%;
  &:after {
    margin-top: 0;
    background-image: linear-gradient(
      to left,
      ${COLORS.pink},
      ${COLORS.blue},
      ${COLORS.blue},
      ${COLORS.pink}
    );
  }
  margin-bottom: 20px;
`;

export const WrapperNavigation = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  & > ${List} {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    & > ${ItemStyled} {
      padding-bottom: 15px;
    }
  }
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  svg {
    cursor: pointer;
    fill: ${COLORS.blue};
  }

  & > ${Socials} {
    flex-direction: column;
    width: 100%;
    margin-bottom: 0;

    ${Item} {
      svg {
        fill: ${COLORS.grayPurple};
      }
    }
  }
`;

export const Logout = styled.div`
  margin-bottom: 20px;
  display: inline-block;
  margin-top: 20px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    color: ${COLORS.pink};
    transition: 0.5s;

    svg {
      fill: ${COLORS.pink};
    }
  }

  svg {
    fill: white;
    margin-right: 5px;
    transition: 0.5s;
  }
`;

export const Account = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  margin-top: 10px;
  align-items: center;
  cursor: pointer;
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex: 1 0 auto;
  & > ${AddressWrapper} {
    color: ${COLORS.grayPurple};
    font-size: 12px;
  }
`;

export const NickName = styled.div``;
