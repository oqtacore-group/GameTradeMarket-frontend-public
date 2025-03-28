import React from 'react';
import Link from 'next/link';
import { routes, useAuthContext } from '@game-trade/lib';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { Logo } from '../logo';
import { SocialLinks } from '../social-links';
import { SubscribeComponent } from '../subscribe';
import { getDeveloperStatus, getMenuItemsFooter } from '../navigation/utils';

import {
  Content,
  ContentWrapper,
  Row,
  Form,
  LogoText,
  SubscribeComponentWrapper,
  FooterContainer,
  LogoFooter,
  Copyright,
  FooterMenu,
  FooterMenuItem,
  CopyrightWrapper,
  List,
  WrapperSocialLinks,
  WrapperChoseLanguage,
} from './style';
import { ChoseLanguage } from '@game-trade/ui/components/languages/chose-language';
// { isAuthenticated }: { isAuthenticated: boolean | undefined }
export const Footer = () => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();
  const menuItems = getMenuItemsFooter(isAuthenticated);
  return (
    <FooterContainer>
      <Content>
        <ContentWrapper>
          <Form>
            <LogoText>
              <LogoFooter>
                <Logo />
              </LogoFooter>
              <p>{t('footer.description')}</p>
            </LogoText>
            <SubscribeComponentWrapper>
              <SubscribeComponent />
            </SubscribeComponentWrapper>
          </Form>
          {(!Number(process.env.NEXT_PUBLIC_UPDATING_SITE) || getDeveloperStatus()) && (
            <>
              <FooterMenu>
                {menuItems.slice(0, 5).map((menuItem: any, index) => (
                  <FooterMenuItem key={index} {...menuItem} isFooter={true} />
                ))}
              </FooterMenu>
              <FooterMenu>
                {menuItems.slice(5).map((menuItem: any, index) => (
                  <FooterMenuItem key={index} {...menuItem} isFooter={true} />
                ))}
              </FooterMenu>
            </>
          )}
        </ContentWrapper>
        <Row>
          <WrapperChoseLanguage>
            <ChoseLanguage footer={true} />
          </WrapperChoseLanguage>
        </Row>
        <Row>
          <WrapperSocialLinks>
            <SocialLinks />
          </WrapperSocialLinks>
        </Row>
      </Content>
      <hr />
      <Copyright>
        <CopyrightWrapper>
          <div>© {new Date().getFullYear()} GameTrade</div>
          <List>
            <li>
              <Link href={routes.policy}>{t('footer.privacyPolicy')}</Link>
            </li>
            <li>
              <Link href={routes.terms}>{t('footer.termsOfService')}</Link>
            </li>
          </List>
        </CopyrightWrapper>
      </Copyright>

      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-KJCB6DD"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </FooterContainer>
  );
};
