import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';

export const Socials = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  @media only screen and (max-width: 768px) {
    margin-top: 15px;
    margin-bottom: 20px;
    justify-content: flex-start;
    flex-direction: column;
  }
`;
export const SocialsTitle = styled.div`
  ${FONTS.chakra};
  font-weight: 800;
  font-size: 18px;
  line-height: 36px;
  color: ${COLORS.pink};
  margin-right: 15px;
  @media only screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

export const SocialContent = styled.div`
  ${FONTS.chakra};
  font-weight: 800;
  font-size: 18px;
  line-height: 36px;
  color: ${COLORS.pink};
`;
