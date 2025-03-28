import React from 'react';
import { Story, Meta } from '@storybook/react';
import { COLORS } from '@game-trade/ui';

import IconsPage from './story';

export default {
  title: 'PALETTE/icons',
  component: IconsPage,
  parameters: {
    docs: {
      page: null,
    },
  },
} as Meta;

const Template: Story<{ color: string }> = (args) => {
  return <IconsPage color={args.color} />;
};

export const Primary = Template.bind({});
Primary.args = {
  color: COLORS.neutral55,
};

export const Colored = Template.bind({});
Colored.args = {
  color: COLORS.blue,
};
export const ResetColor = Template.bind({});
ResetColor.args = {
  color: '',
};
