export enum ALIGN {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum SIZE {
  BASE = 'base',
  MINI = 'mini',
  BIG = 'big',
  MICRO = 'micro',
}

export interface IProps {
  position?: ALIGN; // extended
  size?: SIZE; // extended
}
