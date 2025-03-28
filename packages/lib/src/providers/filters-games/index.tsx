import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IFilterFormInputs } from '@game-trade/ui/components/filters-games-items';
import { FilterBlock } from '@game-trade/ui/components/filters-games-items/form';
import { usePrevious } from './hooks';
import { prepareOutputData } from '@game-trade/ui/components/filters-games-items/form/utils';
import { FiltersContext } from '@game-trade/ui/components/filters-games-items/form/context';

interface IProviderProps {
  children: any;
}

export const FiltersProvider = (props: IProviderProps) => {
  const __methods__ = useForm<IFilterFormInputs>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });
  const { reset, getValues, watch } = __methods__;
  const formInputs: IFilterFormInputs = watch();
  const [filtersData, setFiltersData] = useState<any>(getValues());
  const [filtersBlocks, __setFiltersBlocks] = useState<FilterBlock[]>([]);
  const prevFiltersData = usePrevious(filtersData);

  useEffect(() => {
    const filtersData = prepareOutputData(formInputs);
    if (JSON.stringify(prevFiltersData) !== JSON.stringify(filtersData)) {
      setFiltersData(filtersData);
    }
  }, [JSON.stringify(formInputs)]);

  const resetFilter = (filterBlockName?: FilterBlock) => {
    if (filterBlockName) {
      reset({
        ...getValues(),
        [filterBlockName]: undefined,
      });
    } else {
      reset({});
    }
  };

  return (
    <FiltersContext.Provider
      value={{ __methods__, filtersData, resetFilter, filtersBlocks, __setFiltersBlocks }}>
      {props.children}
    </FiltersContext.Provider>
  );
};
