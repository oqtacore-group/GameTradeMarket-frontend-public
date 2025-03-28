import React from 'react';
import {
  ModalHeader,
  ModalFooter,
  ModalContent,
  Title,
  SubTitle,
  // WrapperImage,
  Description,
  Date,
  // Published,
  NotPublished,
  // Author,
} from './style';
// import Index from 'next/image';
// import { EmptyTokenImageWrapper } from '@game-trade/ui/developer-post/style';
// import IconEmptyItemImageSvg from '@game-trade/app/public/imgs/icon_empty_item_image.svg';
import { useGameBlogPostsContext } from '@game-trade/lib';
import moment from 'moment';
import { Markdown } from '@game-trade/ui/elements/markdown';

export const DetailPostId = () => {
  const { tempData } = useGameBlogPostsContext();
  const { sub_title, title, is_published, create_time, description } = tempData.post;
  // img_url,
  return (
    <ModalContent>
      {is_published ? (
        <>
          <ModalHeader>
            <Title>{title}</Title>
            <SubTitle>{sub_title}</SubTitle>
          </ModalHeader>
          {/*<WrapperImage>*/}
          {/*  {img_url ? (*/}
          {/*    <Index*/}
          {/*      loader={() => img_url}*/}
          {/*      layout="fill"*/}
          {/*      objectFit="cover"*/}
          {/*      src={img_url}*/}
          {/*      alt=""*/}
          {/*      unoptimized={true}*/}
          {/*      priority={true}*/}
          {/*      // onError={() => setPicture(null)}*/}
          {/*    />*/}
          {/*  ) : (*/}
          {/*    <EmptyTokenImageWrapper>*/}
          {/*      <IconEmptyItemImageSvg />*/}
          {/*    </EmptyTokenImageWrapper>*/}
          {/*  )}*/}
          {/*</WrapperImage>*/}
          <Description>
            <Markdown text={description} />
          </Description>
          <ModalFooter>
            <Date>{moment(Number(create_time)).format('ddd, MMMM D, YYYY')}</Date>
            {/*<Published>*/}
            {/*  Published by: <Author>1redrooster2</Author>*/}
            {/*</Published>*/}
          </ModalFooter>
        </>
      ) : (
        <NotPublished>This post has not been published yet</NotPublished>
      )}
    </ModalContent>
  );
};
