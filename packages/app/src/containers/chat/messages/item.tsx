import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';

import {
  UserName,
  GroupMessagesItem,
  UserItemAvatarWrapper,
  UserItem,
  UserItemAvatar,
  UserNameMessage,
  UserNameWrapper,
  ContentItem,
  UserDateSend,
} from './style';

import SvgAvatar from '@/core-layout/avatar/avatar-person.svg';

interface IMessages {
  activeUser: any;
  message: any;
}

export const MessageItem = ({ message, activeUser }: IMessages) => {
  return (
    <GroupMessagesItem>
      <UserItem>
        {message.avatar && (
          <UserItemAvatarWrapper hasMessages={true}>
            <UserItemAvatar>
              <Image
                loader={() => message.avatar as string}
                src={message.avatar}
                quality={65}
                layout="fill"
                objectFit="cover"
                alt=""
              />
            </UserItemAvatar>
          </UserItemAvatarWrapper>
        )}
        {!message.avatar && (
          <UserItemAvatarWrapper>
            <SvgAvatar />
          </UserItemAvatarWrapper>
        )}
        <UserNameMessage>
          <UserNameWrapper>
            <UserName youMessage={activeUser.id !== message.author}>
              {activeUser.id === message.author ? activeUser.nick_name : 'You'}
            </UserName>
          </UserNameWrapper>
        </UserNameMessage>
        <UserDateSend>{format(new Date(message.create_time), 'h:mm a')}</UserDateSend>
      </UserItem>
      <ContentItem>{message.context}</ContentItem>
    </GroupMessagesItem>
  );
};
