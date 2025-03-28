import { TitleTabPage } from '../style';
import React, { useState } from 'react';
import { SvgCopy, SvgInfo } from '@game-trade/icons';
import { CopyWrapper, Overlay, OverlayContainer, PopUpWindow } from './style';
import { useTranslation } from 'next-i18next';

export const OverlayProfileTab = ({ userPlayerToken }: { userPlayerToken: any }) => {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const [copy, setCopy] = useState(false);

  return (
    <OverlayContainer>
      <TitleTabPage>
        <span>{t('overlay')}</span>
      </TitleTabPage>
      <Overlay>
        <SvgInfo />
        <PopUpWindow>{t('useThisToken')}</PopUpWindow>
        {t('yourOverlayToken')}
      </Overlay>
      <CopyWrapper
        copy={copy}
        onClick={() => {
          navigator.clipboard.writeText(userPlayerToken?.me?.player_token);
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 2000);
        }}>
        {userPlayerToken?.me?.player_token} <SvgCopy size={16} />
      </CopyWrapper>
    </OverlayContainer>
  );
};
