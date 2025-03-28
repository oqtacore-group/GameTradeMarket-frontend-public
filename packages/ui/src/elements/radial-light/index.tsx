import React from 'react';
import { StyledLight } from './style';

export enum PositionLight {
  TopLeft = 'left top',
  TopRight = 'right top',
  Center = 'center',
  BottomLeft = 'left bottom',
  BottomRight = 'right bottom',
  Manual = 'manual',
}

export enum SizeLight {
  Small = '20%',
  Medium = '40%',
  Large = '50%',
}

interface IProps {
  color: 'pink' | 'purple';
  position: PositionLight;
  size?: SizeLight;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  opacity?: number;
}

export const RadialLight = React.forwardRef((props: IProps, ref: any) => {
  const {
    color,
    position,
    left,
    right,
    top,
    bottom,
    opacity = 0.5,
    size = SizeLight.Large,
  } = props;
  return (
    <StyledLight
      color={color}
      position={position}
      left={left}
      right={right}
      top={top}
      bottom={bottom}
      ref={ref}
      opacity={opacity}
      size={size}
    />
  );
});
