import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useUserFriendsQuery, User } from '@game-trade/lib/codegen-types';

import { ColumnUsers, Container, Content, ScrollBox, UsersHeader } from './style';
// import { listUsers } from './_data';
// import { SearchUsers } from './search';
import { UserItemComponent } from './user-item';

import { initChatSocket, socket } from '@/containers/chat/utils';
import { IMessage } from '@/containers/account/interfaces';
import { SvgArrowLeft } from '@game-trade/icons';
import { Status } from '@game-trade/ui/components/filters-tokens-items/interfaces';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';

const MessagesContainer = dynamic(() => import('./messages'), { ssr: false });

// @TODO const ChatContainer = dynamic(() => import('@/containers/chat'), { ssr: false });
export default function ChatContainer() {
  const router = useRouter();
  const { user: queryUserId } = router.query;
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [statusUsersColumn, setStatusUsersColumn] = useState<Status>('init');
  const isTablet = useMediaQuery({ query: '(max-width: 1200px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const { data } = useUserFriendsQuery({
    fetchPolicy: 'no-cache',
  });
  const listFriends = data?.me?.friends?.edges?.node;
  const myUser = { author: data?.me?.id, avatar: data?.me?.image_url };

  useEffect(() => {
    initChatSocket();
    socket.on('onSent', (msg: IMessage) => {
      setNewMessages((prevState) => {
        return [...prevState, msg];
      });
    });
    socket.on('online', (recipient: string | string[]) => {
      setOnlineUsers((prevState) => {
        return [...prevState, ...(typeof recipient == 'string' ? [recipient] : recipient)];
      });
    });
    socket.on('offline', (recipient: string) => {
      setOnlineUsers([...onlineUsers.filter((user) => user !== recipient)]);
    });
  }, []);

  useEffect(() => {
    if (queryUserId) {
      const queryActiveUser = listFriends?.find((item) => item.id === queryUserId);
      setActiveUser(queryActiveUser);
    }
  }, [listFriends && queryUserId]);

  useEffect(() => {
    if (isMobile && statusUsersColumn === 'close') {
      setActiveUser(undefined);
      setStatusUsersColumn('open');
    }
  }, [statusUsersColumn]);

  const handleChooseActiveChat = (user: User | undefined) => {
    setActiveUser(user);
    router.push(`?user=${user?.id}`, undefined, {
      shallow: true,
    });
    setNewMessages(() => {
      return newMessages.map((item) => {
        item.state.is_read = true;
        return item;
      });
    });
  };

  listFriends?.sort((item) => {
    if (
      newMessages[newMessages.length - 1]?.author === item.id ||
      newMessages[newMessages.length - 1]?.to === item.id
    ) {
      return -1;
    }
    return 1;
  });

  return (
    <Container>
      {(!isMobile || !activeUser) && (
        <ColumnUsers isActive={['open', 'init'].includes(statusUsersColumn)} isMobile={isMobile}>
          {/*<SearchUsers />*/}
          {isTablet && !isMobile && (
            <UsersHeader
              onClick={() => setStatusUsersColumn(statusUsersColumn === 'close' ? 'open' : 'close')}
              isActive={statusUsersColumn !== 'open'}>
              <SvgArrowLeft size={30} />
            </UsersHeader>
          )}
          <ScrollBox maxHeight={'600px'}>
            {listFriends &&
              listFriends.map((user, index) => (
                <UserItemComponent
                  key={index}
                  user={user}
                  activeUser={activeUser}
                  onlineUsers={onlineUsers}
                  statusColumns={statusUsersColumn}
                  newMessages={newMessages.filter((msg) => {
                    if (msg?.to === user.id || msg.author === user.id) {
                      return msg;
                    }
                  })}
                  // FIXME: Backend add to params
                  onChooseActiveChat={handleChooseActiveChat}
                />
              ))}
          </ScrollBox>
        </ColumnUsers>
      )}
      <Content>
        {activeUser?.id && (
          <MessagesContainer
            activeUser={activeUser}
            myUser={myUser}
            isMobile={isMobile}
            statusUsersColumn={statusUsersColumn}
            setStatusUsersColumn={setStatusUsersColumn}
            newMessages={newMessages.filter(
              (msg) => msg.to === activeUser.id || msg.author === activeUser.id
            )}
            setNewMessages={setNewMessages}
          />
        )}
      </Content>
    </Container>
  );
}
