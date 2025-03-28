import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;

  @media (max-width: 1600px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  button {
    width: 23rem;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    button {
      margin-top: 20px;
    }
  }

  @media (max-width: 900px) {
    margin-top: 15px;
    display: flex;
    flex-flow: column wrap;
  }
`;

export const Logo = styled.div`
  position: relative;
  display: block;
  min-width: 100%;
  min-height: 150px;
  margin-bottom: 30px;

  @media (max-width: 576px) {
    min-width: 150px;
  }
`;

export const BlocksWrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;

  background-repeat: no-repeat;
  background-image: linear-gradient(#0f0912, #0f0912), linear-gradient(#0f0912, #0f0912),
    linear-gradient(#0f0912, #0f0912), linear-gradient(#0f0912, #0f0912),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      #0f0912 calc(50% - 1px),
      #0f0912 calc(50% + 0.5px),
      #0f0912 calc(25% + 1px)
    ),
    linear-gradient(#0f0912, #0f0912), linear-gradient(#0f0912, #0f0912);
  background-size: 1px 100%, 1px 55%, 100% 1px, calc(100% - 20px) 1px, 21px 20px, 100% 100%,
    100% 100%;
  background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -20px 0, 0% -20px;
`;

export const BlockMain = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BlockRow = styled.div<{ isLastChild?: boolean }>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;

  & > div:last-child {
    color: #ff41b3;
    display: flex;
    align-items: center;
    text-align: right;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to left,
      ${COLORS.pink},
      ${COLORS.blue},
      ${COLORS.blue},
      ${COLORS.blue}
    );
  }

  &:last-child::after {
    display: none;
  }

  svg {
    margin-right: 5px;
    path {
      fill: ${COLORS.pink};
    }
  }

  ${({ isLastChild }) =>
    isLastChild &&
    css`
      &:after {
        display: none;
      }
    `}
`;

export const BlockFooter = styled.div`
  padding: 8px 10px 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContractsBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContractsTitleBlock = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  align-content: center;
  cursor: pointer;

  svg {
    margin-left: 10px;
    width: 12px;
    height: 7px;
    transform: rotate(${({ isOpen }) => (isOpen ? 180 : 0)}deg);
    path {
      fill: transparent;
      stroke: ${COLORS.blue};
    }
  }
`;

interface IContractsListProps {
  isContractsOpened: boolean;
}
export const BlockDropdown = styled.div<IContractsListProps>`
  overflow: hidden;
  margin: 10px;
  height ${(p) => (p.isContractsOpened ? 'auto' : 0)};

  & > ${BlockRow.selector}:first-child {
    padding-top: 0;
  }
`;

export const ExternalLinkWrapper = styled.div`
  display: flex;
  align-items: flex-start !important;
  svg {
    margin-right: 0;
    width: 23px;
    height: 23px;
    path {
      fill: ${COLORS.blue};
    }
  }
`;

export const ContractTitle = styled.div`
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    margin-left: 7px;
    path {
      fill: white;
    }
  }
`;

export const ContractWrapper = styled.div`
  position: relative;
  padding: 10px 0;
  a {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
  }

  &:hover {
    color: ${COLORS.pink};

    ${ExternalLinkWrapper}, ${ContractTitle} {
      svg {
        path {
          fill: ${COLORS.pink};
        }
      }
    }
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-image: linear-gradient(
      to left,
      ${COLORS.pink},
      ${COLORS.blue},
      ${COLORS.blue},
      ${COLORS.blue}
    );
  }

  &:last-child::after {
    display: none;
  }
`;

export const ContractDetail = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    flex-direction: column;

    button {
      margin-top: 5px;
    }
  }
`;

export const ContractWallet = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #a073a7;

  svg {
    width: 2em;
    height: 2em;
    path:first-child {
      fill: ${COLORS.pink};
    }
    path {
      fill: ${COLORS.white};
    }
  }

  & > div {
    display: inline-block;
    svg {
      display: none;
    }
    button {
      display: none;
    }
  }
`;
