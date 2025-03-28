import React, { useState, useCallback, useEffect } from 'react';
import { SvgEye, SvgEyeClose } from '@game-trade/icons';

import { IInputProps, IShared } from './interfaces';
import {
  InputWrapper,
  Placeholder,
  Error,
  Field,
  StyledInput,
  InputComponent,
  IconWrapper,
  EyeIconWrapper,
  IconsBox,
  Title,
  FieldContent,
} from './style';

export type { IInputProps };

export const Input = React.forwardRef((props: IInputProps, ref: any) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.value || '');

  useEffect(() => {
    if (props.value !== value) {
      setValue(props.value || '');
    }
  }, [props.value]);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { id, onChange } = props;
      const { value } = event.target;
      onChange && onChange(event, value, id);
      setValue(value);
    },
    [props.onChange, props.id]
  );

  const onFocus = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { onFocus } = props;
    onFocus && onFocus(event);
    setFocused(true);
  }, []);

  const onBlur = useCallback((event: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = props;
    const { value } = event.target;
    onBlur && onBlur(event, value);
    setFocused(false);
  }, []);

  const onKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyPress } = props;
    onKeyPress && onKeyPress(event);
  }, []);

  const onKeyUp = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onKeyUp } = props;
    onKeyUp && onKeyUp(event);
  }, []);

  const onInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInput, id } = props;
    const { value } = event.target;
    onInput && onInput(event, value, id);
    setValue(value);
  }, []);

  const onPasswordToggle = useCallback(() => {
    setPasswordVisible(!passwordVisible);
  }, [passwordVisible]);

  const renderIcon = () => {
    const { type, dimension } = props;

    return (
      <>
        {type === 'password' && (
          <EyeIconWrapper dimension={dimension}>
            {passwordVisible ? (
              <SvgEyeClose // todo need an eye icon for input-password
                data-element="input-hidePasswordIcon"
                size={20}
                onClick={onPasswordToggle}
              />
            ) : (
              <SvgEye // todo need an eye icon for input-password
                data-element="input-showPasswordIcon"
                size={20}
                onClick={onPasswordToggle}
              />
            )}
          </EyeIconWrapper>
        )}
      </>
    );
  };

  const {
    id,
    autoFocus,
    error,
    name,
    type,
    color,
    disabled,
    placeholder,
    dimension,
    maxLength,
    prevIcon,
    postIcon,
    title,
    onKeyDown,
    alignText,
    autoFill,
    className,
    inputMode,
    width,
    autocomplete,
    rules,
  } = props;

  const sharedProps: IShared = {
    id,
    maxLength,
    name,
    rules,
    autoFocus,
    value,
    color,
    inputMode,
    onChange: onInputChange,
    onKeyPress: onKeyPress,
    onKeyUp: onKeyUp,
    onFocus: onFocus,
    onBlur: onBlur,
    onInput: onInput,
    onKeyDown,
  };
  disabled && (sharedProps.disabled = disabled);

  return (
    <InputWrapper
      disabled={disabled}
      dimension={dimension}
      alignText={alignText}
      className={className}
      color={color}
      width={width}>
      {title && <Title data-element="input-title">{title}</Title>}
      <InputComponent
        dimension={dimension}
        error={error}
        focused={focused && !error}
        disabled={disabled}>
        <Field data-element="input-field">
          <IconsBox isHighlightIcon={props.isHighlightIcon} dimension={dimension} position="left">
            {prevIcon && (
              <IconWrapper isHighlightIcon={props.isHighlightIcon} position="left">
                {prevIcon}
              </IconWrapper>
            )}
          </IconsBox>
          <FieldContent>
            <StyledInput
              ref={ref}
              data-element="input"
              disabled={!!disabled}
              {...sharedProps}
              autoComplete={
                autocomplete || (type === 'password' || !autoFill ? 'new-password' : 'on')
              }
              type={type === 'password' && passwordVisible ? 'text' : type}
            />
            {placeholder && (
              <Placeholder
                data-element="input-placeholder"
                error={error}
                dimension={dimension}
                focused={focused}
                isHasValue={!!value}>
                {placeholder}
              </Placeholder>
            )}
          </FieldContent>
          <IconsBox isHighlightIcon={props.isHighlightIcon} dimension={dimension} position="right">
            {postIcon && (
              <IconWrapper isHighlightIcon={props.isHighlightIcon} position="left">
                {postIcon}
              </IconWrapper>
            )}
            {renderIcon()}
          </IconsBox>
        </Field>
      </InputComponent>
      {typeof error === 'string' && !!error.trim() && (
        <Error data-element="input-error">{error}</Error>
      )}
    </InputWrapper>
  );
});

Input.defaultProps = {
  error: false,
  type: 'text',
  dimension: 'large',
  disabled: false,
  alignText: 'left',
  autoFill: true,
};
