import styled, { css } from 'styled-components';

import { COLORS, FONTS } from '../../styles';

import { ButtonProps } from './interfaces';
import { Dimension } from './utils';
import { dimensionMixin } from './dimensionMixin';

export const StyledButton = styled.button.attrs<
  ButtonProps,
  { 'data-dimension'?: Dimension; 'data-appearance'?: string }
>((props) => ({
  'data-dimension': props.dimension,
  'data-appearance': [props.appearance, props.displayAsDisabled ? 'disabled' : undefined]
    .filter((val) => val !== undefined)
    .join(' '),
}))<ButtonProps>`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  padding: 0;
  border: none;
  appearance: none;
  vertical-align: center;
  width: 100%;
  ${dimensionMixin};
  color: ${COLORS.white};

  &:hover {
    cursor: pointer;
    &:after {
      visibility: visible;
      top: 10px;
      left: 10px;
      transition: 0.5s;
    }
  }

  ${({ appearance }) =>
    appearance === 'secondary' &&
    css`
      border: 2px solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(to top left, ${COLORS.blue}, ${COLORS.pink});

      background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
      background-size: 100% auto;
      -webkit-background-clip: text;
    `};

  ${({ appearance }) =>
    appearance === 'ghost' &&
    css`
      border: 0;
      border-image-slice: 0;
      background: none;
    `};

  ${({ appearance }) =>
    appearance === 'primary' &&
    css`
      background-repeat: no-repeat;
      background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(
          to top left,
          rgba(0, 0, 0, 0) calc(50% - 1px),
          rgba(0, 0, 0, 0) calc(50% - 1px),
          ${COLORS.pink} calc(50% - 1px),
          ${COLORS.pink} calc(50% + 0.5px),
          ${COLORS.pink} calc(25% + 1px)
        ),
        linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(${COLORS.pink}, ${COLORS.pink});
      background-size: 1px 100%, 1px 55%, 100% 1px, calc(100% - 10px) 1px, 11px 10px, 100% 100%,
        100% 100%;
      background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -10px 0, 0% -10px;
      z-index: 2;
      transition: 0.5ms;
    `};

  ${({ isShadow }) =>
    isShadow &&
    css`
      &:after {
        content: '';
        visibility: hidden;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;

        ${dimensionMixin};

        background-repeat: no-repeat;
        background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(
            to top left,
            rgba(0, 0, 0, 0) calc(50% - 1px),
            rgba(0, 0, 0, 0) calc(50% - 1px),
            ${COLORS.pink} calc(50% - 1px),
            ${COLORS.pink} calc(50% + 0.5px),
            transparent calc(25% + 1px)
          ),
          linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
        background-size: 1px 100%, 1px calc(100% - 18px), 100% 1px, calc(100% - 18px) 1px, 18px 18px,
          100% 100%, 100% 100%;
        background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -2rem 0, 0% -1.7rem;
        transition: 0.5s;
        z-index: -1;
      }
    `};

  &:disabled {
    cursor: not-allowed;
    background-repeat: no-repeat !important;
    background-image: linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}),
      linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}),
      linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}),
      linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        ${COLORS.neutral55} calc(50% - 1px),
        ${COLORS.neutral55} calc(50% + 0.5px),
        ${COLORS.neutral55} calc(25% + 1px)
      ),
      linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}),
      linear-gradient(${COLORS.neutral55}, ${COLORS.neutral55}) !important;
    background-size: 1px 100%, 1px 55%, 100% 1px, calc(100% - 2rem) 1px, 2rem 1.8rem, 100% 100%,
      100% 100% !important;
    background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -2rem 0, 0% -1.7rem !important;
    z-index: 2;
    transition: 0.5ms;
    border-image-source: none;
  }
`;

export const ButtonContent = styled.span<{ dimension?: Dimension; isGradientText?: boolean }>`
  position: relative;
  vertical-align: top;
  display: inline-flex;
  flex-direction: row;
  overflow: hidden;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-items: center;
  user-select: none;
  ${FONTS.chakra}
  font-style: normal;
  font-weight: bold;
  z-index: 1;

  ${({ isGradientText }) =>
    isGradientText &&
    css`
      /*background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
      background-size: 100% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;*/
    `}

  > * {
    display: inline-block;
    flex: 0 1 auto;
    white-space: nowrap;
  }

  > *:not(:first-child) {
    margin-left: 8px;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }

  [data-dimension='s'] & {
    height: 20px;

    & > svg {
      width: 16px;
      height: 16px;
    }
  }
`;
