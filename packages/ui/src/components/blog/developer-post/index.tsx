import React from 'react';
import Image from 'next/image';
import moment from 'moment';

import {
  GameCardWrapper,
  GameImageContainer,
  GameBlogPostInfo,
  DateWrapper,
  Date,
  GameBlogPostName,
  Description,
  EmptyTokenImageWrapper,
} from './style';

import IconEmptyItemImageSvg from '@game-trade/app/public/imgs/icon_empty_item_image.svg';
import { BlogDto } from '@game-trade/lib/codegen-types';

export const GameBlogPost = ({ post }: { post: BlogDto }) => {
  const { create_time, img_url, sub_title, title } = post;
  return (
    <GameCardWrapper>
      <GameImageContainer>
        {img_url ? (
          <Image
            loader={() => img_url}
            layout="fill"
            objectFit="cover"
            src={img_url}
            alt="game blog image"
            unoptimized={true}
            priority={true}
            // onError={() => setPicture(null)}
          />
        ) : (
          <EmptyTokenImageWrapper>
            <IconEmptyItemImageSvg />
          </EmptyTokenImageWrapper>
        )}
      </GameImageContainer>

      <GameBlogPostInfo>
        <div>
          <GameBlogPostName>{title}</GameBlogPostName>
          <Description>{sub_title}</Description>
        </div>

        <DateWrapper>
          <Date>{moment(Number(create_time)).format('ddd, MMMM D, YYYY')}</Date>
        </DateWrapper>
      </GameBlogPostInfo>
    </GameCardWrapper>
  );
};
