import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tile, Wrapper, Language, Component } from './style';
import { SvgChoseLanguage } from '@game-trade/icons';
import { COLORS } from '../../../styles';
import { Cookies } from 'react-cookie-consent';
import { i18next } from '@game-trade/lib/services/i18n';
import {
  languages,
  getLangCookies,
  setLangCookies,
  getLanguage,
} from '@game-trade/lib/services/i18n/utils';
import { useAuthContext } from '@game-trade/lib';
import { User, useUserAccountInfoLazyQuery } from '@game-trade/lib/codegen-types';

import 'moment/locale/ja';
import moment from 'moment';
const changeMomentJs = (lang: string) => {
  moment.locale(lang);
};

const changeI18nConfig = async (lang: string) => {
  await i18next.changeLanguage(lang);
};

const changeRoute = (lang: string, router: any) => {
  if (`${lang}~${getLanguage(lang)?.name}` === 'en~english') {
    router.replace(router.asPath, router.asPath, { locale: false });
  } else {
    router.replace(router.asPath, router.asPath, { locale: lang });
  }
};

export const changeLanguageGlobal = async (lang: string, router: any) => {
  setLangCookies(lang);
  changeMomentJs(lang);
  await changeI18nConfig(lang);
  changeRoute(lang, router);
};

export const ChoseLanguage = ({
  footer = false,
  setLocaleValue,
}: {
  footer?: boolean;
  setLocaleValue?: (lang: string) => void;
}) => {
  const [getUserAccountInfo, { data: user }] = useUserAccountInfoLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const {
    authProviderData: { isAuthenticated },
  } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) getUserAccountInfo();
  }, [isAuthenticated]);

  const userData = user && user.me ? ({ ...user.me } as User) : null;

  const router = useRouter();
  const [languagesWindow, showLanguagesWindow] = useState(!footer);
  const [selected, setSelected] = useState<string | null | undefined>(userData?.locale);

  const selectLang = async (lang: string) => {
    setSelected(lang);
    if (!footer) {
      if (setLocaleValue) {
        setLocaleValue(lang);
      }
      return;
    }
    setLangCookies(lang);
    showLanguagesWindow(false);
  };

  useEffect(() => {
    const lang = getLangCookies();
    if (lang !== router.locale) {
      changeRoute(lang, router);
    }
  }, [getLangCookies()]);

  useEffect(() => {
    const lang = getLangCookies();
    if (lang === router.locale && i18next.resolvedLanguage !== lang) {
      changeI18nConfig(lang);
      changeMomentJs(lang);
    }
  }, [router]);

  useEffect(() => {
    if (!Cookies.get('lang') && navigator) {
      const find = navigator.languages.find((lang) => getLanguage(lang));
      if (find) {
        changeRoute(find, router);
        setLangCookies(find);
      } else {
        changeRoute('en', router);
        setLangCookies('en');
      }
    } else {
      const lang = getLangCookies();
      if (lang !== router.locale) {
        setLangCookies(lang);
        return;
      }

      if (lang !== i18next.resolvedLanguage) {
        changeI18nConfig(lang);
        changeMomentJs(lang);
      }
    }
  }, []);

  useEffect(() => {
    const lang = languages.find((lang) => userData?.locale === lang.code);
    const code = lang ? lang.code : 'en';
    if (
      userData?.locale &&
      isAuthenticated &&
      languages.find((lang) => userData.locale === lang.code)
    ) {
      setSelected(userData?.locale);
      setLangCookies(code);
    }
  }, [userData?.locale, isAuthenticated]);

  if (isAuthenticated && footer) {
    return <></>;
  }

  return (
    <Component footer={footer}>
      {footer && (
        <Language onClick={() => showLanguagesWindow(!languagesWindow)}>
          Choose language <SvgChoseLanguage color={COLORS.pink} />
        </Language>
      )}
      {languagesWindow && (
        <Wrapper window={footer} open={languagesWindow}>
          {router.locales?.map((lang) => {
            return (
              <Tile
                onClick={() => selectLang(lang)}
                key={getLanguage(lang)?.code}
                selected={selected === getLanguage(lang)?.code}>
                {getLanguage(lang)?.title}
              </Tile>
            );
          })}
        </Wrapper>
      )}
    </Component>
  );
};

// import { useTranslation } from 'react-i18next';
// import { useTranslation } from '@game-trade/lib/src/i18n';
// const { t } = useTranslation('buttons', { keyPrefix: 'translation' });
// i18next.t(
