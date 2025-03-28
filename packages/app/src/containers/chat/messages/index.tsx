import React, { useEffect, useState, useRef } from 'react';
// import { SvgSearch } from '@game-trade/icons';
import { format } from 'date-fns';

import { socket } from '../utils';

// import { FileUploader } from 'react-drag-drop-files';
import { EditorContainer } from './editor';
import {
  Container,
  Header,
  Footer,
  Content,
  // ScrollBox,
  UserName,
  // Visit,
  EmptyMessage,
  FormatDate,
  GroupMessagesContainer,
  GroupDate,
  // WrapperUploader,
} from './style';
// import { MessagesList } from './list';

import { IMessage } from '@/containers/account/interfaces';
import { MessageItem } from '@/containers/chat/messages/item';
import { Status } from '@game-trade/ui/components/filters-tokens-items/interfaces';
import { SvgArrowLeft } from '@game-trade/icons';
import { useTranslation } from 'next-i18next';

interface IProps {
  activeUser: any;
  myUser: any;
  newMessages: IMessage[];
  setNewMessages: (message: any) => void;
  isMobile: boolean;
  statusUsersColumn: Status;
  setStatusUsersColumn: (status: Status) => void;
}

interface IMessageHistory {
  edges: { node: IMessage[] };
  pageInfo: { hasNextPage: boolean };
  totalCount: number;
  unreadCount: number;
}

const messageFormatting = (messages: IMessage[]) => {
  return messages.reduce((prev: { [key: string]: IMessage[] }, current) => {
    const key = format(new Date(current.create_time), 'MMMM dd');
    if (prev[key]) {
      prev[key] = [current, ...prev[key]];
    } else {
      prev[key] = [current];
    }
    return prev;
  }, {});
};

const getNewMessages: (
  recipient: string,
  offset: number,
  first: number
) => Promise<IMessageHistory> = async (recipient, offset, first) => {
  const getMessages = () => {
    socket.emit('getMessages', {
      recipient,
      offset,
      first,
    });
  };
  const onGetMessages = () => {
    return new Promise<IMessageHistory>((resolve) => {
      socket.once('onGetMessages', (history: IMessageHistory) => {
        resolve(history);
      });
    });
  };
  await getMessages();
  return await onGetMessages();
};

export default function MessagesContainer({
  activeUser,
  newMessages,
  myUser,
  setNewMessages,
  isMobile,
  setStatusUsersColumn,
}: IProps) {
  const { t } = useTranslation('chatPage', { keyPrefix: 'translation' });

  // const [img, setImg] = useState<any>(null);
  // const [imgPreview, setImgPreview] = useState();
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [maxCountMessages, setMaxCountMessages] = useState<number>(0);
  const [messages, setMessages] = useState<IMessage[]>(newMessages);
  const [countPaginationMessages, setCountPaginationMessages] = useState<number>(0);
  const messageViewCount = 20;

  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (
          first.isIntersecting &&
          messagesContainerRef &&
          messagesContainerRef.current &&
          Math.abs(messagesContainerRef?.current?.scrollTop) + 1200 >
            messagesContainerRef?.current?.scrollHeight
        ) {
          setLoading(true);
          setPageNum((no) => no + 1);
        }
      },
      { threshold: 1 }
    )
  );

  const getMessages = () => {
    setCountPaginationMessages(countPaginationMessages + 1);
    getNewMessages(activeUser.id, countPaginationMessages + 1, messageViewCount).then((result) => {
      setMessages([...new Set([...messages, ...result.edges.node])]);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (pageNum <= maxCountMessages) {
      getMessages();
    }
  }, [pageNum]);

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);

  useEffect(() => {
    setMessages((prevState: any) => {
      const msgs = newMessages.reverse();
      return [...new Set([...msgs, ...prevState])];
    });
  }, [newMessages]);

  useEffect(() => {
    socket?.emit('getMessages', {
      recipient: activeUser.id,
      offset: 0,
      first: 20,
    });
    socket.once('onGetMessages', (history: IMessageHistory) => {
      if (history?.edges?.node) {
        setMessages(history?.edges?.node ?? newMessages);
        setMaxCountMessages(Math.ceil(history?.totalCount / messageViewCount));
      }
    });
  }, [activeUser]);

  const handleExportMessage = (message: string) => {
    socket.emit('textSend', {
      recipient: activeUser.id,
      context: message,
    });
    const msg = {
      ...myUser,
      context: message,
      to: activeUser.id,
      create_time: String(new Date()),
      state: {
        is_media: false,
        // FIXME: set false;
        is_read: true,
      },
    };
    setNewMessages((prevState: any) => [...new Set([...prevState, msg])]);
  };

  return (
    <Container>
      <Header>
        <UserName onClick={() => isMobile && setStatusUsersColumn('close')}>
          {isMobile && <SvgArrowLeft size={30} />}

          <span>{activeUser.nick_name}</span>
          {/*<Visit isActive={Boolean(activeUser.visit === 'online')}>{activeUser.visit}</Visit>*/}
        </UserName>

        {/*<SvgSearch size={18} />*/}
      </Header>
      {!messages?.length && <EmptyMessage>{t('youHaveNoMessage')}</EmptyMessage>}
      <Content ref={messagesContainerRef}>
        {!!messages?.length &&
          Object.entries(messageFormatting(messages)).map(([date, msgs], idx) => {
            return (
              <GroupDate key={`${date}-${idx}`}>
                <FormatDate>
                  <span>{date}</span>
                </FormatDate>
                <GroupMessagesContainer>
                  {msgs?.map((msg: any, i: number) => {
                    if (
                      i === 0 &&
                      !loading &&
                      idx === Object.keys(messageFormatting(messages)).length - 1 &&
                      pageNum <= maxCountMessages
                    ) {
                      return (
                        <div key={`${msg.create_time}-${i}`} ref={setElement}>
                          <MessageItem
                            key={msg.create_time + Math.random()}
                            message={msg}
                            activeUser={activeUser}
                          />
                        </div>
                      );
                    }
                    if (i === 0 && idx === 0) {
                      return (
                        <div key={`${msg.create_time}-${i}`}>
                          <MessageItem
                            key={msg.create_time + Math.random()}
                            message={msg}
                            activeUser={activeUser}
                          />
                          <div ref={messagesEndRef} />
                        </div>
                      );
                    }
                    return (
                      <div key={msg.create_time + Math.random()}>
                        <MessageItem
                          key={msg.create_time + Math.random()}
                          message={msg}
                          activeUser={activeUser}
                        />
                      </div>
                    );
                  })}
                </GroupMessagesContainer>
              </GroupDate>
            );
          })}
      </Content>
      <Footer>
        <EditorContainer exportMessage={handleExportMessage} />
      </Footer>
      {/*<p>{img ? `File name: ${img && img.name}` : 'no files uploaded yet'}</p>*/}
      {/*{imgPreview && <img src={imgPreview} width={150} style={{ marginTop: '10px' }} />}*/}
    </Container>
  );
}
