import React, { ReactNode, useRef, RefObject, useEffect, useState } from 'react';

import { Block } from './style';

interface IProps {
  children: ReactNode;
  maxHeight?: string;
  disableBlur?: boolean;
  element?: HTMLElement | null;
  className?: string;
}

export const ScrollableBox = React.forwardRef((props: IProps, ref: any) => {
  const { children, element, maxHeight, disableBlur, className } = props;
  const [hasScroll, setHasScroll] = useState(false);
  const wrapperRef: RefObject<HTMLDivElement> = ref || useRef(null);

  useEffect(() => {
    const targetElement = element || wrapperRef?.current;
    if (targetElement && targetElement?.scrollHeight > targetElement?.clientHeight) {
      setHasScroll(true);
    } else {
      setHasScroll(false);
    }
  });

  return (
    <Block
      ref={wrapperRef}
      hasScroll={hasScroll}
      disableBlur={disableBlur}
      maxHeight={maxHeight}
      className={className}>
      {children}
    </Block>
  );
});
