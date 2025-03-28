import React from 'react';
import SaveliyLenivin from '@root/public/imgs/team/saveliy_l.webp';
import GlebDoykhen from '@root/public/imgs/team/gleb.webp';
import BasilBulgakov from '@root/public/imgs/team/basil_b.webp';
import SaveliyElisov from '@root/public/imgs/team/saveliy_e.webp';
import DmitryElisov from '@root/public/imgs/team/dmitry_e.webp';
import NikolayElisov from '@root/public/imgs/team/nikolay_e.webp';

import { Wrapper, Content, Header } from './style';
import { Persons } from './list';
import { useTranslation } from 'next-i18next';

export interface IPerson {
  img: any | null;
  post: string;
  name: string;
  description: string;
}

const persons: IPerson[] = [
  {
    img: GlebDoykhen,
    post: 'person_1.post',
    name: 'person_1.name',
    description: 'person_1.description',
  },
  {
    img: SaveliyElisov,
    post: 'person_2.post',
    name: 'person_2.name',
    description: 'person_2.description',
  },
  {
    img: DmitryElisov,
    post: 'person_3.post',
    name: 'person_3.name',
    description: 'person_3.description',
  },
  {
    img: NikolayElisov,
    post: 'person_4.post',
    name: 'person_4.name',
    description: 'person_4.description',
  },
  {
    img: BasilBulgakov,
    post: 'person_5.post',
    name: 'person_5.name',
    description: 'person_5.description',
  },
  {
    img: SaveliyLenivin,
    post: 'person_6.post',
    name: 'person_6.name',
    description: 'person_6.description',
  },
];

export const TeamContainer = () => {
  const { t } = useTranslation('teamPage', { keyPrefix: 'translation' });

  return (
    <Wrapper>
      <Content>
        <Header>{t('title')}</Header>
        <Persons data={persons} />
      </Content>
    </Wrapper>
  );
};
