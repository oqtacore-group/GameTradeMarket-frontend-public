import { ReactElement } from 'react';

export interface IProps {
  offsetStep: number;
  total: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onClickButton?: () => void;
  buttonTitle?: string;
  showButton?: boolean;
  isHideArrow?: boolean;
  isLoading?: boolean;
  buttonMoreRender?: () => ReactElement;
}
