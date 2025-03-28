export interface IPaginationProps {
  isHideMore: boolean;
  setItemsPerPage: (value: number) => void;
  setItemOffset: (value: number) => void;
  setForcePage: (value: number) => void;
  itemsPerPage: number;
  forcePage: number;
  itemsLength?: number;
}
