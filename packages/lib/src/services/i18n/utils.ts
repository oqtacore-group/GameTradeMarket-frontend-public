import { Cookies } from 'react-cookie-consent';

export const languages: { name: string; title: string; code: string }[] = [
  {
    name: 'english',
    title: 'English',
    code: 'en',
  },
  {
    name: 'japanase',
    title: '日本語',
    code: 'jp',
  },
];

export const getLanguage = (lang: string) => {
  if (languages.find((l) => l.code === lang)) {
    return languages.find((l) => l.code === lang);
  }
};

export const setLangCookies = (lang: string) => {
  Cookies.set('lang', `${lang}~${getLanguage(lang)?.name}`);
};

export const getLangCookies = () => {
  if (!Cookies.get('lang')) return 'en';
  return Cookies.get('lang').split('~')[0];
};
