import styled from 'styled-components';
import { COLORS } from '../../../../styles';

export const FilterBlockWrapperStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${COLORS.black};

  :last-child {
    border-bottom: 1px solid ${COLORS.black};
  }
`;

export const FilterBlockHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  padding: 20px 40px;
`;

export const FilterBlockContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FilterBlockTitle = styled.div`
  display: flex;
  flex-direction: row;
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

export const FilterBlockTitleIconWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  padding-left: 20px;

  svg {
    width: 12px;
    height: 7px;
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
  }
`;
