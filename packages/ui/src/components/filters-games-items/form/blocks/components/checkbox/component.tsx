import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IProps } from './interfaces';
import { ComponentWrapper, CheckboxWrapperStyled, Label } from './style';
import { useCheckboxGroupContext } from './group';

export const Checkbox = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    disabled = false,
    value: singleValue = false,
    grouped = false,
    valueKey,
    ...inputProps
  } = props;
  const [uniqName] = useState(uuidv4());
  const { onChange: contextOnChange, value: contextValue = [] } = useCheckboxGroupContext();
  // console.log('contextValue', contextValue, singleValue);
  const checked = grouped
    ? contextValue?.some((item: any) => {
        const preparedSingleValue = valueKey ? singleValue[valueKey] : singleValue;
        const preparedItemValue = valueKey ? item[valueKey] : item;

        return preparedSingleValue === preparedItemValue;
      })
    : singleValue;

  const changeHandler = () => {
    if (!disabled) {
      if (grouped && contextOnChange) {
        const preparedContextValue = Array.isArray(contextValue) ? contextValue : [];
        const updateContextValue = checked
          ? preparedContextValue.filter((item: any) => {
              const preparedSingleValue = valueKey ? singleValue[valueKey] : singleValue;
              const preparedItemValue = valueKey ? item[valueKey] : item;

              return preparedSingleValue !== preparedItemValue;
            })
          : [...preparedContextValue];

        if (!checked) {
          updateContextValue.push(singleValue);
        }

        contextOnChange(updateContextValue);
      } else {
        inputProps.onChange(!singleValue);
      }
    }
  };

  return (
    <ComponentWrapper disabled={disabled}>
      <CheckboxWrapperStyled disabled={disabled}>
        <input
          id={`checkbox-name-${uniqName}`}
          ref={ref}
          type="checkbox"
          {...inputProps}
          onChange={changeHandler}
          value={singleValue || ''}
          checked={checked}
          disabled={disabled}
        />
        <span />
      </CheckboxWrapperStyled>
      {label && <Label htmlFor={`checkbox-name-${uniqName}`}>{label}</Label>}
    </ComponentWrapper>
  );
});
