import React, { ReactNode } from 'react';

import { TabsBlock, TabContainer } from './style';

interface IProps {
  previewComponent: ReactNode;
}

export const PreviewComponent = ({ previewComponent }: IProps) => {
  return (
    <TabsBlock>
      <TabContainer>{previewComponent}</TabContainer>
    </TabsBlock>
  );
};
