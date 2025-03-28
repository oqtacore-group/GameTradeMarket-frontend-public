import { useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { routes, getLastVisitedReadable } from '@game-trade/lib';
import { Button } from '../../../index';
import { SvgAvatarPerson } from '@game-trade/icons';
import IconAddToFriendsSvg from '@game-trade/app/public/imgs/icon-user-card/icon_add-to-friends.svg';
import IconMessageSvg from '@game-trade/app/public/imgs/icon-user-card/icon_message.svg';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import {
  UserCardWrapper,
  UserImage,
  UserCardInner,
  ItemsCount,
  UserName,
  UserCoverImage,
  OnlineStatus,
  CompositedButton,
} from './style';

interface IProps {
  userCard: {
    id: string;
    nick_name: string;
    custom_url: string | null;
    image_url: string | null;
    last_visited: string | null;
    items_count: number;
    is_friendship_requested: boolean;
    is_friend: boolean;
  };
  handleSendFriendRequest: (e: React.MouseEvent<HTMLElement>) => void;
  handleCancelFriendshipRequest: (e: React.MouseEvent<HTMLElement>) => void;
}

export const UserCard = (props: IProps) => {
  const { t } = useTranslation('peoplePage', { keyPrefix: 'translation' });

  const { userCard, handleSendFriendRequest, handleCancelFriendshipRequest } = props;

  const handleSendMessage = useCallback(() => {
    console.log('Send message');
  }, []);

  const {
    id: userId,
    custom_url: customUrl,
    nick_name,
    image_url,
    is_friend,
    last_visited,
    items_count,
    is_friendship_requested,
  } = userCard;

  return (
    <UserCardWrapper>
      <UserCardInner>
        <UserCoverImage />

        <Link
          href={{ pathname: `${routes.user}/[userId]` }}
          as={`/${routes.user}/${customUrl || userId}`}
          passHref={true}>
          <UserImage>
            {image_url ? (
              <Image
                loader={() => image_url}
                src={image_url}
                objectFit="cover"
                width={100}
                height={100}
                alt="User avatar"
              />
            ) : (
              <div>
                <SvgAvatarPerson width={`${100}px`} height={`${100}px`} />
              </div>
            )}
          </UserImage>
        </Link>

        <Link
          href={{ pathname: `${routes.user}/[userId]` }}
          as={`/${routes.user}/${customUrl || userId}`}
          passHref={true}>
          <UserName>{nick_name}</UserName>
        </Link>

        <OnlineStatus>
          {last_visited && moment(last_visited) > moment().utc().subtract(10, 'minutes') ? (
            <span style={{ color: '#FF41B3' }}>{t('online')}</span>
          ) : (
            <span style={{ color: '#8C9FB1' }}>{getLastVisitedReadable(last_visited)}</span>
          )}
        </OnlineStatus>

        <ItemsCount>
          {items_count > 0 ? (
            <>
              {items_count} {t('item')}
              {items_count > 1 ? 's' : ''}
            </>
          ) : (
            t('noItems')
          )}
        </ItemsCount>

        {is_friendship_requested ? (
          <CompositedButton>
            <Button appearance="ghost" onClick={handleCancelFriendshipRequest}>
              {t('requestSent')}
            </Button>

            <Button
              appearance="ghost"
              onClick={handleCancelFriendshipRequest}
              data-sender-id={userId}>
              {t('cancelRequest')}
            </Button>
          </CompositedButton>
        ) : (
          <>
            {is_friend ? (
              <Link href={{ pathname: routes.chat }} passHref={true}>
                <Button
                  appearance="ghost"
                  icon={(<IconMessageSvg />) as any}
                  data-user-id={userId}
                  onClick={handleSendMessage}>
                  {t('sendMessage')}
                </Button>
              </Link>
            ) : (
              <Button
                icon={(<IconAddToFriendsSvg />) as any}
                data-user-id={userId}
                onClick={handleSendFriendRequest}>
                {t('addToFriends')}
              </Button>
            )}
          </>
        )}
      </UserCardInner>
    </UserCardWrapper>
  );
};
