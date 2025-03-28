import React, { useCallback } from 'react';
import Link from 'next/link';

import { ItemStyled } from './style';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

interface IProps {
  title: string;
  link: string;
  notPage?: boolean;
  onClick?: () => void;
  isFooter?: boolean;
  className?: string;
}

export const Item = React.forwardRef<HTMLDivElement, IProps>(
  ({ title, link, notPage, onClick, isFooter, className }, ref) => {
    const handlePageNotFound = useCallback(() => {
      console.warn('handlePageNotFound');
    }, []);
    const { t } = useTranslation('common', { keyPrefix: 'translation' });

    return (
      <ItemStyled ref={ref} onClick={onClick} isFooter={isFooter} className={className}>
        {notPage ? (
          <div onClick={handlePageNotFound}>{title}</div>
        ) : (
          <Link href={link}>{t('menu.' + title)}</Link>
        )}
      </ItemStyled>
    );
  }
);
