import React from 'react';
import Link from 'next/link';

import { ICrumb } from './interfaces';
import { BreadCrumbWrapper } from './style';

interface IProps {
  crumb: ICrumb;
}

export const BreadCrumbItem = (props: IProps) => {
  const { crumb } = props;

  return (
    <BreadCrumbWrapper>
      {crumb.href ? (
        <Link href={crumb.href} passHref={true}>
          {crumb.label}
        </Link>
      ) : (
        <span>{crumb.label}</span>
      )}
    </BreadCrumbWrapper>
  );
};
