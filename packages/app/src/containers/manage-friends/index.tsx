import { memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuthContext, routes } from '@game-trade/lib';
import { BreadCrumbs } from '@game-trade/ui';

import { Wrapper } from '../profile/style';
import { Header } from '../profile/header';
import { ManageFriendsWrapper } from './style';
import { ColumnMenu, ColumnMenuItem, Content } from '../account/style';
import { TabFriendsList } from './tab-friends-list';
import { TabIncomingRequests } from './tab-incoming-requests';
import { TabOutgoingRequests } from './tab-outgoing-requests';
import { useTranslation } from 'next-i18next';

enum TABS {
  Friends = 'friends',
  IncomingRequests = 'incomingRequests',
  OutgoingRequests = 'outgoingRequests',
}

const TabsMapComponent = {
  [TABS.Friends]: () => <TabFriendsList />,
  [TABS.IncomingRequests]: () => <TabIncomingRequests />,
  [TABS.OutgoingRequests]: () => <TabOutgoingRequests />,
};

// interface IProps {}

export const ManageFriendsContainer = memo(() => {
  const { t } = useTranslation('manageFriendsPage', { keyPrefix: 'translation' });
  const {
    authProviderData: { userInfoData },
  } = useAuthContext();

  const { query, replace, pathname, isReady } = useRouter();

  const [tabs, setTabs] = useState([
    {
      title: TABS.Friends,
      isActive: true,
    },
    {
      title: TABS.IncomingRequests,
      isActive: false,
    },
    {
      title: TABS.OutgoingRequests,
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (isReady) {
      if (query.screen) {
        setTabs(
          tabs.map((tab) => ({
            ...tab,
            isActive: tab.title === query.screen,
          }))
        );
      } else {
        replace({
          pathname,
          query: { screen: TABS.Friends },
        });

        setTabs(
          tabs.map((tab) => ({
            ...tab,
            isActive: tab.title === TABS.Friends,
          }))
        );
      }
    }
  }, [query]);

  const setActiveTab = (tabName: TABS) => {
    replace({
      pathname,
      query: { screen: tabName },
    });
  };

  const activeTab = tabs.find((tab) => tab.isActive);

  return (
    <Wrapper>
      <BreadCrumbs
        crumbs={[
          { label: t('breadCrumbs.marketplace'), href: routes.marketplaceDefaultGameName },
          { label: t('breadCrumbs.manage'), href: routes.manageFriends },
          { label: t('tabs.' + tabs.find((tab) => tab.isActive)?.title) || '', href: null },
        ]}
      />

      {userInfoData && (
        <Header imageUrl={userInfoData.image_url} nickName={userInfoData.nick_name} isMe={true} />
      )}

      <ManageFriendsWrapper>
        <ColumnMenu>
          {tabs.map((tab) => (
            <ColumnMenuItem
              key={tab.title}
              isActive={tab.isActive}
              onClick={() => setActiveTab(tab.title)}>
              {t('tabs.' + tab.title)}
            </ColumnMenuItem>
          ))}
        </ColumnMenu>

        <Content>{activeTab && TabsMapComponent[activeTab.title]()}</Content>
      </ManageFriendsWrapper>
    </Wrapper>
  );
});
