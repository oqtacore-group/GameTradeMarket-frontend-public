import styled, { css } from 'styled-components';
import { COLORS, Button } from '@game-trade/ui';

export const ContentMain = styled.main`
  display: flex;
  min-height: 65vh;
  margin-top: 10rem;
  flex-direction: row;
  align-items: center;

  @media (max-width: 992px) {
    display: flex;
    flex-direction: column;
  }
`;

export const DevelopersWrapper = styled.article`
  width: 1440px;
  margin: 0 auto;
  padding: 0 50px;

  @media (max-width: 992px) {
    width: 100%;
    padding: 0 10px;
  }
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media (max-width: 992px) {
    width: 100%;
    padding: 0;
  }
`;

export const Text = styled.div`
  margin-bottom: 5rem;
`;

export const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 3);
  margin-right: 4rem;
`;

export const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 3.5);
  height: 80%;
  margin-right: 4rem;
`;

export const LastColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% / 4);
  padding-top: 10%;
`;

export const ImagesWrapper = styled.div`
  width: 50%;
  margin-left: 10%;
  display: flex;

  @media (max-width: 992px) {
    width: 100%;
    margin-left: 0;
    padding: 10px;
  }
`;

export const ImageWrapper = styled.div`
  padding: 2rem;
`;

export const HeadlineMain = styled.h1`
  position: relative;

  & + p {
    margin-top: 2.4rem;
    padding-right: 4rem;
    margin-bottom: 2rem;
  }

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 4px;
    left: 3px;
    opacity: 0.5;
    z-index: -1;
    -webkit-text-stroke: 1px ${COLORS.pink};
    -webkit-text-fill-color: transparent;
  }
`;

export const ButtonWithUs = styled(Button)`
  width: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const WindowButtons = styled.div`
  position: absolute;
  top: 0;
  left: 1rem;

  span {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 4px;

    &:first-child {
      background-color: ${COLORS.pink};
    }

    &:nth-child(2) {
      background-color: #ffe07d;
    }

    &:last-child {
      background-color: #9df9b2;
    }
  }
`;

export const BorderCutEdge = styled.div`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 0.1)),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25%)
    ),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg}),
    linear-gradient(${COLORS.darkBg}, ${COLORS.darkBg});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const BorderCutEdgeBlack = styled.div`
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, rgba(0, 0, 0, 0.1)),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.blue} calc(50% - 1px),
      ${COLORS.blue} calc(50% + 0.5px),
      ${COLORS.black} calc(25%)
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const Card = styled(BorderCutEdge)`
  position: relative;
  margin-bottom: 2rem;

  ${ImageWrapper} {
    padding: 3rem;
    border-radius: 50rem;
    overflow: hidden;
  }
`;

export const CardCss = styled(BorderCutEdge)`
  width: 70%;
  padding: 4rem 3rem;
  margin-bottom: 2rem;
`;

export const CardBrackets = styled(BorderCutEdge)`
  width: 100%;
  padding: 3rem 2rem 4rem;
  margin-bottom: 2rem;
`;

export const CardCode = styled(BorderCutEdge)`
  position: relative;
  width: 100%;
  padding-bottom: 5rem;
`;

export const CardCloud = styled(BorderCutEdge)`
  margin-bottom: 15rem;
`;

export const ShadowBorderEdgePurple = styled.div<{ type: number }>`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.shadowPurple}, ${COLORS.shadowPurple}),
    linear-gradient(${COLORS.shadowPurple}, ${COLORS.shadowPurple}),
    linear-gradient(${COLORS.shadowPurple}, ${COLORS.shadowPurple}),
    linear-gradient(${COLORS.shadowPurple}, ${COLORS.shadowPurple}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.shadowPurple} calc(50% - 1px),
      ${COLORS.shadowPurple} calc(50%),
      rgba(0, 0, 0, 0) calc(25% + 1px)
    ),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)),
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0% 0%, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  ${({ type }) => {
    if (type === 1) {
      return css`
        left: 1rem;
        top: -2rem;
        opacity: 0.5;
      `;
    }
    if (type === 2) {
      return css`
        left: 2rem;
        top: -4rem;
        opacity: 0.2;
      `;
    }

    return '';
  }}
`;

export const PageBlock = styled.div`
  position: relative;

  @media only screen and (max-width: 1600px) {
  }
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 992px) {
    ${CardBrackets} {
      padding: 2rem;
    }

    ${CardCss} {
      padding: 3rem;
    }
    .CardGroup {
      .pr-5 {
        padding-right: 23px !important;
      }
    }

    .CardFeature {
      display: flex;
      align-items: flex-start;

      img {
        margin-right: 20px;
      }

      &_list {
        font-size: 16px;

        p {
          font-size: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .CardGroup {
      margin-top: 20px;
    }

    .CardFeature {
      display: block;
      margin-top: 23px;
    }
  }
`;

export const FeaturesWrapper = styled.article``;

export const Features = styled.div`
  padding-bottom: 5rem;
`;

export const Headline = styled.h2`
  position: relative;
  padding-bottom: 2.5rem;

  &:after {
    content: attr(data-text);
    position: absolute;
    top: 4px;
    left: 3px;
    opacity: 0.5;
    z-index: -1;
    -webkit-text-stroke: 1px ${COLORS.pink};
    -webkit-text-fill-color: transparent;
  }
`;

export const ListFeature = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const WrapperHeadline = styled.div`
  display: flex;
  justify-content: center;
`;
