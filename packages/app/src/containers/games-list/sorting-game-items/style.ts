import styled from 'styled-components';
import { COLORS, FONTS } from '@game-trade/ui';
import { rgba } from 'polished';

export const SortingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 15px 100px 15px 20px;
  border-bottom: 1px solid ${COLORS.black};
  border-top: 1px solid ${COLORS.black};

  @media (max-width: 576px) {
    padding: 0;
  }
`;

export const ControlsWrapper = styled.div`
  display: flex;
  //grid-template-columns: 1fr 80px;
  //width: 250px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: auto;
  }

  @media (max-width: 576px) {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

export const ControlItemWrapper = styled.div<{ isHide?: boolean }>`
  display: ${({ isHide }) => (isHide ? 'none' : 'block')};

  @media (max-width: 576px) {
    border-right: 1px solid ${COLORS.black};

    :last-child {
      border-right: 0;
    }
  }
`;

export const SearchFieldStyled = styled.div`
  // background-color: ${rgba(COLORS.black90, 0.7)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  margin-right: 60px;
  //border-bottom: 1px solid ${COLORS.black90};
  border: 1px solid ${COLORS.black};
  div {
    border: 0 none !important;
    padding-left: 0 !important;
    background-color: transparent !important;
  }
  input {
    background-color: transparent !important;
    ${FONTS.chakra};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    height: 100%;
    border: 0 none !important;
    padding-left: 0 !important;
  }
`;
