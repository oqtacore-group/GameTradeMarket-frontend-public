import { FindWrapper } from './style';

interface IProps {
  children: any;
}

export const FindUsers = (props: IProps) => {
  const { children } = props;

  return <FindWrapper>{children}</FindWrapper>;
};
