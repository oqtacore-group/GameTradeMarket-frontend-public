import React from 'react';
import { useController } from 'react-hook-form';

interface IProps {
  children: any;
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  formDefaultValues?: any;
}

// wrapper for registering fields in the form
// accepts a FIELD as children and passes onChange, value and error to it
// the field does NOT need to be controlled, just get information about the state of the ENTIRE form at once
export function ControlledField(props: IProps) {
  const { children, control, name, rules, defaultValue, formDefaultValues } = props;
  const defValue = defaultValue || (formDefaultValues && formDefaultValues[name]);
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    field: { ref, ...inputProps },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue: defValue,
  });

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.createElement(child.type, {
          ...{
            // ref: ref,
            status: error ? 'error' : undefined,
            ...inputProps,
            ...child.props,
            checked:
              child.props.value !== undefined ? child.props.value === inputProps.value : undefined, // for radio-buttons
            error,
            key: child.props.name,
          },
        });
      })}
    </>
  );
}
