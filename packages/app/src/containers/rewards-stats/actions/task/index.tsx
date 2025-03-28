import { Mission, Points, Task } from '../style';
import { SvgDiamond, SvgTwitter } from '@game-trade/icons';
import React from 'react';

export const TaskItem = () => {
  return (
    <Task>
      <Mission>
        <SvgTwitter />
        Link Twitter to your profile
      </Mission>
      <Points>
        1/1 <SvgDiamond />
      </Points>
    </Task>
  );
};
