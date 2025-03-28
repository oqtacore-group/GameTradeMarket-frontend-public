import styled from 'styled-components';
import { borderGradientMenu, COLORS, FONTS } from '@game-trade/ui';

export const DropdownWrapper = styled.div<{ isOpen: boolean; optionsListWidth: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 200px;
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  padding: 10px;
  height: 48px;
  cursor: pointer;
  z-index: 10;
  * {
    cursor: pointer;
  }

  ${borderGradientMenu()};
`;

export const DropdownValue = styled.div`
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  z-index: 2;
  white-space: nowrap;
`;
export const DropdownIconWrapper = styled.div<{ isOpen: boolean }>`
  z-index: 2;
  margin-left: 10px;

  svg {
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)});
  }
`;

export const OptionsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
  width: 100%;
  min-width: fit-content;
  height: fit-content;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 100%;
  padding: 2rem;
  z-index: 2;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.blue}, ${COLORS.blue}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(to left, ${COLORS.pink}, ${COLORS.blue}),
    linear-gradient(to right, ${COLORS.blue}, ${COLORS.pink}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.pink} calc(50% - 1px),
      ${COLORS.pink} calc(50% + 0.5px),
      ${COLORS.black} calc(25%)
    ),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black});
  background-size: 1px 100%, 1px 100%, 100% 0, 100% 1px, 25px 25px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -25px, 0% 0%, -25px 100%, 100% 100%, -25px 0%, 0% -25px;
`;

export const OptionWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 20px;
  color: ${COLORS.white};
  ${FONTS.chakra};
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;

  &:hover {
    color: ${COLORS.pink};
  }

  :last-child {
    margin-bottom: 0;
  }
`;
