import styled, { css } from 'styled-components';
import { COLORS } from '@game-trade/ui';

export const WrapperActions = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 60%;
  margin-left: 20px;

  @media (max-width: 1200px) {
    margin: 50px;
  }

  @media (max-width: 768px) {
    margin: 20px;
  }
`;

export const TasksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

export const Headline = styled.h3`
  font-size: 24px;
  margin-bottom: 10px;
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

export const Task = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid ${COLORS.grayPurple};
  background-color: rgba(21, 12, 26, 0.7);
  cursor: pointer;
  transition: 0.8ms;
`;

export const Required = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1px 0;

  ${Task} {
    width: calc(50% - 10px);
  }
`;

export const Additional = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 1px 0;

  ${Task} {
    width: 100%;
  }
`;
