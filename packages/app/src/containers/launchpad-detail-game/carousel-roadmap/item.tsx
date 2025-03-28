import { ItemStyled, Quarter, Date, Header, List, ListItem, Task, InProgress } from './style';
import { IRoadmapItem } from './index';
import { SvgSuccess } from '@game-trade/icons';

export const ItemCarouselRoadmap = ({ item }: { item: IRoadmapItem }) => {
  return (
    <ItemStyled>
      <Header>
        <Quarter>{item.quarter}</Quarter>
        <Date>{item.date}</Date>
      </Header>
      <List>
        {item.list.map((task, index) => {
          return (
            <ListItem key={task.value + index}>
              {task.completed ? <SvgSuccess /> : <InProgress />}
              <Task>{task.value}</Task>
            </ListItem>
          );
        })}
      </List>
    </ItemStyled>
  );
};
