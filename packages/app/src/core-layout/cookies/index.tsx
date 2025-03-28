import { useTranslation } from '@game-trade/lib/services/i18n/index.js';
import React, { useEffect, useState } from 'react';
import CookieConsent, { Cookies, resetCookieConsentValue } from 'react-cookie-consent';

import { Wrapper } from './style';

export const CookiesComponent = () => {
  const { t } = useTranslation('elements', { keyPrefix: 'translation' });
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!Cookies.get('cookie-policy__accept')) {
      setVisible(true);
    }
  }, []);
  return (
    <>
      {visible && (
        <CookieConsent
          location="bottom"
          style={{
            pointerEvents: 'initial',
            background: '#25192C',
            padding: '2rem',
            fontSize: '3.6rem',
            paddingRight: '15rem',
            position: 'relative',
            boxShadow: 'rgb(88 130 255) 0px 0px 5rem',
          }}
          visible={'byCookieValue'}
          expires={150}
          ButtonComponent={() => {
            return (
              <Wrapper
                onClick={() => {
                  Cookies.set('cookie-policy__accept', true);
                  setVisible(false);
                  resetCookieConsentValue();
                }}>
                {t('acceptCookies')}{' '}
              </Wrapper>
            );
          }}>
          {t('cookies')}{' '}
        </CookieConsent>
      )}
    </>
  );
};
