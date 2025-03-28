import styled, { css } from 'styled-components';
import { rgba } from 'polished';

import { FONTS, COLORS } from '../../styles';

import { IDimension, IWrapper, IStylePropsError, IPlaceholder, IIconProps } from './interfaces';

const dimensionHeight = {
  small: css`
    height: 32px;
  `,

  large: css`
    height: 40px;
  `,

  free: css`
    height: 100%;
  `,
};

const dimensionStyle = {
  small: css`
    padding: 0 12px 0 12px;
    font-size: 14px;
    line-height: 18px;
  `,

  large: css`
    padding: 0 16px 0 14px;
  `,

  free: css`
    padding: 0 16px 0 14px;
  `,
};

const placeholderDimensionStyle = {
  small: (focused: boolean, isHasValue: boolean) => css`
    padding: 6px 20px 6px 12px;
    height: 100%;
    font-size: 14px;
    display: ${focused || isHasValue ? 'none' : 'flex'};
  `,

  large: (focused: boolean, isHasValue: boolean) => css`
    padding: 10px 20px 10px 12px;
    height: 100%;
    font-size: 16px;
    display: ${focused || isHasValue ? 'none' : 'flex'};
  `,

  free: (focused: boolean, isHasValue: boolean) => css`
    padding: 10px 20px 10px 12px;
    height: 100%;
    font-size: 16px;
    display: ${focused || isHasValue ? 'none' : 'flex'};
  `,
};

export const InputWrapper = styled.div<IWrapper>`
  ${FONTS.chakra};
  width: ${({ width }) => width || '100%'};
  position: relative;
  ${({ dimension }) => dimension && dimensionHeight[dimension]};

  input {
    ${FONTS.chakra};
    text-align: ${({ alignText }) => alignText};
    line-height: 20px;
    font-size: 16px;
    color: ${({ color }) => color || COLORS.gray};
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    resize: none;

    &::-ms-clear {
      display: none;
    }
    &::-ms-reveal {
      display: none;
    }

    &:-webkit-autofill,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:hover {
      color: ${({ color }) => color || COLORS.gray} !important;
      -webkit-text-fill-color: ${({ color }) => color || COLORS.gray} !important;
      box-shadow: 0 0 0 1000px #1e1524 inset;
      background-color: transparent !important;
      background-image: none !important;
    }

    ${({ dimension }) => dimension && dimensionStyle[dimension]};
    overflow: hidden;
    text-overflow: ellipsis;
  }

  input[type='number'] {
    appearance: auto;

    /* Webkit browsers like Safari and Chrome */
    &::-webkit-outer-spin-button {
      appearance: none;
      margin: 0;
    }
  }
`;

const getPlaceholderColor = (isHasValue: boolean, focused?: boolean, error?: string | boolean) => {
  if (focused && error) {
    return COLORS.red60;
  }
  if (!focused && error && isHasValue) {
    return COLORS.red60;
  }
  if (focused && !error) {
    return COLORS.azure;
  }
  return COLORS.gray;
};

export const Placeholder = styled.div<IPlaceholder>`
  ${({ dimension, focused, isHasValue }: IPlaceholder) =>
    dimension && placeholderDimensionStyle[dimension](focused, isHasValue)};
  position: absolute;
  align-items: center;
  color: ${({ focused, error, isHasValue }: IPlaceholder) =>
    getPlaceholderColor(isHasValue, focused, error)};
  background-color: ${({ focused, isHasValue }: IPlaceholder) =>
    focused || isHasValue ? COLORS.white : 'inherit'};
  top: 0;
  left: 0;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 10px);
  transition: all 0.2s;
  pointer-events: none;
`;

export const Error = styled.div<IDimension>`
  display: flex;
  align-items: center;
  margin-top: 4px;
  height: auto;
  font-size: 12px;
  line-height: 16px;
  color: ${COLORS.red60};
`;

export const Field = styled.div`
  display: flex;
  height: 100%;
`;

export const InputComponent = styled.div<IStylePropsError>`
  ${({ disabled }: IStylePropsError) => css`
    background-color: ${disabled ? COLORS.neutral40 : COLORS.white};
    border: 1px solid ${COLORS.gray};
  `}
  width: 100%;
  height: ${({ dimension }) =>
    dimension === 'small' ? '32px' : dimension === 'free' ? '100%' : '42px'};
  box-sizing: border-box;
  position: relative;
  font-weight: normal;

  background: rgba(15, 9, 18, 0.2);
  border: 1px solid;
  border-color: ${({ focused }) => (focused ? rgba(COLORS.pink, 0.7) : rgba(COLORS.gray, 0.3))};
  padding: 11px;
  color: ${COLORS.gray};

  :hover,
  :focus {
    outline: none;
  }

  ${({ error }: IStylePropsError) => {
    if (error) {
      return `border-color: ${COLORS.red60};`;
    }
    return '';
  }}
`;

export const IconWrapper = styled.div<IIconProps>`
  padding-top: 2px;
  :first-child {
    margin-left: ${({ position }) => (position === 'left' ? '0' : '8px')};
  }
`;

export const EyeIconWrapper = styled(IconWrapper)<IDimension>`
  cursor: pointer;
  :hover {
    svg {
      opacity: 0.5;
    }
  }
`;

export const IconsBox = styled.div<IIconProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  > div:last-child {
    display: inline-flex;

    ${({ position, dimension }) =>
      position === 'left'
        ? `padding-left: ${dimension === 'small' ? '10px' : '14px'};`
        : `margin-right: ${dimension === 'small' ? '10px' : '14px'};`}

    &::after {
      content: '';
      height: 100%;
    }
  }
`;

export const Title = styled.div<Partial<IDimension>>`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  height: auto;
  font-size: 14px;
  line-height: 20px;
  color: ${COLORS.gray};
`;

export const FieldContent = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;
`;

export const StyledInput = styled.input<{ disabled: boolean }>`
  height: 100%;
  box-sizing: border-box;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'cursor')};
`;
