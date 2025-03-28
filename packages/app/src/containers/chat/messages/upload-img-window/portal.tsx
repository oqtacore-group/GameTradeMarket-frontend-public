import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: any;
  open: boolean;
}

const isBrowser = typeof window !== 'undefined';

export const Portal = (props: IProps) => {
  if (!isBrowser) return null;
  const target = useRef(document.createElement('div'));
  useEffect(() => {
    if (target) {
      target.current.classList.add('portal-component-wrapper');
      document.body.append(target.current);
    }
    return () => {
      target.current.remove();
    };
  }, [isBrowser, target]);
  if (isBrowser && target && props.open) return createPortal(props.children, target.current);
  return null;
};
