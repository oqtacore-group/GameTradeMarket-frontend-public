import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PropertiesCard } from '@game-trade/ui';

import { WrapperContent, Headline, WrapperListCard } from './style';
import { useTranslation } from 'next-i18next';
import { CardPropDto } from '@game-trade/lib/codegen-types';

export const Properties = ({ data }: { data: CardPropDto[] }) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });

  return (
    <WrapperContent>
      <Headline>{t('properties')}</Headline>
      <WrapperListCard>
        {data?.map((item) => (
          <PropertiesCard
            key={uuidv4()}
            actionName={item.trait_type}
            value={item.value}
            maxValue={item.max_value}
            maxCount={item.max_count}
          />
        ))}
      </WrapperListCard>
    </WrapperContent>
  );
};
