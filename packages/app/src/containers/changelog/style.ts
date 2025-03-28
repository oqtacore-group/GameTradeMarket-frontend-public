import styled, { css } from 'styled-components';
import { FONTS } from '@game-trade/ui';
import { rgba } from 'polished';

export const Wrapper = styled.div`
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 47px;
  margin-top: 45px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 31px;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 1064px;
  min-height: 1000px;
  margin: 0 auto;
  padding-top: 80px;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      ${rgba('#0f0912', 0.2)} 3%,
      #379fff 20%,
      #379fff 75%,
      transparent 95%
    );
  }

  @media (max-width: 1280px) {
    margin: 0 40px;
  }

  @media (max-width: 768px) {
    margin: 0 20px;
    padding-top: 0;

    &:before {
      left: 0;
      top: -76px;
      height: calc(100% + 45px);
    }
  }
`;

export const ListItem = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;

  :last-child {
    margin-bottom: 64px;
  }

  @media (max-width: 1280px) {
    margin: 30px 0;

    :last-child {
      margin-bottom: 50px;
    }
  }

  @media (max-width: 768px) {
    margin: 36px 0;
    flex-direction: column;
    align-items: flex-start;

    :last-child {
      margin-bottom: 42px;
    }
  }
`;

export const ItemPart = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;

    :first-child {
      justify-content: flex-start;
      padding-left: 20px;
    }

    :last-child {
      justify-content: flex-start;
      padding-left: 20px;
    }
  }
`;

export const ItemLabel = styled.div<{ content?: string }>`
  position: relative;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 100%;

  &:before {
    content: '${({ content }) => content}';
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: -1;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${rgba('#FF41B3', 0.5)};
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const ItemDate = styled.div<{ content?: string }>`
  position: relative;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  margin-top: 15px;
  line-height: 100%;

  &:before {
    content: '${({ content }) => content}';
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: -1;
    white-space: nowrap;
    color: transparent;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${rgba('#FF41B3', 0.5)};
  }

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

export const ItemDot = styled.div<{ isFirst?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ isFirst }) => (isFirst ? '#FF41B3' : '#379FFF')};

  &:before {
    display: ${({ isFirst }) => (isFirst ? 'block' : 'none')};
    position: absolute;
    left: 50%;
    transform: translate(-50%, 20px);
    content: '';
    height: 150px;
    width: 1px;
    background: linear-gradient(${rgba('#FF41B3', 0)} 0%, #ff41b3 50%, transparent 100%);
  }

  @media (max-width: 768px) {
    left: 0;
    top: 12px;

    &:before {
      transform: translate(-50%, 0px);
      height: 50px;
    }
  }
`;

export const ItemContent = styled.div<{ isLeft?: boolean; isFirst?: boolean }>`
  position: relative;
  background: ${rgba('#150C1A', 0.7)};
  border: 1px solid #0f0912;
  padding: 20px 20px 20px 34px;
  width: 512px;

  ${({ isFirst }) =>
    isFirst &&
    css`
      border: 1px solid;
      border-image-slice: 1;
      border-image-source: linear-gradient(120deg, #743ad5, #d53a9d);
    `}

  clip-path: polygon(
    ${({ isLeft }) =>
    !isLeft
      ? '0% 0, 0 0%, 0 0%,  100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0% calc(100%)'
      : '0% 0, 0 0%,  0 0%, 100% 0, 100% 0, 100% 100%, 20px 100%, 0% calc(100% - 20px)'}
  );
  overflow: hidden;

  &:before {
    position: absolute;
    bottom: 10px;
    left: ${({ isLeft }) => (!isLeft ? 'calc(100% - 24px)' : 'calc(0% - 8px)')};
    content: '';
    width: 31px;
    height: 1px;
    transform: rotate(${({ isLeft }) => (!isLeft ? -45 : 45)}deg);
    background: ${({ isFirst }) => (isFirst ? '#d53a9d' : '#0f0912')};
  }

  @media (max-width: 1280px) {
    padding: 20px 20px 20px 30px;
    width: 326px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    width: 100%;
  }
`;

// export const ContentTitle = styled.div`
//   color: #ff41b3;
//   ${FONTS.chakra};
//   font-style: normal;
//   font-weight: bold;
//   font-size: 18px;
//   line-height: 100%;
//   margin-bottom: 10px;
// `;

export const ContentRow = styled.div`
  display: flex;
  align-items: center;
  font-family: BaiJamjuree;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 150%;
  margin-bottom: 6px;

  :last-child {
    margin-bottom: 0;
  }

  &:before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #379fff;
    margin-left: 4px;
    margin-right: 12px;
  }

  @media (max-width: 1280px) {
    font-size: 14px;
    grid-column-start: 1;
  }

  @media (max-width: 768px) {
    grid-column-start: 1;
  }
`;

export const ContentFlex = styled.div`
  display: flex;
  flex-direction: column;
  grid-template-columns: auto 1fr;
  grid-column-gap: 45px;
`;

export const BackgroundWrap = styled.div`
  position: absolute;
  bottom: 0;
  height: 758px;
  width: 100%;
  z-index: -1;

  @media (max-width: 768px) {
    height: 455px;
  }
`;
