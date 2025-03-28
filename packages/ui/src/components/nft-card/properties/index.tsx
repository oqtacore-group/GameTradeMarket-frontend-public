import React from 'react';
// import { useTranslation } from '@game-trade/ui/i18n';

import { WrapperPropertiesCard, ActionName, Name, Description, Percent } from './style';
import { Maybe, Scalars } from '@game-trade/lib/codegen-types';

interface IPropertiesCardProps {
  actionName: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  maxCount?: Scalars['Int'];
  maxValue?: Maybe<Scalars['String']>;
}

export const PropertiesCard = ({ actionName, value, maxCount, maxValue }: IPropertiesCardProps) => {
  // const { t } = useTranslation('elements', { keyPrefix: 'translation' });
  return (
    <WrapperPropertiesCard>
      <ActionName>{actionName}</ActionName>
      <Name>{value}</Name>
      <Description>
        {maxValue && (
          <>
            <Percent>{maxValue}%</Percent> maximum value
          </>
        )}
      </Description>
    </WrapperPropertiesCard>
  );
};
