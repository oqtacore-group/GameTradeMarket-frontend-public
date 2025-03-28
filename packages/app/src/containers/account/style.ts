import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { COLORS, FONTS } from '@game-trade/ui';
import { shadowBorderEdgeGradient } from '@game-trade/ui/src/styles/mixins';

export const ModalContent = styled.div`
  padding: 25px;
  ${shadowBorderEdgeGradient()};
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const Errors = styled.div`
  margin: 10px 0;
  padding: 10px;
  color: red;
  font-size: 14px;
`;

export const TitleTabPage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 19px;
  span {
    ${FONTS.chakra};
    font-weight: 500;
    font-size: 36px;
    line-height: 47px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-grow: 1;
  min-height: 600px;

  @media (max-width: 767px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const ColumnMenu = styled.div`
  width: 303px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-right: 1px solid ${COLORS.black90};

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ColumnMenuItem = styled.div<{ isActive?: boolean }>`
  height: 67px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  border-top: 1px solid ${COLORS.black90};
  ${FONTS.baiJamjuree};
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  background-color: ${rgba(COLORS.blue90, 0.4)};

  :hover {
    color: ${COLORS.pink};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      cursor: default;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: ${COLORS.pink};
    `}
`;

export const ColumnMenuHeader = styled.div`
  height: 67px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  ${FONTS.chakra};
  font-weight: 600;
  font-size: 18px;
  line-height: 23px;
  background-color: ${COLORS.blue90};
`;

export const Content = styled.div`
  width: 100%;
  position: relative;
  padding: 45px;
  flex-grow: 1;

  @media (max-width: 767px) {
    padding: 10px;
  }
`;
