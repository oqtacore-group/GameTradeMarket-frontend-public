import styled from 'styled-components';
import { shadowBorderEdgeGradient } from '@game-trade/ui/src/styles/mixins';
import { COLORS } from '@game-trade/ui/src/styles/colors';

export const ModalContent = styled.div`
  ${shadowBorderEdgeGradient()};
`;

export const ModalHeader = styled.div`
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  padding-top: 20px;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  color: ${COLORS.pink};
`;

export const DonwloadLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 0 55px 30px 55px;
`;

export const DownloadLink = styled.div`
  background-color: ${COLORS.grayPurple};
  width: calc(50% - 10px);
  padding: 0 13px;

  svg {
    width: 12rem;
    height: 6rem;
    path {
      fill: ${COLORS.white};
    }
  }
`;
