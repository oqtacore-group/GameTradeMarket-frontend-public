import styled from 'styled-components';

import { COLORS } from '../../styles';

export const BreadCrumbsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 40px;
  border-top: 1px solid ${COLORS.black};
  border-bottom: 1px solid ${COLORS.black};

  @media (max-width: 320px) {
    padding: 14px 20px;
  }
`;

export const BreadCrumbWrapper = styled.div`
  font-family: ChakraPetch;
  font-size: 15px;
  line-height: 20px;
  color: ${COLORS.gray};
  font-weight: 400;

  :last-child {
    color: ${COLORS.pink};
    font-weight: 600;
  }

  @media (max-width: 320px) {
    font-size: 11px;
    line-height: 14px;
  }
`;

export const Separator = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 20px;

  svg {
    height: 12px;
    width: 5px;
  }

  :last-child {
    display: none;
  }

  @media (max-width: 320px) {
    padding: 0 8px;
  }
`;
