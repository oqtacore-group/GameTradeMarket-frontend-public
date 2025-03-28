import styled, { css } from 'styled-components';

import { Status } from './interfaces';
import { SIDE_VIEW_WIDTH, SIDE_VIEW_OPENER_WIDTH, ANIMATION_TIME } from './constants';
import { desktopAnimation, openerAnimation } from './animations';
import { COLORS } from '../../styles';

interface IOpenableProps {
  status: Status;
}

export const FiltersOuterContent = styled.div`
  display: flex;
  flex-direction: row;
  width: ${SIDE_VIEW_WIDTH}px;
  min-width: ${SIDE_VIEW_WIDTH}px;
  height: 100%;

  @media (max-width: 576px) {
    width: 100%;
    min-width: 100%;
    height: auto;
  }
`;

export const FiltersWrapper = styled.div<IOpenableProps>`
  position: relative;
  overflow-x: hidden;
  display: flex;
  flex-direction: row;
  width: ${({ status }) => (status === 'close' ? SIDE_VIEW_OPENER_WIDTH : SIDE_VIEW_WIDTH)}px;
  min-width: ${({ status }) => (status === 'close' ? SIDE_VIEW_OPENER_WIDTH : SIDE_VIEW_WIDTH)}px;
  transition: all ${ANIMATION_TIME * 0.9}ms linear;
  min-height: 100%;
  border-top: 1px solid ${COLORS.black};
  border-right: 1px solid ${COLORS.black};
  border-bottom: 1px solid ${COLORS.black};
  background: ${COLORS.blue90};

  @media (max-width: 576px) {
    border-right: unset;
    width: 100%;
    min-width: 100%;
    height: auto;
  }
`;

const getDesktopAnimation = (props: IOpenableProps) => {
  const { status } = props;
  const animation = desktopAnimation[status];

  return animation
    ? css`
        ${animation} ${ANIMATION_TIME}ms linear forwards
      `
    : 'unset';
};

const getOpenerAnimation = (props: IOpenableProps) => {
  const { status } = props;
  const animation = openerAnimation[status];

  return animation
    ? css`
        ${animation} ${ANIMATION_TIME}ms linear forwards
      `
    : 'unset';
};

export const FiltersContent = styled.div<IOpenableProps>`
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  width: ${SIDE_VIEW_WIDTH}px;
  height: 100%;
  animation: ${getDesktopAnimation};

  @media (max-width: 576px) {
    position: relative;
    width: 100%;
    height: auto;
    animation: unset;
  }
`;

export const Opener = styled.div<IOpenableProps>`
  position: absolute;
  left: 0;
  opacity: 0;
  z-index: -1;
  display: flex;
  flex-direction: row;
  width: ${SIDE_VIEW_OPENER_WIDTH}px;
  height: 100%;
  animation: ${getOpenerAnimation};
  padding-top: 40px;

  svg {
    fill: ${COLORS.blue};
    transform: rotate(180deg);
  }

  @media (max-width: 576px) {
    z-index: 1;
    padding-top: unset;
    width: 100%;
    height: 100%;
  }
`;

export const FiltersHeader = styled.div`
  width: 100%;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding: 40px 30px 10px 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    fill: ${COLORS.blue};
  }

  @media (max-width: 576px) {
    padding: 20px 40px 20px;
    justify-content: center;
  }
`;
