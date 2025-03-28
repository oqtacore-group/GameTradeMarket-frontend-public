import styled from 'styled-components';
import { COLORS } from '../../../styles';

export const SelectedFilterItemIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: ${COLORS.gray};
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 0;
  font-size: 1rem;

  svg {
    cursor: pointer;
    fill: ${COLORS.gray};
  }
`;
export const SelectedFilterItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  color: ${COLORS.grayPurple};
  padding: 7px 3rem;
  user-select: none;

  &:hover {
    color: ${COLORS.pink};
    ${SelectedFilterItemIconWrapper} {
      svg {
        fill: ${COLORS.pink};
      }
    }
  }

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(${COLORS.black}, ${COLORS.black}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.black} calc(50% - 1px),
      ${COLORS.black} calc(50% + 0.5px),
      transparent calc(25% + 1px)
    ),
    linear-gradient(transparent, transparent), linear-gradient(transparent, transparent);
  background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 15px 15px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% -15px, 0% 0%, -15px 100%, 100% 100%, -15px 0, 0 -15px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    background-repeat: no-repeat;
    background-image: linear-gradient(transparent, transparent),
      linear-gradient(transparent, transparent), linear-gradient(transparent, transparent),
      linear-gradient(transparent, transparent),
      linear-gradient(
        to top left,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        transparent calc(50% - 1px),
        transparent calc(50% + 0.5px),
        #201527 calc(25% + 1px)
      ),
      linear-gradient(#201527, #201527), linear-gradient(#201527, #201527);
    background-size: 1px 100%, 1px 100%, 100% 1px, 100% 1px, 15px 15px, 100% 100%, 100% 100%;
    background-position: 0 0, 100% -15px, 0% 0%, -15px 100%, 100% 100%, -15px 0, 0 -15px;
  }
`;
export const SelectedFilterItemLabel = styled.div`
  font-family: ChakraPetch;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.5px;
  cursor: pointer;
`;

export const ResetAllFiltersButton = styled(SelectedFilterItemWrapper)`
  position: absolute;
  top: 0;
  right: 0;

  @media (max-width: 576px) {
    position: static;
    margin-left: unset;
  }
`;

export const SelectedFiltersWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  padding-right: 160px;
  flex-wrap: wrap;

  ${SelectedFilterItemWrapper} {
    margin-right: 20px;
    margin-top: 10px;
    align-items: center;
    white-space: nowrap;
  }

  @media (max-width: 576px) {
    ${SelectedFilterItemWrapper} {
      margin-right: 0;
      margin-bottom: 0;
      white-space: unset;
    }

    margin-top: unset;
    flex-wrap: unset;
    padding-right: unset;
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr;
  }
`;
