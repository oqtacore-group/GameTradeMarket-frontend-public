import styled from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const Marketplace = styled.div`
  position: relative;
`;

export const MarketplaceContainerWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

export const MarketplaceContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MarketplaceContentStyled = styled.div`
  padding: 0 20px;
`;

export const MobileTitleWrapper = styled.div`
  display: none;

  @media (max-width: 576px) {
    display: block;
    padding: 35px 20px 10px;
  }
`;

export const DesktopTitleWrapper = styled.div`
  @media (max-width: 576px) {
    display: none;
  }
`;

export const GridWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
`;

export const NoItems = styled.div`
  color: ${COLORS.pink};
  display: flex;
  position: relative;
  font-size: 36px;
  font-weight: 600;
  line-height: 30px;
  margin: 30px 0;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 2px;
    left: 2px;
    opacity: 1;
    z-index: -1;
    -webkit-text-stroke: 2px ${COLORS.blue};
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 600px) {
    margin-top: 0 !important;
  }
`;
