import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { BreadCrumbs } from '@game-trade/ui';
import { routes } from '@game-trade/lib';

import { ColumnMenu, ColumnMenuItem, ColumnMenuHeader, Container, Content } from './style';
import { GeneralProfileTab } from './general/general';
import { ReferralProfileTab } from './referral';
import {
  useUserAccountOverlayLazyQuery,
  useUserAccountPromoCodeLazyQuery,
} from '@game-trade/lib/codegen-types';
import { useTranslation } from 'next-i18next';
import { OverlayProfileTab } from './overlay/overlay';
const WalletProfileTab = dynamic(() => import('./wallets'), { ssr: false });

enum TABS {
  General = 'general',
  Wallets = 'wallets',
  Referral = 'referral',
  Overlay = 'overlay',
}

const TabsMapComponent = {
  [TABS.General]: () => <GeneralProfileTab />,
  [TABS.Wallets]: () => <WalletProfileTab />,
  [TABS.Referral]: (props: any) => <ReferralProfileTab {...props} />,
  [TABS.Overlay]: (props: any) => <OverlayProfileTab {...props} />,
};

export const AccountContainer = () => {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const { query, replace, pathname, isReady } = useRouter();
  const [getPromoCode, { data: userPromoCode }] = useUserAccountPromoCodeLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [getPlayerToken, { data: userPlayerToken }] = useUserAccountOverlayLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    getPromoCode();
  }, []);

  useEffect(() => {
    getPlayerToken();
  }, []);

  const [tabs, setTabs] = useState([
    {
      title: TABS.General,
      available: true,
      isActive: true,
    },
    {
      title: TABS.Wallets,
      available: true,
      isActive: false,
    },
  ]);

  useEffect(() => {
    if (userPromoCode && !tabs.find((tab) => tab.title === TABS.Referral)) {
      setTabs((prev: any) => {
        return [
          ...prev,
          {
            title: TABS.Referral,
            available: !!userPromoCode?.me?.promoCode,
            isActive: false,
          },
        ];
      });
    }
  }, [userPromoCode]);

  useEffect(() => {
    if (userPlayerToken && !tabs.find((tab) => tab.title === TABS.Overlay)) {
      setTabs((prev: any) => {
        return [
          ...prev,
          {
            title: TABS.Overlay,
            available: !!userPlayerToken?.me?.player_token,
            isActive: false,
          },
        ];
      });
    }
  }, [userPlayerToken]);

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
          query: { screen: TABS.General },
        });
        setTabs(
          tabs.map((tab) => ({
            ...tab,
            isActive: tab.title === TABS.General,
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
    <>
      <BreadCrumbs
        crumbs={[
          { label: `${t('marketplace')}`, href: routes.marketplaceDefaultGameName },
          { label: `${t('myAccount')}`, href: routes.account },
        ]}
      />

      <Container>
        <ColumnMenu>
          <ColumnMenuHeader>{t('myAccount')}</ColumnMenuHeader>

          {tabs.map(
            (tab) =>
              tab.available && (
                <ColumnMenuItem
                  key={tab.title}
                  isActive={tab.isActive}
                  onClick={() => setActiveTab(tab.title)}>
                  {t(tab.title)}
                </ColumnMenuItem>
              )
          )}
        </ColumnMenu>

        <Content>
          {activeTab && TabsMapComponent[activeTab.title]({ userPromoCode, userPlayerToken })}
        </Content>
      </Container>
    </>
  );
};
