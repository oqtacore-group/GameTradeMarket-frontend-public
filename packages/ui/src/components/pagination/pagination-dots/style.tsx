import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles';

export const WrapperPaginationDots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

export const Dot = styled.div<{ active: boolean; last: boolean; preLast: boolean }>`
  width: 12px;
  height: 12px;

  ${({ last }) => {
    if (last) {
      return css`
        width: 8px;
        height: 8px;
      `;
    }
  }}

  ${({ preLast }) => {
    if (preLast) {
      return css`
        width: 10px;
        height: 10px;
      `;
    }
  }}

  border-radius: 250px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? `${COLORS.pink}` : `${COLORS.grayPurple}`)};
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  margin: 0 10px;

  @media (max-width: 767px) {
    margin: 7px;
  }

  @media (max-width: 576px) {
    margin: 3px;
  }
`;
