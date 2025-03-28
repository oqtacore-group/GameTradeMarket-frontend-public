import styled, { css } from 'styled-components';
import { borderGradientMenu } from '@game-trade/ui/src/styles/mixins';
import { COLORS } from '@game-trade/ui/src/styles/colors';
import { Button, GetMediaSizes } from '@game-trade/ui';

interface ChooseButtonProps {
  isActive?: boolean;
}

export const ModalContent = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '0 0 20px' : '17px 5px')};
  background: ${COLORS.darkBg};
  ${borderGradientMenu()};
`;

export const ModalHeader = styled.div<{ padding?: boolean }>`
  padding: ${({ padding }) => (padding ? '17px 20px 0' : '0')};
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  background: linear-gradient(49.29deg, #ff41b3 6.25%, #379fff 40%);
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ChooseTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
`;

export const CategoryMint = styled.h1`
  font-size: 16px;
  padding-top: 10px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  text-align: center;
`;

export const SubTitle = styled.div`
  font-size: 17px;

  b {
    color: ${COLORS.pink};
  }

  &::first-letter {
    text-transform: uppercase;
  }

  + hr {
    padding-top: 7px;
    padding-bottom: 10px;
  }
`;

export const WrapperImage = styled.div`
  position: relative;
  width: 100%;
  margin: 20px auto 0;
  padding-bottom: clamp(10rem, 100%, 100%);
`;

export const Description = styled.div`
  font-size: 17px;
  margin: 20px 0 0;
  max-height: 40vh;
  overflow-y: scroll;
  overflow-x: hidden;

  u {
    text-decoration: underline;
    border-bottom: 1px solid white;
  }

  h4 {
    font-style: normal;
    font-weight: bold;
    background: linear-gradient(49.29deg, #ff41b3 6.25%, #379fff 40%);
    background-size: 100% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 10px;
    display: flex;
    span {
      display: flex;
      margin-left: 5px;
      color: ${COLORS.pink};
    }
  }

  h5 {
    display: flex;
    margin-bottom: 10px;
    div {
      margin-left: 5px;
    }
  }

  ::-webkit-scrollbar {
    position: absolute;
    width: 16px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: transparent;

    border: 6px solid transparent;
    border-radius: 12px;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${COLORS.blue};
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: ${COLORS.blue};
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: ${COLORS.blue};
    }
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MintButton = styled(Button)`
  width: 240px;
  position: relative;

  @media (max-width: ${GetMediaSizes.tablet_horizontal_992}) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const Price = styled.div`
  display: block;
  font-size: 24px;
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  background: linear-gradient(49.29deg, #ff41b3 6.25%, #379fff 40%);
  background-size: 100% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ActionButton = styled(Button)`
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 5px 0;
  color: white;

  &:hover {
    a {
      color: white;
      opacity: 0.5;
    }
  }
`;

export const SelectorList = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ChooseButton = styled(Button)<ChooseButtonProps>`
  width: 125px;
  padding: 0 !important;
  margin: 5px 5px;

  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;

  background: #0f0912;

  ${({ isActive }) =>
    isActive &&
    css`
      background: #ff41b3;
    `}

  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        background: #a073a7;
      }
    `}

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const ContinueButton = styled(Button)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 6px 32px 16px 32px;
  margin-top: 10px;
  border: 2px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to top right, ${COLORS.pink}, ${COLORS.pink});
  background: linear-gradient(59.29deg, ${COLORS.pink}, ${COLORS.pink});
  max-width: 120px;

  color: white;
  font-size: 16px;
  font-weight: bold;
`;

export const CancelButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-align: left;
  color: #379fff;
  margin-top: 20px;
`;
