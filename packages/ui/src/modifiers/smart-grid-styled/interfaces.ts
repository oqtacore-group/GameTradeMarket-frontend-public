export interface IGridProps {
  sizeColumns: TGridSize[];
  gap?: number; // in pixels - distance between adjacent columns
  verticalGap?: number; // in pixels - distance between adjacent rows
  breakPoints?: IGridBreakPoints; // location of columns on different mediaQuery (by default ./utils defaultBreakPoints)
  staticSize?: TGridSize; // if set, the grid will NOT be resized according to mediaQuery
  alignItems?: 'start' | 'end'; // default start
  size?: TGridSize; // width inside the grid in columns by default 12 (100%)
}

export interface IGridColumnProps extends IAlign {
  size?: TGridSize; // width inside the grid in columns by default 12 (100%)
  index?: number; // order number of the column (automatically inserted)
  direction?: string;
}

export interface IAlign {
  justifyContent?: string;
  alignItems?: string;
}

export type TGridSize = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;
export type IGridBreakPoints = {
  [key: string]: {
    size: number;
    gridTemplate: TGridSize;
    offset: number;
  }; // 10: 1024 (10 columns at a resolution of 1024px)
};
