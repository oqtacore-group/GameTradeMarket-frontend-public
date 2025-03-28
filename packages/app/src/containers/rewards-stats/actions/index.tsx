import { WrapperActions, Required, Headline, Additional, TasksWrapper } from './style';
import { TaskItem } from './task';

export const Actions = () => {
  return (
    <WrapperActions>
      <Required>
        <Headline>Required actions</Headline>
        <TasksWrapper>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </TasksWrapper>
      </Required>
      <Additional>
        <Headline>Additional actions:</Headline>
        <TasksWrapper>
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
          <TaskItem />
        </TasksWrapper>
      </Additional>
    </WrapperActions>
  );
};
