import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ALIGN, Loader, SIZE } from '../../index';

import { StyledButton, ButtonContent } from './style';
import { ButtonProps } from './interfaces';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isShadow,
      isLoader,
      isGradientText,
      appearance = 'primary',
      dimension = 'm',
      type = 'button',
      children,
      icon = null,
      ...props
    },
    ref
  ) => {
    return (
      <StyledButton
        ref={ref}
        appearance={appearance}
        dimension={dimension}
        type={type}
        isShadow={isShadow}
        isLoader={isLoader}
        {...props}>
        {isLoader && <Loader size={SIZE.MINI} position={ALIGN.CENTER} />}
        {!isLoader && (
          <ButtonContent isGradientText={isGradientText}>
            {icon && <span style={{ marginBottom: '3px' }}>{icon}</span>}

            {React.Children.toArray(children).map((child) =>
              typeof child === 'string' ? <span key={uuidv4()}>{child}</span> : child
            )}
          </ButtonContent>
        )}
      </StyledButton>
    );
  }
);
