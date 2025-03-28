import styled, { css } from 'styled-components';

export const PaginationBlock = styled.div<{ showButton?: boolean; isHide?: boolean }>`
  display: ${({ showButton, isHide }) => (isHide ? 'none' : showButton ? 'grid' : 'flex')};
  grid-template-columns: 60% 40%;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ showButton }) => (showButton ? 'space-between' : 'center')};
  width: 100%;
  border-top: 1px solid #150c19;
  border-bottom: 1px solid #150c19;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const Button = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  width: 100%;
  cursor: pointer;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  letter-spacing: 0.05em;

  @media (max-width: 768px) {
    border: 0;
    height: 30px;
    margin-bottom: 15px;
  }

  &:hover {
    color: #379fff;
  }

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 1px;
    right: 0;
    top: 0;
    background: #150c19;

    @media (max-width: 768px) {
      content: none;
    }
  }
`;

export const PagesBlock = styled.div<{ isLoading?: boolean; showButton?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 68px;
  padding: ${({ showButton }) => (showButton ? '0 20px' : '0')};
  ${({ isLoading }) =>
    isLoading &&
    css`
      opacity: 0.5;
      cursor: default;
      pointer-events: none;
    `}
`;

export const ArrowLeftWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  user-select: none;

  & svg {
    transform: rotate(180deg);
    cursor: pointer;
  }
`;

export const ArrowRightWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  user-select: none;

  & svg {
    cursor: pointer;
  }
`;

export const PagesList = styled.div`
  margin: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageNumber = styled.div<{ isSelected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 110%;
  text-align: center;
  letter-spacing: 0.1em;
  color: ${({ isSelected }) => (isSelected ? '#FF41B3' : '#A073A7')};
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;
