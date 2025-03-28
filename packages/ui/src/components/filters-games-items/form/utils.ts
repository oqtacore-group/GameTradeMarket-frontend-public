import { IFilterFormInputs } from './interfaces';

export const prepareOutputData = (filtersFields: IFilterFormInputs): IFilterFormInputs => {
  const preparedFiltersInput = { ...filtersFields } as any;

  // remove keys with empty values
  return Object.keys(filtersFields).reduce((resultFilter: any, filterKey: any) => {
    const filterValue = preparedFiltersInput[filterKey];
    const filterValueExists = ![null, undefined].includes(filterValue);

    if (filterValueExists) {
      resultFilter[filterKey] = filterValue;
    }

    return resultFilter;
  }, {});
};
