import { PositionLight, RadialLight, SizeLight } from '@game-trade/ui/elements/radial-light';
import React from 'react';

export const LightsWrapper = ({ pathname }: { pathname: string }) => {
  // ''
  return (
    <>
      <RadialLight
        color={pathname === '/' ? 'pink' : 'purple'}
        position={PositionLight.TopRight}
        size={pathname === '/' ? SizeLight.Small : SizeLight.Medium}
        opacity={0.6}
      />
      {pathname === '/' && (
        <RadialLight
          color={'purple'}
          position={PositionLight.TopLeft}
          size={SizeLight.Small}
          opacity={0.6}
        />
      )}
      {pathname === '/' && (
        <RadialLight
          color={'purple'}
          position={PositionLight.Center}
          size={SizeLight.Medium}
          opacity={0.3}
        />
      )}
      <RadialLight
        color={'pink'}
        position={PositionLight.BottomLeft}
        opacity={0.1}
        size={SizeLight.Medium}
      />
      <RadialLight
        color={'purple'}
        position={PositionLight.BottomRight}
        opacity={0.1}
        size={SizeLight.Medium}
      />
    </>
  );
};
