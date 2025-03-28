import { css } from 'styled-components';

import { FONTS } from '../../styles';

const defaultDimensionMixin = css<{ displayAsSquare?: boolean }>`
  padding: 0;
  height: 56px;
  ${(props) => (props.displayAsSquare ? 'width: 56px;' : 'padding: 0 30px;')}

  ${FONTS.chakra};
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* or 150% */

  font-feature-settings: 'tnum' on, 'lnum' on;
`;

export const dimensionMixin = css<{ displayAsSquare?: boolean }>`
  ${defaultDimensionMixin}

  &[data-dimension='xl'] {
    ${defaultDimensionMixin}
  }

  &[data-dimension='l'] {
    height: 48px;
    ${(props) => (props.displayAsSquare ? 'width: 48px;' : 'padding: 0 22px;')}
  }

  &[data-dimension='m'] {
    height: 40px;
    ${(props) => (props.displayAsSquare ? 'width: 40px;' : 'padding: 0 18px;')}
  }

  &[data-dimension='s'] {
    height: 32px;
    ${(props) => (props.displayAsSquare ? 'width: 32px;' : 'padding: 0 14px;')}

    ${FONTS.chakra};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    /* or 143% */

    font-feature-settings: 'tnum' on, 'lnum' on;
  }
`;
