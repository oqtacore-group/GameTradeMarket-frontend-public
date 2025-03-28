import styled from 'styled-components';
import { VerificationInputProps } from 'react-verification-input';

import { COLORS, FONTS } from '../../styles';

export const Container = styled.div<Partial<VerificationInputProps>>`
  position: relative;
  z-index: 1;

  .container {
    .character {
      background: rgba(15, 9, 18, 0.2);
      width: 46px;
      height: 64px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      line-height: 23.4px;
      ${FONTS.chakra};
      font-weight: 600;
      color: ${COLORS.gray};
      border: 1px solid ${COLORS.gray};
      margin-right: 15px;
      :last-child {
        margin-right: 0;
      }
    }
    .character--inactive {
    }
    .character--selected {
      background-repeat: no-repeat;
      background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
        linear-gradient(${COLORS.blue}, ${COLORS.blue}),
        linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.blue}),
        linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
        linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
        linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
      background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;

      background-position: 0 0, 100% 0, 0% 0%, 0 100%, 0% 90%, 0 0%, 0% 0;
    }
  }
`;
