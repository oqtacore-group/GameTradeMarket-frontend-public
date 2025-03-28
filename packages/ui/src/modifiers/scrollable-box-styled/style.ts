import styled from 'styled-components';

import { COLORS } from '../../styles';

export const Block = styled.div<{
  hasScroll: boolean;
  maxHeight?: string;
  disableBlur?: boolean;
}>`
  max-height: ${({ maxHeight }) => maxHeight || '100%'};
  position: relative;
  padding-right: 0;
  overflow-y: ${'overlay'};

  ::-webkit-scrollbar {
    position: absolute;
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;

    border: 6px solid transparent;
    border-radius: 12px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${COLORS.blue};
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.blue};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${COLORS.blue};
    }
  }
`;
