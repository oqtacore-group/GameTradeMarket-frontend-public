import styled from 'styled-components';

import { COLORS, Button } from '@game-trade/ui/src';
import { shadowBorderEdgeGradient } from '@game-trade/ui/src/styles/mixins';
import IconUserPlus from '@game-trade/app/public/imgs/icon_user-plus.svg';
import IconXinCircle from '@game-trade/app/public/imgs/icon_x-in-circle.svg';
import IconMessage from '@game-trade/app/public/imgs/icon-user-card/icon_message.svg';

export const TopHeader = styled.h3`
  margin-bottom: 40px;

  @media (max-width: 767px) {
    margin-top: 10px;
    margin-bottom: 20px;
  }

  small {
    color: #a073a7;
    font-weight: 600;
    font-size: 16px;
    margin-left: 15px;
    position: relative;
    top: 2px;
  }
`;

export const ManageFriendsWrapper = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

export const FriendsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
`;

export const FriendWrapper = styled.div`
  width: 100%;
  max-width: 100%;
  break-inside: avoid;
  position: relative;
  padding-bottom: 2px;
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }

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
`;

export const AvatarAndName = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 20px;
  }

  img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    margin-right: 20px;
    object-fit: cover;
  }
`;

export const Name = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OnlineStatus = styled.div``;

export const ActionBtns = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 500px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }

  > * {
    cursor: pointer;
  }

  > * + * {
    margin-top: 4px;

    @media (max-width: 350px) {
      margin-top: 0;
    }
  }

  * {
    @media (max-width: 350px) {
      font-size: 13px !important;
    }
  }
`;

export const AddBtn = styled((props) => (
  <div {...props}>
    {props.children}
    <IconUserPlus />
  </div>
))`
  color: #ff41b3;
  font-weight: 500;
  font-size: 15px;
  //min-width: 137px;
`;

export const RemoveBtn = styled((props) => (
  <div {...props}>
    <span style={{ marginRight: '1px', lineHeight: '30px' }}>{props.children}</span>

    <IconXinCircle />
  </div>
))`
  color: #a073a7;
  font-weight: 500;
  font-size: 15px;
  padding-right: 3px;

  @media (max-width: 350px) {
    min-width: 74px;
  }
`;

export const SendMessageBtn = styled((props) => (
  <div {...props}>
    <span style={{ marginRight: '9px', lineHeight: '30px' }}>{props.children}</span>

    <IconMessage style={{ marginRight: '7px' }} />
  </div>
))`
  color: #a073a7;
  font-weight: 500;
  font-size: 15px;
  padding-right: 3px;
  min-width: 90px;

  @media (max-width: 350px) {
    min-width: 74px;
  }
`;

export const ModalContent = styled.div`
  padding: 25px;
  ${shadowBorderEdgeGradient()};
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const ConfirmModalRowButtons = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  margin: 20px auto;
  justify-content: flex-end;
`;

export const ModalButton = styled(Button)`
  margin-right: 24px;
  position: relative;

  :last-child {
    margin-right: 0;
  }
`;
