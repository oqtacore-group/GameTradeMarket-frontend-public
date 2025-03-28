import React from 'react';
import { Button } from '@game-trade/ui';

import { ContactUsWrapper, Title, Description, ButtonsList, ButtonWrapper } from './style';
import { useTranslation } from 'next-i18next';

export const ContactUs = () => {
  const { t } = useTranslation('howitworksPage', { keyPrefix: 'translation' });

  return (
    <ContactUsWrapper>
      <Title>{t('contactUs.title')}</Title>
      <Description>{t('contactUs.description')}</Description>
      <ButtonsList>
        <ButtonWrapper>
          <Button appearance="secondary">
            <a href="https://discord.gg/gametrade" target="_blank" rel="noreferrer">
              {t('contactUs.discord')}
            </a>
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button>
            <a
              href="https://gametrade-market.gitbook.io/gametrade.market/"
              target="_blank"
              rel="noreferrer">
              {t('contactUs.button')}
            </a>
          </Button>
        </ButtonWrapper>
      </ButtonsList>
    </ContactUsWrapper>
  );
};
