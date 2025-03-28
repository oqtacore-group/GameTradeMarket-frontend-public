import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const TitleUsersWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const TitlePeople = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 40px;
  color: ${COLORS.white};
  padding-right: 30px;

  @media (max-width: 850px) {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    padding-right: 15px;
  }
`;

export const UsersCount = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: ${COLORS.gray};
  padding-bottom: 5px;

  @media (max-width: 768px) {
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
  }
`;
