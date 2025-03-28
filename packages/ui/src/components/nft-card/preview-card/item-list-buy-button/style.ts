import styled from 'styled-components';

export const COLORS = {
  pink: '#FF41B3',
};

export const ItemButtonBuy = styled.div<{ fontSize?: string }>`
  width: 50px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  font-size: ${({ fontSize }) => fontSize || '16px'};
  color: white;
  pointer-events: auto;

  background-repeat: no-repeat;
  background-image: linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}), linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}),
    linear-gradient(
      to top left,
      rgba(0, 0, 0, 0) calc(50% - 1px),
      rgba(0, 0, 0, 0) calc(50% - 1px),
      ${COLORS.pink} calc(50%),
      ${COLORS.pink} calc(50% + 0.5px),
      ${COLORS.pink} calc(25% + 1px)
    ),
    linear-gradient(${COLORS.pink}, ${COLORS.pink}), linear-gradient(${COLORS.pink}, ${COLORS.pink});
  background-size: 1px 100%, 1px 55%, 100% 1px, calc(100% - 5px) 1px, 5px 5px, 100% 100%, 100% 100%;
  background-position: 0 0, 100% 0, 0 0, 0 100%, 100% 100%, -5px 0, 0% -5px;
  z-index: 2;
  transition: 0.5ms;

  &:hover {
    background-image: linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(
        to left top,
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgba(0, 0, 0, 0) calc(50% - 1px),
        rgb(249, 138, 205) calc(50%),
        rgb(249, 138, 205) calc(50% + 0.5px),
        rgb(249, 138, 205) calc(25% + 1px)
      ),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205)),
      linear-gradient(rgb(249, 138, 205), rgb(249, 138, 205));
  }

  @media (max-width: 786px) {
    margin-right: 15px;
  }
`;
