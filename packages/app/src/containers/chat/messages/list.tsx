import React from 'react';

import { GroupDate, GroupMessagesContainer, FormatDate } from './style';
import { MessageItem } from './item';

interface IProps {
  activeUser: any;
  date: any;
  messages: any;
}

export const MessagesList = ({ activeUser, date, messages }: IProps) => {
  return (
    <GroupDate>
      <FormatDate>
        <span>{date}</span>
      </FormatDate>
      <GroupMessagesContainer>
        {messages?.map((msg: any) => {
          return (
            <MessageItem
              key={msg.create_time + Math.random()}
              message={msg}
              activeUser={activeUser}
            />
          );
        })}
      </GroupMessagesContainer>
    </GroupDate>
  );
};
