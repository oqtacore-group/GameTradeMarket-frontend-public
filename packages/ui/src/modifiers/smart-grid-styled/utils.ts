import { IGridBreakPoints } from './interfaces';

export const defaultBreakPoints: IGridBreakPoints = {
  // 4 columns at a width of 320 and less
  '320px': {
    size: 320,
    gridTemplate: 4,
    offset: 20,
  },
  // 6 columns at a width of 530 and less
  '530px': {
    size: 530,
    gridTemplate: 6,
    offset: 20,
  },
  // 8 columns at a width of 950 and less
  '950px': {
    size: 950,
    gridTemplate: 8,
    offset: 20,
  },
  // 10 columns at a width of 1024 and less
  '1024px': {
    size: 1024,
    gridTemplate: 10,
    offset: 20,
  },
  // 12 columns at a width of 1280 and less
  '1280px': {
    size: 1280,
    gridTemplate: 12,
    offset: 12,
  },
};

export function filterComponentsByType(children: Array<any>, type: any) {
  const nullOrCorrectType = children.map((child: any) => {
    if (!child) {
      return null;
    }
    return child.type === type ? child : null;
  });

  return nullOrCorrectType.filter(Boolean);
}
