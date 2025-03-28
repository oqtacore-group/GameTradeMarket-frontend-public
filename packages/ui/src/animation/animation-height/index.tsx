import React, { useRef, useState, ReactNode, useLayoutEffect, useEffect } from 'react';

import { AnimationHeightWrapper } from './style';
import { useMediaQuery } from 'react-responsive';

interface IProps {
  isOpen: boolean;
  children: ReactNode;
  time?: number;
  disabled?: boolean;
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function AnimationHeight(props: IProps) {
  const { isOpen, children, time = 500, disabled = false } = props;
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });
  const [targetElement, targetRefCallback] = useState<HTMLDivElement | null>(null);
  const [currentHeight, setCurrentHeight] = useState<number | null>(null);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(!isMobile);
  const timerTransitionEndRef = useRef<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (targetElement) {
      if (isOpen && !initialized) {
        setInitialized(true);
      }
    }
  }, [targetElement, isOpen]);
  useIsomorphicLayoutEffect(() => {
    if (targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setFullHeight(height);
    }
  }, [targetElement]);
  useIsomorphicLayoutEffect(() => {
    if (!isOpen && currentHeight === null && targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setCurrentHeight(height);
    }
  }, [targetElement]);

  // closing
  // (animation) setting zero height
  useIsomorphicLayoutEffect(() => {
    let timerId: any;
    if (!disabled && !isOpen && currentHeight) {
      timerId = setTimeout(() => setCurrentHeight(0), 0);
    }

    return () => window?.clearTimeout(timerId);
  }, [disabled, isOpen, currentHeight]);
  // closing
  // (preparation) setting fixed height
  useIsomorphicLayoutEffect(() => {
    if (!disabled && !isOpen && currentHeight === null && targetElement) {
      const { height } = targetElement.getBoundingClientRect();
      setFullHeight(height);
      setCurrentHeight(height);
    }
  }, [disabled, isOpen]);

  // opening
  // setting fixed height
  useIsomorphicLayoutEffect(() => {
    if (!disabled && isOpen && currentHeight !== null && targetElement) {
      setCurrentHeight(fullHeight);
    }
  }, [disabled, isOpen]);

  useEffect(() => {
    if (timerTransitionEndRef.current !== null) {
      window.clearTimeout(timerTransitionEndRef.current);
      timerTransitionEndRef.current = null;
    }

    const transitionStartHandler = (e: any) => {
      if (isOpen && e.target === targetElement) {
        timerTransitionEndRef.current = window.setTimeout(() => setCurrentHeight(null), time);
      }
    };

    const transitionEndHandler = (e: any) => {
      if (isOpen && e.target === targetElement) {
        if (timerTransitionEndRef.current !== null) {
          window.clearTimeout(timerTransitionEndRef.current);
          timerTransitionEndRef.current = null;
        }
        setCurrentHeight(null);
      } else if (!isOpen && e.target === targetElement && !initialized) {
        setInitialized(true);
      }
    };

    if (targetElement) {
      targetElement.addEventListener('transitionstart', transitionStartHandler);
      targetElement.addEventListener('transitionend', transitionEndHandler);
    }

    return () => {
      if (targetElement) {
        targetElement.removeEventListener('transitionstart', transitionStartHandler);
        targetElement.removeEventListener('transitionend', transitionEndHandler);
      }
    };
  }, [targetElement, isOpen, initialized, time]);

  return (
    <AnimationHeightWrapper
      data-open={isOpen}
      ref={targetRefCallback}
      height={currentHeight}
      initialized={initialized}
      time={time}>
      {children}
    </AnimationHeightWrapper>
  );
}
