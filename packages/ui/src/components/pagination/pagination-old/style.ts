import styled, { css } from 'styled-components';

import { COLORS } from '../../../styles';

export const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${COLORS.black};
  i {
    height: 15px;
    cursor: pointer;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  a {
    cursor: pointer;
    color: #a073a7;
  }

  &.selected {
    a {
      font-size: 2.4rem;
      color: ${COLORS.pink};
    }
  }
`;

export const ButtonWrapper = styled.div<{ isHideMore?: boolean }>`
  ${({ isHideMore }) =>
    isHideMore &&
    css`
      border: 1px solid ${COLORS.black};
      border-right: 0 none;
      cursor: pointer;
    `}
`;
export const ButtonStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6rem;
`;
