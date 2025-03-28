import React from 'react';
import { Accordion } from '@game-trade/ui';
import { IAccordionItem } from '@game-trade/ui/elements/accordion/interfaces';

import { PageWrapper, PageContentWrapper, Header, Content } from './style';
import { ContactUs } from './contact-us';
import { useTranslation } from 'next-i18next';

export const HowItWorksContainer = () => {
  const { t } = useTranslation('howitworksPage', { keyPrefix: 'translation' });

  const accordionData: IAccordionItem[] = [
    {
      id: 1,
      title: t('title'),
      content: (
        <div>
          <p>{t('p1')}</p>
          <p>{t('p2')}</p>
          <p>{t('p3')}</p>
          <p>{t('p4')}</p>
          <p>{t('p5')}</p>
          <ul>
            <li>{t('p6')}</li>
            <li>{t('p7')}</li>
            <li>{t('p8')}</li>
            <li>{t('p9')}</li>
            <li>{t('p10')}</li>
          </ul>
          <p>{t('p11')}</p>
          <p>{t('p12')}</p>
          <p>{t('p13')}</p>
        </div>
      ),
    },
    {
      id: 2,
      title: t('accordion_1.title'),
      content: (
        <div>
          <p> {t('accordion_1.text_1')} </p>
          <p>{t('accordion_1.text_2')}</p>
          <ul>
            <li>{t('accordion_1.text_3')}</li>
            <li>{t('accordion_1.text_4')}</li>
          </ul>
          <p>{t('accordion_1.text_5')}</p>
        </div>
      ),
    },
    {
      id: 3,
      title: t('accordion_2.title'),
      content: (
        <div>
          <p>{t('accordion_2.text_1')} </p>

          <p>{t('accordion_2.text_2')}</p>

          <p>{t('accordion_2.text_3')}</p>

          <p>
            <strong>{t('accordion_2.text_4')}</strong>.{t('accordion_2.text_4_4')}
          </p>

          <p>{t('accordion_2.text_5')}</p>
        </div>
      ),
    },
    {
      id: 4,
      title: t('accordion_3.title'),
      content: (
        <div>
          <p>{t('accordion_3.text_1')}</p>
          <ol>
            <li>{t('accordion_3.text_2')}</li>
            <li>{t('accordion_3.text_3')}</li>
            <li>{t('accordion_3.text_4')}</li>
            <li>{t('accordion_3.text_5')}</li>
            <li>{t('accordion_3.text_6')}</li>
          </ol>
        </div>
      ),
    },
  ];

  return (
    <PageWrapper>
      {/*<BreadCrumbs crumbs={targetBreadCrumbs} />*/}
      <PageContentWrapper>
        <Header>{t('head')}</Header>
        <Content>
          <Accordion list={accordionData} />
          <ContactUs />
        </Content>
      </PageContentWrapper>
    </PageWrapper>
  );
};
