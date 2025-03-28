import { SvgIconRefresh } from '@game-trade/icons';
import { COLORS } from '@game-trade/ui';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useTranslation } from 'next-i18next';

const rotating = keyframes`
  from {
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
  to {
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
`;

export const RefreshText = styled.div`
  width: 100%;
  opacity: 0;
  left: 200%;
  position: absolute;
  color: white;
  transition: all 45ms linear;
`;

export const Refresh = styled.div<{ animation: boolean }>`
  color: ${COLORS.blue};
  width: 7%;
  cursor: pointer;
  text-decoration: initial;
  display: flex;
  justify-content: space-between;
  position: absolute;
  right: 0;
  background: ${COLORS.blue};
  padding: 10px;
  border-radius: 18px 0 0 18px;
  transition: all 45ms linear;
  overflow: hidden;

  svg {
    ${({ animation }) =>
      animation &&
      css`
        animation: ${rotating} 2s linear infinite;
      `}
  }

  &:hover {
    transition-delay: 1s;
    width: 18%;

    ${RefreshText} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 100%;
      left: -9px;
      top: 0;
      text-align: right;
      opacity: 1;
      transition-delay: 1s;
    }
  }
`;

export const RefreshInButton = styled.div<{ animation: boolean }>`
  svg {
    ${({ animation }) =>
      animation &&
      css`
        animation: ${rotating} 2s linear infinite;
      `}
  }
`;

interface IProps {
  refreshItem(): void;
  animationRefresh: boolean;
}

export const ButtonRefresh = ({ refreshItem, animationRefresh: _ANIMATION_REFRESH }: IProps) => {
  const { t } = useTranslation('tokenCardIdPage', { keyPrefix: 'translation' });
  return (
    <Refresh onClick={refreshItem} animation={_ANIMATION_REFRESH}>
      <SvgIconRefresh size={22} color={COLORS.white} />
      <RefreshText>{t('description.refreshData')}</RefreshText>
    </Refresh>
  );
};
