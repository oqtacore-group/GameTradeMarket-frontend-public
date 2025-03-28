import styled, { css } from 'styled-components';
import { COLORS, Button } from '@game-trade/ui';

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 50px auto 0;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const About = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 150px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  height: 540px;
  width: 45%;

  @media (max-width: 900px) {
    width: 80%;
    height: 298px;
  }
`;

export const FrameShadow = styled.div<{ number: number; min?: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  opacity: 0.8;

  ${({ number, min }) => {
    if (number === 1) {
      return css`
        top: ${() => (min ? '10px' : '20px')};
        left: ${() => (min ? '10px' : '20px')};
        opacity: 0.8;
      `;
    }

    if (number === 2) {
      return css`
        top: ${() => (min ? '20px' : '40px')};
        left: ${() => (min ? '20px' : '40px')};
        opacity: 0.5;
      `;
    }
  }}

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(55, 159, 255) calc(50% - 1px),
      rgba(55, 159, 255) calc(50% + 0.5px),
      ${COLORS.darkBg} calc(25% + 1px)
    ),
    linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;

  z-index: -1;
`;

export const Text = styled.div`
  width: 55%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 80px;

  @media (max-width: 900px) {
    width: 100%;
    margin-top: 50px;
    padding-left: 0;
  }
`;

export const Headline = styled.h1`
  position: relative;
  width: 105%;
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: -1;
    -webkit-text-stroke: 1px #ff41b3;
    -webkit-text-fill-color: transparent;
  }
`;

export const Description = styled.p`
  font-size: 18px;
  margin: 20px 0;
`;

export const WrapperButtons = styled.div`
  display: flex;
`;

export const ButtonClaim = styled(Button)`
  width: 200px;
`;

export const ButtonBuy = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 0 4rem;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});

  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.blue});
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const SubText = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const SubHeadline = styled.h2`
  position: relative;
  font-size: 36px;
  margin-bottom: 10px;
  &:after {
    content: attr(data-text);
    position: absolute;
    top: 1px;
    left: 1px;
    z-index: -1;
    -webkit-text-stroke: 1px #ff41b3;
    -webkit-text-fill-color: transparent;
  }
`;

export const SubDescription = styled.p`
  font-size: 22px;
`;

export const MediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 60%;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Tasks = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 150px;

  @media (max-width: 900px) {
    flex-direction: column;

    ${MediaWrapper} {
      margin-top: 50px;
    }
  }
`;

export const Task = styled.div<{ number: number }>`
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 80%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  cursor: pointer;
  transition: 0.8ms;

  ${({ number }) => {
    if (number === 1) {
      return css`
        &:hover {
          border-image-slice: 1;
          border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});
          transition: 0.8ms;

          color: ${COLORS.pink};
          svg {
            fill: ${COLORS.pink};
            path {
              fill: ${COLORS.pink};
              stroke: ${COLORS.pink};
            }
          }
        }
      `;
    }

    if (number === 2) {
      return css`
        top: 45px;
        left: calc(20px + 10%);

        &:hover {
          border-image-slice: 1;
          border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.blue});
          transition: 0.8ms;

          color: ${COLORS.pink};
          svg {
            fill: ${COLORS.pink};
            path {
              fill: ${COLORS.pink};
              stroke: ${COLORS.pink};
            }
          }
        }
      `;
    }

    if (number === 3) {
      return css`
        color: ${COLORS.pink};
        top: 90px;
        left: calc(40px + 10%);

        svg {
          fill: ${COLORS.pink};
          path {
            fill: ${COLORS.pink};
            stroke: ${COLORS.pink};
          }
        }

        border-width: 0;
        background-color: transparent;

        background-repeat: no-repeat;
        background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
          linear-gradient(${COLORS.blue}, ${COLORS.blue}),
          linear-gradient(to left, ${COLORS.blue}, ${COLORS.blue}, ${COLORS.pink}),
          linear-gradient(to right, ${COLORS.pink}, ${COLORS.pink}, ${COLORS.blue}),
          linear-gradient(
            to top left,
            transparent calc(50% - 1px),
            transparent calc(50% - 1px),
            rgba(55, 159, 255) calc(50% - 1px),
            rgba(55, 159, 255) calc(50% + 0.5px),
            rgba(21, 12, 26, 0.7) calc(25% + 1px)
          ),
          linear-gradient(rgba(21, 12, 26, 0.7), rgba(21, 12, 26, 0.7)),
          linear-gradient(rgba(21, 12, 26, 0.7), rgba(21, 12, 26, 0.7));
        background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
        background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
      `;
    }
  }}
