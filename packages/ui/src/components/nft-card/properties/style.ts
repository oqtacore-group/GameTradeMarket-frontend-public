import styled from 'styled-components';

import { COLORS } from '../../../styles';

export const WrapperPropertiesCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  width: calc(25% - 12px);

  background: rgba(21, 12, 25, 0.4);
  border: 1px solid #0f0912;
  margin: 6px;

  @media (max-width: 1600px) {
    width: calc(33.333333% - 12px);
  }

  @media (max-width: 1250px) {
    width: calc(50% - 12px);
  }

  @media (max-width: 900px) {
    width: calc(33.333333% - 19px);
  }

  @media (max-width: 650px) {
    width: calc(50% - 23px);
  }

  @media (max-width: 450px) {
    width: calc(100% - 32px);
  }
`;

export const ActionName = styled.div`
  text-transform: uppercase;
  font-size: 14px;
`;

export const Name = styled.div`
  color: ${COLORS.blue};
  font-size: 14px;
`;

export const Description = styled.div`
  color: ${COLORS.grayPurple};
`;

export const Percent = styled.span`
  color: ${COLORS.pink};
`;
