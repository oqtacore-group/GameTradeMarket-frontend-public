import React from 'react';

import { Wrapper, Content, Header, GoogleCalendar } from './style';
import { useTranslation } from 'next-i18next';

export const EventCalendarContainer = () => {
  const { t } = useTranslation('eventCalendarPage', { keyPrefix: 'translation' });

  return (
    <Wrapper>
      <Content>
        <Header>{t('title')}</Header>
        <h4>{t('subtitle')}</h4>
        <GoogleCalendar
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&bgcolor=%23ffffff&ctz=Europe%2FLondon&hl=en_GB&showTitle=0&showDate=1&showPrint=0&showCalendars=0&src=c29jLm1lZGlhLmd0bUBnbWFpbC5jb20&color=%23039BE5"
          frameBorder="0"
          scrolling="no"
        />
      </Content>
    </Wrapper>
  );
};
