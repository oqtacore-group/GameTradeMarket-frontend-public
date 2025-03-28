import React, { useCallback } from 'react';
import Image from 'next/image';
import { SvgArrowDown } from '@game-trade/icons';

import { Container, AvatarImage, WrapperArrow, WrapperDefaultAvatar } from './style';
import PersonSvg from './avatar-person.svg';

import { useMenuContext } from '@/core-layout/menu/provider';

export const Avatar = ({
  imageUrl,
  menu = false,
}: {
  imageUrl: string | null | undefined;
  menu?: boolean;
}) => {
  const { setOpenMenu } = useMenuContext();
  const handleOpen = useCallback(() => {
    if (!menu) setOpenMenu(true);
  }, [menu]);
  return (
    <Container onClick={handleOpen}>
      <AvatarImage>
        {imageUrl && (
          <Image
            loader={() => imageUrl}
            src={imageUrl}
            quality={65}
            layout="fill"
            objectFit="cover"
            alt=""
            unoptimized={true}
          />
        )}
        {!imageUrl && (
          <WrapperDefaultAvatar>
            <PersonSvg />
          </WrapperDefaultAvatar>
        )}
      </AvatarImage>

      {!menu && (
        <WrapperArrow>
          <SvgArrowDown size={14} />
        </WrapperArrow>
      )}
    </Container>
  );
};
