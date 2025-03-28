import styled, { css } from 'styled-components';
import { Button, COLORS, gradientText, GetMediaSizes } from '@game-trade/ui';
import { ReviewsContent } from '../game-detail-card/reviews/style';
import { BlockRow } from '../game-detail-card/item-content/description-content/style';

export const LaunchpadDetailGame = styled.div`
  position: relative;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 30px 50px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    padding: 12px 0 0;
  }
`;

export const Wrapper = styled.div`
  background: rgba(24, 15, 29, 0.4);
  border-right: 1px solid #0f0912;

  ${ReviewsContent} {
    margin-top: 25px;
    h3 {
      font-size: 18px;
      margin-left: 20px;
    }

    small {
      display: none;
    }
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    background: initial;
    border-right-width: 0;
  }
`;

export const MainImageWrapper = styled.div`
  position: relative;
  border: 1px solid ${COLORS.darkBg};

  clip-path: polygon(100% 0, 100% 92%, 98% 100%, 0 100%, 0 0);

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    margin: 20px;
  }
`;

export const BlocksWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
`;

export const Pill = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 5px 20px;
  color: black;
  background-color: white;
  z-index: 10;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    top: 10px;
    left: 10px;
  }
`;

export const MainContainer = styled.div`
  display: flex;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
    width: 100%;
    background: rgba(24, 15, 29, 0.4);
  }
`;
export const MediaContainer = styled.div`
  display: flex;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
    background: rgba(24, 15, 29, 0.4);
  }
`;
export const RoadmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  border: 1px solid #0f0912;
  border-top-width: 0;
  border-right-width: 0;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    background: rgba(24, 15, 29, 0.4);
  }
`;
export const MintWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  border: 1px solid #0f0912;
  border-top-width: 0;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
    width: 100%;
  }
`;
export const MintHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;
export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
  }
`;
export const InfoColumn = styled.div`
  h4 {
    color: ${COLORS.pink};

    + div {
      font-size: 16px;
    }
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;

    h4 {
      font-size: 18px;
      margin: 0;
      + div {
        margin-left: 10px;
      }
    }
  }
`;

export const InfoDateEnd = styled.div`
  ${gradientText};
`;
export const MintButton = styled(Button)`
  width: 240px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    margin-top: 20px;
    width: 100%;
  }
`;
export const SocialNetwork = styled.div`
  display: flex;
  margin-top: 30px;
`;
export const DescriptionMint = styled.div`
  h4 {
    margin-top: 35px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    h4 {
      font-size: 18px;
    }
  }
`;
export const GamePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  padding: 20px;
  border-bottom: 1px solid #0f0912;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 100%;
  }
`;
export const GamePageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    flex-direction: column;
  }
`;
export const LogoWrapper = styled.div`
  position: relative;
  width: 274px;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 250px;
  }
`;
export const DescriptionGamePage = styled.div`
  margin-top: 10px;
`;
export const GamePageFooter = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    margin-top: 20px;
  }
`;
export const ShopButton = styled(Button)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0 4rem;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});

  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  & > span {
    & > span {
      background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
      -webkit-background-clip: text;
    }
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 100%;
  }
`;

export const TrailerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  border: 1px solid #0f0912;
  border-top-width: 0;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 100%;
  }
`;
export const PicsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 20px;
  border-bottom: 1px solid #0f0912;

  h2 {
    font-size: 36px;
    margin-bottom: 20px;
  }

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    width: 100%;
  }
`;

export const ImageWrapper = () => css`
  height: 40rem;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    height: 180px;
    width: 100%;
  }
`;

export const LogoImageWrapper = () => css`
  height: 60px;

  @media (max-width: ${GetMediaSizes.personal_computer_1200}) {
    height: 55px;
  }
`;

export const ContractsTitleBlock = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;
  font-size: 17px;
  justify-content: space-between;

  svg {
    margin-left: 10px;
    width: 12px;
    height: 7px;
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
    path {
      fill: transparent;
      stroke: ${COLORS.blue};
    }
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
  }
`;

export const ContractLeft = styled.div`
  margin-right: auto;

  @media (max-width: 900px) {
    margin-bottom: 10px;
  }
`;

interface IContractsListProps {
  isContractsOpened: boolean;
}

export const BlockDropdown = styled.div<IContractsListProps>`
  overflow: hidden;
  margin: 10px;
  height ${(p) => (p.isContractsOpened ? 'auto' : 0)};

  & > ${BlockRow.selector}:first-child {
    padding-top: 0;
  }
`;

export const HeaderDropDown = styled.div`
  font-size: 18px;
  padding-top: 15px;
  padding-bottom: 5px;
`;

export const WrapperDropDown = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
`;

export const ContinueButton = styled(Button)`
  cursor: pointer;
  padding: 6px 32px 16px 32px;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.pink});
  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.pink});
  max-width: 160px;

  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const DropdownSelector = styled.select`
  width: 200px;
  height: 40px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  background: none;
  border: 1px solid;
  border-color: black;
  color: white;

  &:hover {
    color: #379fff;
  }
`;
