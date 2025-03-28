import React from 'react';
import Image from 'next/image';

import {
  ItemStyled,
  WrapperImage,
  Position,
  WrapperInfo,
  Name,
  Stroke,
  Description,
} from './style';

import { IPerson } from '@/containers/team/index';
import { useTranslation } from 'next-i18next';

export const Item = ({ img, name, post, description }: IPerson) => {
  const { t } = useTranslation('teamPage', { keyPrefix: 'translation' });

  return (
    <ItemStyled>
      <WrapperImage>
        {img && <Image layout="fill" objectFit="cover" src={img} alt={name} />}
      </WrapperImage>
      <WrapperInfo>
        <Position>{t(post)}</Position>
        <Name>{t(name)}</Name>
        <Stroke />
        <Description>{t(description)}</Description>
      </WrapperInfo>
    </ItemStyled>
  );
};
