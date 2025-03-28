import styled from 'styled-components';

import { COLORS } from '../../styles';

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background: #180f1d;
  }
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  & svg {
    path {
      stroke: #a073a7;
    }
  }

  &:hover {
    & svg {
      path {
        stroke: #379fff;
      }
    }
  }
`;

export const Input = styled.input`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  position: relative;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;
  background: transparent;
  padding: 0 40px 0 20px;
  color: #a073a7;
  border: none;
  outline: none;
  height: 68px;

  @media (max-width: 1280px) {
    height: 60px;
  }

  @media (max-width: 768px) {
    height: 50px;
  }

  &:hover {
    color: #ff41b3;
  }

  &::-ms-clear {
    display: none;
  }
  &::-ms-reveal {
    display: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:hover {
    color: ${COLORS.gray} !important;
    -webkit-text-fill-color: ${COLORS.gray};
    box-shadow: 0 0 0 1000px #1e1524 inset;
    background-color: transparent !important;
    background-image: none !important;
  }
`;
