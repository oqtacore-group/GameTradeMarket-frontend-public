import { memo, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import moment from 'moment';

import { useAuthContext, routes, getLastVisitedReadable } from '@game-trade/lib';
import { SvgAvatarPerson } from '@game-trade/icons';
import { Modal } from '@game-trade/ui';
import {
  useMyFriendsLazyQuery,
  useRemoveFromFriendsMutation,
} from '@game-trade/lib/src/codegen-types';

import {
  TopHeader,
  FriendsWrapper,
  FriendWrapper,
  AvatarAndName,
  Name,
  ActionBtns,
  RemoveBtn,
  SendMessageBtn,
  OnlineStatus,
  ModalContent,
  ConfirmModalRowButtons,
  ModalButton,
} from './style';
import { useTranslation } from 'next-i18next';

// interface IProps {}

export const TabFriendsList = memo(() => {
  const { t } = useTranslation('manageFriendsPage', { keyPrefix: 'translation.tabFriend' });
  const {
    authProviderData: { userInfoData },
  } = useAuthContext();

  const [removeFromFriends] = useRemoveFromFriendsMutation({
    fetchPolicy: 'no-cache',
  });

  const [friendIdToDelete, setFriendIdToDelete] = useState<string>('');

  const handleRemoveFromFriends = useCallback(async () => {
    await removeFromFriends({
      variables: {
        friend: friendIdToDelete,
      },
    });

    getMyFriends();

    hideRemoveFromFriendsModal();
  }, [friendIdToDelete]);

  const [removeFromFriendsModalVisible, setRemoveFromFriendsModalVisible] =
    useState<boolean>(false);
  const showRemoveFromFriendsModal = useCallback((e: any) => {
    setFriendIdToDelete(e.currentTarget.dataset.friendId!);
    setRemoveFromFriendsModalVisible(true);
  }, []);
  const hideRemoveFromFriendsModal = useCallback(() => setRemoveFromFriendsModalVisible(false), []);

  // if (!userInfoData) return null;

  const [getMyFriends, { data: friendsData, loading: friendsLoading }] = useMyFriendsLazyQuery({
    variables: {
      id: userInfoData?.id || '',
      customUrl: (userInfoData?.custom_url as string) || ('' as string),
    },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getMyFriends();
  }, []);

  const friendsList = friendsData?.user?.friends?.edges.node;

  if (friendsLoading || !friendsList) return <>{t('loading')}</>;

  const usersCount = friendsData?.user?.friends?.totalCount || 0;

  return (
    <>
      <TopHeader>
        {t('headlineFriends')} &nbsp;
        <small>
          {usersCount} {usersCount === 1 ? t('friend') : t('friends')}
        </small>
      </TopHeader>

      <FriendsWrapper>
        {friendsList.map((friend: any) => (
          <FriendWrapper key={friend.id}>
            <Link
              href={{ pathname: `${routes.user}/[userId]` }}
              as={`/${routes.user}/${friend.custom_url || friend.id}`}
              passHref={true}>
              <AvatarAndName>
                {friend.image_url ? (
                  // eslint-disable-next-line
                  <img src={friend.image_url || ''} />
                ) : (
                  <SvgAvatarPerson width={`${75}px`} height={`${75}px`} />
                )}

                <div>
                  <Name>{friend.nick_name}</Name>

                  <OnlineStatus>
                    {friend.last_visited &&
                    moment(friend.last_visited) > moment().utc().subtract(10, 'minutes') ? (
                      <span style={{ color: '#FF41B3' }}>{t('online')}</span>
                    ) : (
                      <span style={{ color: '#8C9FB1' }}>
                        {getLastVisitedReadable(friend.last_visited)}
                      </span>
                    )}
                  </OnlineStatus>
                </div>
              </AvatarAndName>
            </Link>

            <ActionBtns>
              <RemoveBtn onClick={showRemoveFromFriendsModal} data-friend-id={friend.id}>
                {t('remove')}
              </RemoveBtn>

              <Link href={routes.chat} passHref={true}>
                <SendMessageBtn>{t('sendMessage')}</SendMessageBtn>
              </Link>
            </ActionBtns>
          </FriendWrapper>
        ))}

        {removeFromFriendsModalVisible && (
          <Modal
            onClose={hideRemoveFromFriendsModal}
            hasHeader={false}
            isPadding={false}
            size={455}>
            <ModalContent>
              <p>{t('removeFriends')}</p>

              <ConfirmModalRowButtons>
                <ModalButton onClick={handleRemoveFromFriends} dimension="m" appearance="secondary">
                  {t('yes')}
                </ModalButton>

                <ModalButton
                  onClick={hideRemoveFromFriendsModal}
                  dimension="m"
                  appearance="primary">
                  {t('no')}
                </ModalButton>
              </ConfirmModalRowButtons>
            </ModalContent>
          </Modal>
        )}
      </FriendsWrapper>
    </>
  );
});
