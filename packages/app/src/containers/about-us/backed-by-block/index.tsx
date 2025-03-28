import React from 'react';
import { useTranslation } from 'next-i18next';
import { OurPartnersWrapper, PartnersWrapper } from './style';
import { Headline } from '../style';
import PartnerPolygon from '@root/public/imgs/partners/polygon.webp';
import PartnerBGA from '@root/public/imgs/partners/bga.webp';
import PartnerBitsCrunch from '@root/public/imgs/partners/bitscrunch.webp';
import PartnerHebys from '@root/public/imgs/partners/hebys.webp';
import PartnerXpNetwork from '@root/public/imgs/partners/xp-network.webp';
import PartnerVenly from '@root/public/imgs/partners/venly.webp';
import PartnerOpiPets from '@root/public/imgs/partners/opipets.webp';
import PartnerSHG from '@root/public/imgs/partners/SHG.png';

export const BackedByBlock = () => {
  const { t } = useTranslation('aboutUsPage', { keyPrefix: 'translation.backedBy' });
  return (
    <OurPartnersWrapper>
      <Headline data-text={t('headline')}>{t('headline')}</Headline>

      <PartnersWrapper>
        <img src={PartnerPolygon.src} alt="Polygon" />
        <img src={PartnerBGA.src} alt="BGA" />
        <img src={PartnerBitsCrunch.src} alt="BitsCrunch" style={{ marginLeft: '-15px' }} />
        <img src={PartnerHebys.src} alt="Hebys" style={{ height: '50px' }} />
        <img src={PartnerXpNetwork.src} alt="Xpnetwork" />
        <img src={PartnerVenly.src} alt="Venly" />
        <img src={PartnerOpiPets.src} alt="OpiPets" style={{ width: '45%', marginLeft: '0px' }} />
        <img src={PartnerSHG.src} alt="SHG Logo" style={{ width: '45%', marginLeft: '0px' }} />
      </PartnersWrapper>
    </OurPartnersWrapper>
  );
};
