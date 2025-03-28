import { WrapperTimeLine, Day } from './style';

export const TimeLine = () => {
  return (
    <WrapperTimeLine>
      <Day active={true}>Day 1 visit</Day>
      <Day active={false}>Day 2 visit</Day>
      <Day active={false}>Day 3 visit</Day>
    </WrapperTimeLine>
  );
};
