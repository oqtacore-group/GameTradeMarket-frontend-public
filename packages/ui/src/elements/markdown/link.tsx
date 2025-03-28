import { Link } from './style';

export const MDLink = (props: any) => {
  return (
    <Link target={'_blank'} href={props.href}>
      {props.children}
    </Link>
  );
};
