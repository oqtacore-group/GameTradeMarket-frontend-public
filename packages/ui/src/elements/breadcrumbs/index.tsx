import React, { Fragment } from 'react';
import { SvgChevronRight } from '@game-trade/icons';

import { ICrumb } from './interfaces';
import { BreadCrumbItem } from './bread-crumb-item';
import { BreadCrumbsWrapper, Separator } from './style';

export type { ICrumb } from './interfaces';

interface IProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs = (props: IProps) => {
  const { crumbs } = props;
  const lastIndex = crumbs.length - 1;

  return (
    <BreadCrumbsWrapper>
      {crumbs.map((crumb: ICrumb, index: number) => (
        <Fragment key={crumb.label}>
          <BreadCrumbItem crumb={crumb} />

          {index !== lastIndex && (
            <Separator>
              <SvgChevronRight />
            </Separator>
          )}
        </Fragment>
      ))}
    </BreadCrumbsWrapper>
  );
};
