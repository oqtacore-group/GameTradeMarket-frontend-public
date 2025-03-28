import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { IProps } from './interfaces';
import { ComponentWrapper, CheckboxWrapperStyled, Label } from './style';
import { useCheckboxGroupContext } from './group';

export const CheckboxComponent = React.forwardRef((props: IProps, ref: any) => {
  const {
    label = '',
    disabled = false,
    value: singleValue = false,
    grouped = false,
    valueKey,
    padding,
    selectedBlockchain,
    resetCheckbox,
    ...inputProps
  } = props;
  const [uniqName] = useState(uuidv4());
  const { onChange: contextOnChange, value: contextValue = [] } = useCheckboxGroupContext();

  const blockchainValue =
    contextValue.length > 0
      ? contextValue.filter((elem) => elem !== '')
      : [selectedBlockchain ?? ''];

  const checked = grouped
    ? blockchainValue?.some((item: any) => {
        const preparedSingleValue = valueKey ? singleValue[valueKey] : singleValue;
        const preparedItemValue = valueKey ? item[valueKey] : item;

        const preparedSingleBlockchain = singleValue.blockchain ?? selectedBlockchain;
        const preparedItemBlockchain = item.blockchain ?? selectedBlockchain;

        return (
          preparedSingleValue === preparedItemValue &&
          preparedSingleBlockchain === preparedItemBlockchain
        );
      })
    : blockchainValue.length > 0;

  const changeHandler = () => {
    if (!disabled) {
      if (grouped && contextOnChange) {
        const preparedContextValue = Array.isArray(blockchainValue) ? blockchainValue : [];
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
    <ComponentWrapper style={{ padding: padding }} disabled={disabled}>
      <CheckboxWrapperStyled disabled={disabled}>
        <input
          id={`checkbox-name-${uniqName}`}
          ref={ref}
          type="checkbox"
          {...inputProps}
          onChange={changeHandler}
          value={singleValue || ''}
          checked={resetCheckbox ? false : checked}
          disabled={disabled}
        />
        <span />
      </CheckboxWrapperStyled>
      {label && <Label htmlFor={`checkbox-name-${uniqName}`}>{label}</Label>}
    </ComponentWrapper>
  );
});
