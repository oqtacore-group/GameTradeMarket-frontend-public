import i18next from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

const backend = new Backend({
  loadPath: '../app/public/locales/{{lng}}/{{ns}}.json',
});

i18next
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    ns: ['modifier', 'elements', 'common'],
    defaultNS: false,
    react: {
      useSuspense: false
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18next, useTranslation };

// example connect ns in component:
// i18next.loadNamespaces('modifiers');

// example connect ns wrapper component:
// withTranslation(['modifiers'])(NameComponent);
