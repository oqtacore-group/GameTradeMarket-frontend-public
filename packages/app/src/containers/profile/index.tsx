import React, { useEffect, useCallback, memo } from 'react';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import {
  useIsMyFriendLazyQuery,
  useIsFriendRequestSentLazyQuery,
} from '@game-trade/lib/src/codegen-types';
import {
  ALIGN,
  Loader,
  SIZE,
  Tabs,
  Select,
  Search,
  PaginationNew,
  BreadCrumbs,
} from '@game-trade/ui';
import { useAuthContext, routes, useNotificationsContext } from '@game-trade/lib';

import { socket } from '../notifications/utils';
import IconEmptyItemImageSvg from '@game-trade/app/public/imgs/icon_empty_item_image.svg';
import {
  Wrapper,
  FilterRow,
  FilterCell,
  ItemsTable,
  ItemBox,
  EmptyState,
  LoadingWrapper,
  FlexContentBlock,
  LeftFlexSide,
  PaginationBox,
  EmptyTokenImageWrapper,
} from './style';
import { initialTabs, getItemIconSize, isUUIDv4 } from './utils';
import { getUserInfo } from './hooks';
import { TabId } from './interface';
import { Header } from './header';
import { Friends } from './friends';
import { useTranslation } from 'next-i18next';

interface IProps {
  userId?: string;
}

const DEFAULT_OFFSET_DESKTOP = 100;
const DEFAULT_OFFSET_MOBILE = 100;
export const ProfileContainer = memo(({ userId }: IProps) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'translation' });
  const {
    authProviderData: { userInfoData },
  } = useAuthContext();

  const { notifications, setNotifications } = useNotificationsContext();

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1280px)');

  const {
    loading,
    items,
    setSelectedGame,
    setActiveTabId,
    setOffsetStep,
    setPage,
    total,
    page,
    offsetStep,
    selectedGame,
    activeTabId,
    searchString,
    setSearchString,
    gamesOptions,
    imageUrl,
    email,
    nickName,
    friendsCount,
    friends,
  } = getUserInfo(userId as string, !isUUIDv4(userId as string) ? (userId as string) : '');

  const isMe = useCallback(
    () => [userInfoData?.id, userInfoData?.custom_url].includes(userId),
    [userInfoData, userId]
  );

  useEffect(() => {
    if (!userId || !socket) return;
    socket.emit('notificationClearFriendRequestSentFromSender', { senderIdOrCustomUrl: userId });
    setTimeout(() => clearNotifications(), 2000);
  }, [userId]);

  const clearNotifications = useCallback(() => {
    setNotifications(
      notifications.filter((n: any) => n.data?.senderId !== userId && n.data?.customUrl !== userId)
    );
  }, [notifications, setNotifications]);

  useEffect(() => {
    if (!isTablet && !isMobile) {
      setOffsetStep(DEFAULT_OFFSET_DESKTOP);
    }

    if (isTablet && !isMobile) {
      setOffsetStep(DEFAULT_OFFSET_DESKTOP);
    }

    if (isMobile) {
      setOffsetStep(DEFAULT_OFFSET_MOBILE);
    }
  }, [isMobile, isTablet]);

  const onChangeTab = (tabId: TabId) => {
    setActiveTabId(tabId);
  };

  const onChangeGame = (activeId: string | undefined) => {
    setSelectedGame(activeId);
  };

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const onSearch = (value: string) => {
    setSearchString(value);
  };

  const [checkIsMyFriend, { data: isMyFriend, loading: checkIsMyFriendLoading }] =
    useIsMyFriendLazyQuery({ fetchPolicy: 'no-cache' });

  const [checkIsFriendRequestSent, { data: isFriendRequestSent }] = useIsFriendRequestSentLazyQuery(
    { fetchPolicy: 'no-cache' }
  );

  useEffect(() => {
    if (isMe() || !userId) return;

    checkIsMyFriend({
      variables: {
        friend: userId,
      },
    });

    checkIsFriendRequestSent({
      variables: {
        friend: userId,
      },
    });
  }, [isMe, userId]);

  return (
    <Wrapper>
      <BreadCrumbs
        crumbs={[
          { label: t('marketplace'), href: routes.marketplaceDefaultGameName },
          { label: isMe() ? t('myProfile') : t('userProfile'), href: null },
        ]}
      />

      <Header
        imageUrl={imageUrl}
        nickName={nickName}
        email={email}
        userId={userId}
        isMe={isMe()}
        isMyFriend={!!isMyFriend?.isMyFriend?.isMyFriend}
        checkIsMyFriendLoading={checkIsMyFriendLoading}
        isFriendRequestSent={!!isFriendRequestSent?.isFriendRequestSent?.isFriendRequestSent}
      />

      <FlexContentBlock>
        <LeftFlexSide>
          <Tabs
            tabs={initialTabs}
            activeTabId={activeTabId}
            onChange={onChangeTab}
            isLoading={loading}
            total={total}
          />

          <FilterRow>
            <FilterCell>
              <Select
                options={gamesOptions}
                selectedId={selectedGame}
                onChange={onChangeGame}
                placeholder={t('game')}
              />
            </FilterCell>

            <FilterCell>
              <Search initialValue={searchString} onChange={onSearch} />
            </FilterCell>
          </FilterRow>

          {loading && (
            <LoadingWrapper>
              <Loader size={SIZE.BASE} position={ALIGN.CENTER} />
            </LoadingWrapper>
          )}

          {items && items?.length > 0 && !loading && (
            <ItemsTable>
              {items?.map((item) => (
                <Link
                  key={item?.token_value}
                  href={{
                    pathname: `${routes.marketplace}${routes.token}/[network]/[gameContract]/[tokenCardId]`,
                  }}
                  as={`${routes.marketplace}${routes.token}/${item.blockchain}/${item.contract}/${item?.token_value}`}
                  passHref={true}>
                  <ItemBox key={item?.token_value}>
                    {item?.picture ? (
                      <Image
                        loader={() => item?.picture || ''}
                        layout={'intrinsic'}
                        src={item?.picture}
                        width={getItemIconSize(isMobile, isTablet)}
                        height={getItemIconSize(isMobile, isTablet)}
                        alt={item?.name || 'item GameTradeMarket'}
                      />
                    ) : (
                      <EmptyTokenImageWrapper>
                        <IconEmptyItemImageSvg />
                      </EmptyTokenImageWrapper>
                    )}
                  </ItemBox>
                </Link>
              ))}
            </ItemsTable>
          )}

          {(!items || items?.length === 0) && !loading && (
            <EmptyState>{t('tabs.noItems')}</EmptyState>
          )}

          <PaginationBox>
            <PaginationNew
              offsetStep={offsetStep}
              total={total}
              page={page}
              onPageChange={onChangePage}
            />
          </PaginationBox>
        </LeftFlexSide>

        <Friends
          friends={friends}
          friendsCount={friendsCount}
          isMe={isMe()}
          userIdOrCustomUrl={userId!}
        />
      </FlexContentBlock>
    </Wrapper>
  );
});
