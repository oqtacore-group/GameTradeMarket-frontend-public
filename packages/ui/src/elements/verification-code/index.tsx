import React from 'react';
import VerificationInput, { VerificationInputProps } from 'react-verification-input';

import { Container } from './style';

export const VerificationCode = React.forwardRef<HTMLDivElement, VerificationInputProps>(
  (props, ref) => {
    return (
      <Container ref={ref}>
        <VerificationInput
          placeholder=""
          removeDefaultStyles={true}
          validChars="0-9"
          classNames={{
            container: 'container',
            character: 'character',
            characterInactive: 'character--inactive',
            characterSelected: 'character--selected',
          }}
          {...props}
        />
      </Container>
    );
  }
);
