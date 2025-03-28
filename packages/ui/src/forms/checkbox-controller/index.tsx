import React from 'react';

import { CheckboxStyled } from './style';

interface ICheckboxControllerProps {
  title: string;
  register: any;
  setValue: any;
  htmlFor: string;
  registerName: string | undefined;
  count?: number;
  disable: boolean;
}

export const CheckboxController = ({
  title,
  register,
  setValue,
  htmlFor,
  registerName,
  count,
  disable,
}: ICheckboxControllerProps) => {
  return (
    <CheckboxStyled isDisable={disable}>
      <label htmlFor={htmlFor}>
        <div className={'field_wrapper'}>
          <input
            className={'field'}
            {...register(`${registerName}.checked`)}
            onChange={(e) => {
              setValue(`${registerName}.checked`, e.target.checked);
            }}
            disabled={disable}
            type="checkbox"
            id={htmlFor}
          />
          <span />
        </div>
        <div className={'value'}>
          {title} {count && `(${count})`}
        </div>
      </label>
    </CheckboxStyled>
  );
};
