import { FilterBlock, IFilterFormInputs } from '../form/interfaces';
import { IFacetCheckboxGroupItem, IFacetRangeItem } from '../form/blocks/facets';

import { ISelectedFilterItem } from './interfaces';

export const useSelectedFilters = (
  filtersBlocks: FilterBlock[],
  filtersData: IFilterFormInputs | null
): ISelectedFilterItem[] => {
  return filtersData
    ? filtersBlocks
        .filter((filterBlock: FilterBlock) => Object.keys(filtersData).includes(filterBlock))
        .reduce((result: any[], filterKey: FilterBlock) => {
          const targetResult = [...result];
          const targetSelectedFiler: ISelectedFilterItem = {
            filterBlockName: filterKey,
            label: '',
            canReset: true,
          };

          switch (filterKey) {
            case 'game':
              targetSelectedFiler.label = filtersData.game?.name || filtersData.game?.code;
              targetSelectedFiler.canReset = false;

              if (targetSelectedFiler.label) {
                targetResult.push(targetSelectedFiler);
              }
              break;
            case 'saleType':
              if (filtersData.saleType?.items?.length) {
                targetSelectedFiler.label = filtersData?.saleType?.items
                  .map((item: any) => item.title)
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            case 'gameBlockchains':
              if (filtersData.gameBlockchains?.items?.length) {
                targetSelectedFiler.label = filtersData?.gameBlockchains?.items
                  .map((item: any) => item?.title?.toUpperCase())
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            case 'priceRange':
              const priceRangeFilter = filtersData?.priceRange;
              const [from = null, to = null] = priceRangeFilter?.price || [];
              const fromLabel = ['', undefined, null].includes(from) ? '' : ` from: ${from}`;
              const toLabel = ['', undefined, null].includes(to) ? '' : ` to: ${to}`;
              targetSelectedFiler.label = `${fromLabel}${toLabel}`;

              if (targetSelectedFiler.label) {
                targetResult.push(targetSelectedFiler);
              }
              break;
            case 'facets':
              const facetsFilter =
                filtersData?.facets || ([] as Array<IFacetCheckboxGroupItem | IFacetRangeItem>);
              targetSelectedFiler.label = facetsFilter
                .map(({ key, min, max, values, type }: IFacetCheckboxGroupItem | IFacetRangeItem) =>
                  type === 'LEVEL'
                    ? `${(min || min === 0) && max ? `${key}: ${min} - ${max}` : ''}`
                    : values.length
                    ? key
                    : ''
                )
                .filter((item: any) => Boolean(item))
                .join(', ');

              if (targetSelectedFiler.label) {
                targetResult.push(targetSelectedFiler);
              }
              break;
            default:
              break;
          }

          return targetResult;
        }, [])
    : [];
};
