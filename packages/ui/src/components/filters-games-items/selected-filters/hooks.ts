import { FilterBlock, IFilterFormInputs } from '../form/interfaces';

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
            case 'blockchain':
              if (filtersData?.blockchain?.items?.length) {
                targetSelectedFiler.label = filtersData?.blockchain?.items
                  .map((item: any) => item.title)
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            // case 'releaseYear':
            //   const releaseYearFilter = filtersData?.releaseYear;
            //   const [fromRY = null, toRY = null] = releaseYearFilter?.years || [];
            //   const fromLabelRY = ['', undefined, null].includes(fromRY) ? '' : ` from: ${fromRY}`;
            //   const toLabelRY = ['', undefined, null].includes(toRY) ? '' : ` to: ${toRY}`;
            //   targetSelectedFiler.label = `Years: ${fromLabelRY}${toLabelRY}`;

            //   if (targetSelectedFiler.label) {
            //     targetResult.push(targetSelectedFiler);
            //   }
            //   break;
            case 'playAndEarn':
              if (filtersData?.playAndEarn?.items?.length) {
                targetSelectedFiler.label = filtersData?.playAndEarn?.items
                  .map((item: any) => item.title)
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            case 'priceModel':
              if (filtersData?.priceModel?.items?.length) {
                targetSelectedFiler.label = filtersData?.priceModel?.items
                  .map((item: any) => item.title)
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            // case 'floorPrice':
            //   const floorPriceFilter = filtersData?.floorPrice;
            //   const currency = floorPriceFilter?.currency;
            //   const [fromFP = null, toFP = null] = floorPriceFilter?.price || [];
            //   const fromLabelFP = ['', undefined, null].includes(fromFP) ? '' : ` from: ${fromFP}`;
            //   const toLabelFP = ['', undefined, null].includes(toFP) ? '' : ` to: ${toFP}`;
            //   targetSelectedFiler.label = `${currency?.code}${fromLabelFP}${toLabelFP}`;

            //   if (targetSelectedFiler.label) {
            //     targetResult.push(targetSelectedFiler);
            //   }
            //   break;
            case 'friendInGame':
              if (filtersData?.friendInGame?.items?.length) {
                targetSelectedFiler.label = filtersData?.friendInGame?.items
                  .map((item: any) => item.title)
                  .join(', ');

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            case 'gameStatus':
              if (filtersData.gameStatus?.title) {
                targetSelectedFiler.label = filtersData?.gameStatus?.title;

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            case 'device':
              if (filtersData.device?.title) {
                targetSelectedFiler.label = filtersData?.device?.title;

                if (targetSelectedFiler.label) {
                  targetResult.push(targetSelectedFiler);
                }
              }
              break;
            default:
              break;
          }

          return targetResult;
        }, [])
    : [];
};
