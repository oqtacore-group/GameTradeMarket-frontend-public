import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { User } from '@game-trade/lib/codegen-types';
// import { getTime } from 'date-fns';

import {
  UserItem,
  UserItemAvatar,
  UserItemAvatarWrapper,
  UserNameMessage,
  UnReadMessages,
  UserName,
  LastMessage,
  UserNameWrapper,
} from './style';

import SvgAvatar from '@/core-layout/avatar/avatar-person.svg';
import { IMessage } from '@/containers/account/interfaces';
import { Status } from '@game-trade/ui/components/filters-tokens-items/interfaces';

interface IProps {
  user: User;
  activeUser: User | undefined;
  onlineUsers: string[];
  onChooseActiveChat: (user: User) => void;
  newMessages: IMessage[];
  statusColumns: Status;
}

export const UserItemComponent = memo(
  ({ user, activeUser, onChooseActiveChat, onlineUsers, newMessages, statusColumns }: IProps) => {
    const [unreadCount, setUnreadCount] = useState<number>();
    const [userUnreadCount, setUserUnreadCount] = useState<number>(user.unreadCount);

    useEffect(() => {
      setUnreadCount(user.unreadCount + newMessages.length);
    }, []);

    useEffect(() => {
      const readCount = [...new Set(newMessages.filter((msg) => !msg.state.is_read))].length;
      setUnreadCount(readCount + userUnreadCount);
    }, [newMessages]);

    useEffect(() => {
      setUserUnreadCount(user.unreadCount);
    }, [user.unreadCount]);

    const handleChooseActiveChat = () => {
      setUserUnreadCount(0);
      onChooseActiveChat(user);
    };

    return (
      <UserItem
        isOpenColumns={statusColumns !== 'close'}
        isActive={Boolean(activeUser?.id === user.id)}
        onClick={handleChooseActiveChat}>
        {user.image_url && (
          <UserItemAvatarWrapper
            online={Boolean(onlineUsers.find((recipient) => user.id === recipient))}>
            <UserItemAvatar>
              <Image
                loader={() => user.image_url as string}
                src={user.image_url}
                quality={65}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </UserItemAvatar>
          </UserItemAvatarWrapper>
        )}
        {!user.image_url && (
          <UserItemAvatarWrapper
            online={Boolean(onlineUsers.find((recipient) => user.id === recipient))}>
            <SvgAvatar />
          </UserItemAvatarWrapper>
        )}
        <UserNameMessage>
          <UserNameWrapper>
            <UserName>
              {user.nick_name.length > 15 ? `${user.nick_name.substr(0, 15)}...` : user.nick_name}
            </UserName>
            {!!unreadCount && activeUser?.id !== user.id && (
              <UnReadMessages>{unreadCount}</UnReadMessages>
            )}
          </UserNameWrapper>
          {(user.last_message || !!newMessages.length) && (
            <LastMessage>
              {newMessages.length ? newMessages[newMessages.length - 1].context : user.last_message}
            </LastMessage>
          )}
        </UserNameMessage>
      </UserItem>
    );
  }
);
