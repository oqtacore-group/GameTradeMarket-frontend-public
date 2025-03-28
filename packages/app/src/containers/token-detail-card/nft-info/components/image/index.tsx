import React, { useEffect, useState } from 'react';
import { ImageComponent } from '@game-trade/ui';
import * as Style from './style';

export const Image = ({
  image: _IMAGE,
  name: _NAME,
}: {
  image?: string | null;
  name?: string | null;
}) => {
  const [picture, setPicture] = useState<string | undefined | null>(_IMAGE);
  useEffect(() => {
    setPicture(_IMAGE);
  }, [_IMAGE]);
  return (
    <Style.Block>
      <ImageComponent
        link={picture}
        layout="fill"
        objectFit="contain"
        LCP={false}
        alt={_NAME}
        setImage={setPicture}
        styleWrapper={Style.Wrapper}
      />
    </Style.Block>
  );
};
