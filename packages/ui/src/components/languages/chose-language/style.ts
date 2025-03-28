import styled, { css } from 'styled-components';
import { COLORS } from '../../../styles';

export const Tile = styled.div<{ selected?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: ${COLORS.black90};
  color: ${COLORS.grayPurple};
  border: 1px solid ${COLORS.grayPurple};
  padding: 17px 0;
  flex-shrink: 0;
  flex-grow: 1;

  &:hover {
    background-color: rgb(32, 20, 38);
    color: ${COLORS.pink};
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid ${COLORS.pink};
    `}
`;

export const Wrapper = styled.div<{ window: boolean; open: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 600px;

  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
  }

  ${({ window }) => {
    if (window) {
      return css`
        display: none;
        position: absolute;
      `;
    }

    if (!window) {
      return css`
        position: relative !important;
        bottom: initial !important;
      `;
    }
  }}

  ${({ open }) =>
    open &&
    css`
      display: flex;
      position: absolute;
      bottom: 120%;
    `}
`;

export const Language = styled.div`
  font-family: 'ChakraPetch', sans-serif;
  font-style: normal;
  font-weight: 800;
  color: ${COLORS.pink};
  cursor: pointer;
`;

export const Component = styled.div<{ footer?: boolean }>`
  position: relative;
  display: flex;
  font-size: 18px;
  line-height: 2;
  margin: 1rem 0;

  ${({ footer }) =>
    !footer &&
    css`
      flex-direction: column;
    `}
`;
