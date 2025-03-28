import styled from 'styled-components';

import { COLORS, FONTS } from '../../styles';

export const AccordionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${COLORS.black};
`;

export const AccordionItemHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  padding: 16px 10px 16px 20px;

  @media (max-width: 768px) {
    padding: 16px 40px;
  }

  @media (max-width: 320px) {
    padding: 16px 20px;
  }
`;

export const AccordionItemTitle = styled.div`
  color: ${COLORS.pink};
  ${FONTS.chakra};
  font-size: 18px;
  line-height: 23px;
`;

export const AccordionItemIconWrapper = styled.div<{ isExpand: boolean }>`
  display: flex;
  height: 23px;
  align-items: center;
  padding-left: 20px;

  svg {
    width: 12px;
    height: 7px;
    transform: rotate(${({ isExpand }) => (isExpand ? 180 : 0)}deg);
  }
`;

export const AccordionItemContent = styled.div`
  color: ${COLORS.white};
  ${FONTS.chakra};
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 29px;
  padding: 24px 10px 40px 20px;

  @media (max-width: 768px) {
    padding: 24px 40px 20px 40px;
  }

  @media (max-width: 320px) {
    padding: 24px 20px 20px 20px;
  }

  & p {
    margin: 29px 0;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  & li {
    margin: 14px 0;

    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  & ol {
    padding-left: 20px;
    margin: 0;
  }

  & ul {
    padding-left: 10px;
    margin: 0;

    li {
      display: flex;
      align-items: flex-start;

      &::before {
        display: block;
        content: ' ';
        min-width: 3px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: ${COLORS.white};
        margin-top: 0.8em;
        margin-right: 10px;
      }
    }
  }

  @media (max-width: 320px) {
    font-size: 14px;
    line-height: 25px;
  }
`;
