import { CSSObject } from 'styled-components';
import { ReactNode, SyntheticEvent } from 'react';

export interface ICommonProps {
  children: ReactNode;
  state: boolean;
  transitionEndStyle?: CSSObject;
  onTransitionEnd?(event: SyntheticEvent, state: boolean): void;
  isStopPropagation?: boolean;
  className?: string;
  duration?: number;
  durationStart?: number; // will be removed in the useCommonAnimationProps hook, transformed to duration in phase state = true
  durationEnd?: number; // will be removed in the useCommonAnimationProps hook, transformed to duration in phase state = false
  delay?: number;
  delayStart?: number; // will be removed in the useCommonAnimationProps hook, transformed to delay in phase state = true
  delayEnd?: number; // will be removed in the useCommonAnimationProps hook, transformed to delay in phase state = false
  animateFunction?: string;
  repeat?: boolean; // will be removed in the useCommonAnimationProps hook
  isStartOnMount?: boolean; // will be removed in the useCommonAnimationProps hook
}

// props after transformation through the useCommonAnimationProps hook
export interface ICommonAnimationProps extends ICommonProps {
  onTransitionEnd(): void;
}

export interface IProps extends ICommonProps {
  opacityStart?: number;
  opacityEnd?: number;
}
