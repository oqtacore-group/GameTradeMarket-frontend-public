import React, { ReactNode } from 'react';

export interface IProps extends Partial<IPropsModal> {
  onClose(event: React.MouseEvent<HTMLDivElement>): void;
  isCloseOutside?: boolean;
  dataTestId?: string;
  isHideModalCss?: boolean;
  [key: string]: any;
}

export interface IPadding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export type ModalSize = 300 | 455 | 560 | 752 | 816 | 870 | 960 | 688 | 882;

export interface IPropsModal {
  onClose(event?: React.MouseEvent<HTMLDivElement>): void;
  // if we know in advance that the window is tall, there will be scroll
  // reset centering
  isCenter?: boolean;
  isCloseOutside?: boolean;
  isPadding?: boolean;
  padding?: IPadding;
  dataTestId?: string;
  hasHeader?: boolean;
  hasCloseButton?: boolean;
  children?: ReactNode;
  title?: string;
  className?: string;
  size?: ModalSize;
  zIndex?: number;
  isHideModalCss?: boolean;
}

export interface IState {
  padding: IPadding;
}
