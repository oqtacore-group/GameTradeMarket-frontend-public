import { keyframes } from 'styled-components';

import { SIDE_VIEW_OPENER_WIDTH, SIDE_VIEW_WIDTH } from './constants';

const openDesktopAnimation = keyframes`
  0% {
    left: ${SIDE_VIEW_OPENER_WIDTH - SIDE_VIEW_WIDTH}px;
    opacity: 0;
  }

  10% {
    left: ${SIDE_VIEW_OPENER_WIDTH - SIDE_VIEW_WIDTH}px;
    opacity: 1;
  }

  100% {
    left:0;
    opacity: 1;
  }
`;

const closeDesktopAnimation = keyframes`
  0% {
    left: 0;
    opacity: 1;
  }

  90% {
    left: ${SIDE_VIEW_OPENER_WIDTH - SIDE_VIEW_WIDTH}px;
    opacity: 1;
  }

  100% {
    left: ${SIDE_VIEW_OPENER_WIDTH - SIDE_VIEW_WIDTH}px;
    opacity: 0;
  }
`;

export const desktopAnimation: any = {
  open: openDesktopAnimation,
  close: closeDesktopAnimation,
};

const openMobileAnimation = keyframes`
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    opacity: 1;
  }
`;

const closeMobileAnimation = keyframes`
  0% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

export const mobileAnimation: any = {
  open: openMobileAnimation,
  close: closeMobileAnimation,
};

const openOpenerAnimation = keyframes`
  0% {
    z-index: 1;
    opacity: 1;
  }

  10% {
    z-index: -1;
    opacity: 0;
  }

  100% {
    z-index: -1;
    opacity: 0;
  }
`;

const closeOpenerAnimation = keyframes`
  0% {
    z-index: -1;
    opacity: 0;
  }

  90% {
    z-index: -1;
    opacity: 0;
  }

  100% {
    z-index: 1;
    opacity: 1;
  }
`;

export const openerAnimation: any = {
  open: openOpenerAnimation,
  close: closeOpenerAnimation,
};