`;

export const Mission = styled.div<{ pathFill?: boolean }>`
  display: flex;
  align-items: center;

  svg {
    margin-right: 10px;
    fill: ${COLORS.white};

    ${({ pathFill }) => {
      if (pathFill) {
        return css`
          path {
            stroke: ${COLORS.white};
          }
        `;
      }
    }}
  }
`;

export const Points = styled.div``;

export const WrapperTarget = styled.div`
  position: absolute;
  left: 5%;
  bottom: -7%;

  @media (max-width: 900px) {
    top: 120px;
    right: 0;
    left: inherit;
    bottom: inherit;
  }
`;

export const Activity = styled.div`
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  padding: 20px;
  width: 40%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  border-bottom: 5px solid #722fff;

  svg {
    fill: #722fff;
    margin-right: 20px;
  }

  @media (max-width: 900px) {
    width: 100%;
    left: 0;
    top: 0;
  }
`;

export const Follow = styled.div`
  position: absolute;
  left: 200px;
  top: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 24px;
  padding: 20px;
  width: 60%;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  border-bottom-width: 0;

  &:after {
    content: '';
    background: linear-gradient(59.29deg, #ff41b3 20.25%, #379fff 100%);
    width: 100%;
    position: absolute;
    height: 5px;
    bottom: 0;
  }

  svg {
    fill: #722fff;
    margin-right: 20px;
  }

  @media (max-width: 900px) {
    width: 100%;
    left: 0;
    top: 100px;
  }
`;

export const WrapperTouch = styled.div`
  position: absolute;
  right: 5%;
  top: -15%;
`;

export const Community = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 150px;

  ${MediaWrapper} {
    width: 50%;
  }

  ${SubText} {
    width: 50%;
  }

  @media (max-width: 900px) {
    flex-direction: column;
    margin-top: 300px;

    ${MediaWrapper} {
      width: 100%;
    }

    ${SubText} {
      width: 100%;
      margin-top: 200px;
    }

    ${WrapperTouch} {
      top: -50px;
    }
  }
`;

export const ClaimAndEnjoy = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 150px;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const CatImage = styled.div`
  &:nth-child(2) {
    position: absolute;
    left: 40%;
    bottom: -7%;

    @media (max-width: 900px) {
      bottom: -50%;
      left: 30%;
    }
  }

  &:last-child {
    position: absolute;
    right: 0;
  }
`;

export const Images = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: 100px;

  @media (max-width: 900px) {
    padding-left: 0;
    margin-top: 50px;
  }

  ${CatImage}:first-child ${ImageWrapper} {
    height: 200px;
    width: 200px;

    @media (max-width: 900px) {
      height: 150px;
      width: 150px;
    }
  }

  ${CatImage}:nth-child(2) ${ImageWrapper} {
    height: 150px;
    width: 150px;

    @media (max-width: 900px) {
      height: 100px;
      width: 100px;
      z-index: 3;
    }
  }

  ${CatImage}:last-child ${ImageWrapper} {
    height: 250px;
    width: 250px;

    @media (max-width: 900px) {
      height: 200px;
      width: 200px;
    }
  }
`;

export const WrapperNftSymbol = styled.div`
  position: absolute;
  left: 32%;
  bottom: -20%;

  @media (max-width: 900px) {
    left: 22%;
    bottom: -20%;
    z-index: 5;
  }
`;

export const Utility = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 150px;

  ${MediaWrapper} {
    width: 50%;
  }

  ${SubText} {
    width: 50%;
  }

  ${ImageWrapper} {
    width: 115%;
  }

  @media (max-width: 900px) {
    flex-direction: column;

    ${MediaWrapper} {
      width: 100%;
    }

    ${SubText} {
      width: 100%;
    }

    ${ImageWrapper} {
      width: 100%;
    }
  }
`;

export const BackgroundWrapper = styled.div`
  width: 100%;
`;
