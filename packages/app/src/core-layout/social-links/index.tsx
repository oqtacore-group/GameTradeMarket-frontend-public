import React from 'react';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

import { Socials, SocialsTitle, SocialContent } from './style';
import { SocialNetworkIconComponent } from '@game-trade/ui/modifiers/get-social-network-icon';

export const SocialLinks = () => {
  const { t } = useTranslation('common', { keyPrefix: 'translation' });
  return (
    <Socials>
      <SocialsTitle>{t('footer.joinTheCommunity')}</SocialsTitle>
      <SocialContent>
        <SocialNetworkIconComponent
          network={'twitter'}
          link={'https://twitter.com/GameTradeMarket'}
        />
        <SocialNetworkIconComponent network={'discord'} link={'https://discord.gg/gametrade'} />
      </SocialContent>
    </Socials>
  );
};
