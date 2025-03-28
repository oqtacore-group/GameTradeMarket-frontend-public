import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import styled from 'styled-components';

import { Button } from '../../forms/button';

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 200px;
`;

const LoaderTextWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LoaderTextStyled = styled.div`
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  padding-right: 10px;
  cursor: pointer;
`;

const ReportLoader = styled.div`
  position: relative;
  padding: 2px;
`;

import { IProps } from './interfaces';

import { Loader, ALIGN, SIZE } from './index';

export default {
  title: 'COMPONENTS/Loader',
  component: Loader,
} as Meta;

const Template: Story<IProps> = (args) => {
  return (
    <LoaderWrapper>
      <Loader {...args} />
    </LoaderWrapper>
  );
};

const TemplateLoaderButton: Story<IProps> = (args) => {
  const [isLoading, setLoading] = useState<any>();

  const handleToggleLoading = (option: any) => {
    setLoading(!isLoading);
  };

  return (
    <>
      <Button dimension="l" onClick={handleToggleLoading} style={{ width: '250px' }}>
        {isLoading ? (
          <Loader size={SIZE.MICRO} position={ALIGN.CENTER} {...args} />
        ) : (
          'Toggle loader'
        )}
      </Button>
    </>
  );
};

const TemplateLoaderText: Story<IProps> = (args) => {
  const [isLoading, setLoading] = useState<any>();

  const handleToggleLoading = (option: any) => {
    setLoading(!isLoading);
  };

  return (
    <>
      <LoaderTextWrapper>
        <LoaderTextStyled onClick={handleToggleLoading}>
          {isLoading ? 'Generating report...' : 'Click me'}
        </LoaderTextStyled>
        {isLoading && (
          <ReportLoader>
            <Loader size={SIZE.MICRO} position={ALIGN.CENTER} {...args} />
          </ReportLoader>
        )}
      </LoaderTextWrapper>
    </>
  );
};

export const LoaderButton = TemplateLoaderButton.bind({});
LoaderButton.args = {
  size: SIZE.MINI,
  position: ALIGN.CENTER,
};

export const LoaderText = TemplateLoaderText.bind({});
LoaderText.args = {
  size: SIZE.MICRO,
  position: ALIGN.CENTER,
};

export const Primary = Template.bind({});
Primary.args = {
  size: SIZE.BASE,
  position: ALIGN.CENTER,
};
