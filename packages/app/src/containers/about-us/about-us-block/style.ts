import styled, { css } from 'styled-components';
import { WrapperContent } from '@game-trade/ui/components/nft-card/schedule-donut/style';
import { Button, COLORS } from '@game-trade/ui';
// import { Button, COLORS, FONTS } from '@game-trade/ui';

export const BackgroundAnimationComponent = styled.div`
  mask-image: linear-gradient(to bottom, black 60%, rgba(0, 0, 0, 0));
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 85rem;
  z-index: -5;

  @media (max-width: 1200px -1) {
    height: 80rem;
  }

  @media (max-width: 992px -1) {
    display: none;
  }
`;

export const AboutUsWrapper = styled.div`
  padding-top: 13rem;
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

export const TextWrapper = styled.div`
  width: 45%;
  padding-left: 7rem;
  margin-top: 5rem;

  @media (max-width: 992px) {
    width: 100%;
    padding: 0;
  }
`;

export const TokenCardWrapper = styled.div`
  position: relative;
  width: 250px;
`;

export const TokenWrapper = styled.div`
  width: 19%;
  margin: 5rem;

  @media (max-width: 992px) {
    display: none;
  }
`;

export const UserAndSaleTypeWrapper = styled.div`
  width: 36%;

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const ButtonTradeIn = styled(Button)`
  width: 200px;
`;

export const CardUser = styled.div`
  padding: 2.8rem 3rem;
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(55, 159, 255, 0.15)),
    linear-gradient(to left, rgba(0, 0, 0, 0.1), ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.blue}, rgba(55, 159, 255, 0.15)),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25% + 1px)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0 0, -25px 100%, 100% 100%, -25px 0, 0 -25px;
`;

export const Description = styled.div`
  display: flex;
  align-items: center;

  > span {
    border-radius: 20rem;
    overflow: hidden;
  }
`;

export const Info = styled.div`
  margin-left: 2rem;
`;

export const Account = styled.div`
  font-size: 2.4rem;
`;

export const Status = styled.div`
  color: ${COLORS.pink};
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 2.5rem;
`;

export const ButtonMessage = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 0 3.5rem;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});

  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SaleType = styled.div`
  padding: 2rem 3rem;
  margin-top: 2rem;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(rgba(0, 0, 0, 0.1), rgba(55, 159, 255, 0.15)),
    linear-gradient(to left, rgba(0, 0, 0, 0.1), ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.blue}, rgba(55, 159, 255, 0.15)),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% - 1px),
      rgba(55, 159, 255, 0.15) calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25% + 1px)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0 0, -25px 100%, 100% 100%, -25px 0, 0 -25px;
`;

export const SaleTypeWrapper = styled.div`
  display: flex;
`;

export const WrapperForm = styled.div`
  margin-top: 1.5rem;
`;

export const HeightSaleType = styled.div`
  @media (max-width: 992px) {
    width: 50%;
  }
`;

export const TitleSaleType = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 18px;
  cursor: pointer;

  width: 12rem;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${COLORS.pink};

  @media (max-width: 992px) {
    width: 100%;
    font-size: 2rem;
  }
`;

export const WrapperArrow = styled.div<{ rotateArrow: boolean }>`
  padding: 13px;

  svg {
    fill: ${COLORS.blue};
  }

  ${({ rotateArrow }) =>
    rotateArrow &&
    css`
      transform: rotate(180deg);
    `}
`;

export const WrapperColumnsDonuts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${WrapperContent} {
    margin-bottom: 0;
  }

  @media (max-width: 992px) {
    width: 50%;
  }
`;
