import React from 'react';

import { TitleUsersWrapper, TitlePeople, UsersCount } from './style';
import { useTranslation } from 'next-i18next';

interface IProps {
  usersCount?: number;
}

export const TitleUsers = (props: IProps) => {
  const { t } = useTranslation('peoplePage', { keyPrefix: 'translation' });
  const { usersCount = 0 } = props;

  return (
    <TitleUsersWrapper>
      <TitlePeople>{t('people')}</TitlePeople>
      <UsersCount>{`${usersCount} ${t('users')}`}</UsersCount>
    </TitleUsersWrapper>
  );
};
