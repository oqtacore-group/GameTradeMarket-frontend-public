import React from 'react';
import { Tooltip } from '@mui/material';

import * as Icons from '../index';

import { Root, Header, ImageList, ImageItem, ImageComponent } from './style';

interface IIconsMap {
  [propName: string]: any;
  color?: string;
}

const createDataIcons = (IconsMap: IIconsMap): any => {
  return Object.keys(IconsMap).map((component) => ({
    component: IconsMap[component],
    name: component,
  }));
};

const IconComponent = ({ item, color }: { item: any; color?: string }) => {
  const onClick = () => {
    navigator.clipboard.writeText(item.name);
  };

  return (
    <ImageItem>
      <Tooltip title={item.name} placement="top">
        <ImageComponent onClick={onClick}>
          <item.component size={24} color={color} />
        </ImageComponent>
      </Tooltip>
    </ImageItem>
  );
};

const Preview = ({ iconMap, color }: IIconsMap) => {
  return (
    <ImageList>
      {createDataIcons(iconMap).map((item: any, i: number) => (
        <IconComponent key={i} item={item} color={color} />
      ))}
    </ImageList>
  );
};

const IconsPage = ({ color }: { color: string }) => {
  return (
    <Root>
      <Header>
        <h1>Icons</h1>
      </Header>

      <p>
        When hovering, the color changes and the name of the image is displayed which can be copied
      </p>
      <p>Standard import of an icon import '{'SvgClock'}' from '@vtb-lk/components'</p>
      <Preview iconMap={Icons} color={color} />
    </Root>
  );
};

export default IconsPage;
