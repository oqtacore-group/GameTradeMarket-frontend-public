import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';
import { ControlledField } from '@game-trade/ui';
import { SortValues } from '@game-trade/lib/src/codegen-types';

import { SortingWrapper, ControlsWrapper, ControlItemWrapper } from './style';
import { Dropdown, IOption } from './dropdown';
import { GridView } from './grid-view';

interface IProps {
  children: any;
  onChange(sortFormInputs: SortFormInputs): void;
  isWide?: boolean;
}

export interface ISortValue {
  key: string;
  direction: SortValues;
}

export type SortFormInputs = {
  sort?: ISortValue;
  view?: 'normal-columns' | 'small-columns';
};

const sortOptions: IOption<ISortValue>[] = [
  {
    label: 'Recently added',
    value: {
      key: 'date',
      direction: SortValues.Asc,
    },
  },
  {
    label: 'Price: Low to High',
    value: {
      key: 'price',
      direction: SortValues.Asc,
    },
  },
  {
    label: 'Price: High to Low',
    value: {
      key: 'price',
      direction: SortValues.Desc,
    },
  },
  {
    label: 'Auction ending soon',
    value: {
      key: 'some-key',
      direction: SortValues.Desc,
    },
  },
];

export const SortingGameItems = (props: IProps) => {
  const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
  const [isHide, setIsHide] = useState(false);
  const { children, onChange, isWide } = props;
  const { watch, control, setValue } = useForm<SortFormInputs>({
    defaultValues: {
      sort: undefined,
      view: 'normal-columns',
    },
  });
  const formInputs: SortFormInputs = watch();

  useEffect(() => {
    onChange(formInputs);
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    if (isTablet && !isWide) {
      setValue('view', 'normal-columns');
    }
  }, [isTablet, isWide]);

  useEffect(() => {
    setIsHide(isTablet && !isWide);
  }, [isTablet, isWide]);

  return (
    <SortingWrapper>
      {children}
      <ControlsWrapper>
        <ControlItemWrapper>
          <ControlledField control={control} name="sort">
            <Dropdown options={sortOptions} placeholder="Sort by" />
          </ControlledField>
        </ControlItemWrapper>
        <ControlItemWrapper isHide={isHide}>
          <ControlledField control={control} name="view">
            <GridView />
          </ControlledField>
        </ControlItemWrapper>
      </ControlsWrapper>
    </SortingWrapper>
  );
};
