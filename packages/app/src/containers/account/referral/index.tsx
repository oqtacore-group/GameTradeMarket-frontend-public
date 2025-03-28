import { TitleTabPage } from '../style';
import React, { useState } from 'react';
import { CopyWrapper, PopUpWindow, PromoCode, ReferralContainer } from './style';
import { SvgCopy, SvgInfo } from '@game-trade/icons';
import { useTranslation } from 'next-i18next';

// UserAccountInfo
// UserAccountPromoCode

export const ReferralProfileTab = ({ userPromoCode }: { userPromoCode: any }) => {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const [copy, setCopy] = useState(false);

  return (
    <ReferralContainer>
      <TitleTabPage>
        <span>{t('referral')}</span>
      </TitleTabPage>
      <PromoCode>
        <SvgInfo />
        <PopUpWindow>{t('referralEarn')}</PopUpWindow>
        {t('link')}
      </PromoCode>
      <CopyWrapper
        copy={copy}
        onClick={() => {
          navigator.clipboard.writeText(
            `https://gametrade.market/?promoCode=${userPromoCode?.me?.promoCode}`
          );
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 2000);
        }}>
        https://gametrade.market/?promoCode={userPromoCode?.me?.promoCode} <SvgCopy size={16} />
      </CopyWrapper>
    </ReferralContainer>
  );
};
