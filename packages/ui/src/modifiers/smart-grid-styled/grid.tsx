import React, { forwardRef, ReactNode } from 'react';

import { Grid as GridStyled } from './style';
import { IGridProps } from './interfaces';

interface IGridComponentProps extends Omit<IGridProps, 'sizeColumns'> {
  children: ReactNode;
  className?: string;
}

export const Grid = forwardRef((props: IGridComponentProps, ref: any) => {
  const { children, size = 12, ...otherProps } = props;
  const asArray = React.Children.toArray(children);
  const sizeColumns = asArray.map((item: any) => item.props.size || size);

  const childrenWithIndex = React.Children.map(children, (child: ReactNode, index: number) => {
    if (React.isValidElement<{ index: number }>(child)) {
      const typedChild = child as React.ReactElement<{ index: number }>;

      const clonedChild = React.cloneElement(typedChild, { index: index + 1 });
      return clonedChild;
    }
    return child;
  });

  return (
    <GridStyled ref={ref} size={size} {...otherProps} sizeColumns={sizeColumns}>
      {childrenWithIndex}
    </GridStyled>
  );
});

Grid.displayName = 'Grid';
