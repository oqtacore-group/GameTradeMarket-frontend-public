import Link from 'next/link';
import moment from 'moment';
import { MarketBlog } from '@game-trade/lib/codegen-types';
import { Markdown } from '../../../elements/markdown';
import { ImageComponent } from '../../../modifiers/get-image-optimization';
import { BlogCardWrapper, Wrapper, MetaData, Date, Content, Title, Description } from './style';

interface IProps {
  post?: MarketBlog;
  animation?: boolean;
}

export const BlogCard = ({ post, animation }: IProps) => {
  return (
    <Wrapper animation={animation}>
      <Link href={post?.external_url as string} passHref={true}>
        <a href={post?.external_url} target={'_blank'} rel="noreferrer">
          <BlogCardWrapper>
            <ImageComponent
              link={post?.img_url}
              alt={post?.title}
              LCP={false}
              styleWrapper={{
                height: '250px',
                margin: '2px',
              }}
            />
            <Content>
              <MetaData>
                {post?.create_time && (
                  <Date>{moment(post?.create_time).format('ddd, MMMM D, YYYY')}</Date>
                )}
                {/*|<Comments>{post.comments} comment</Comments>*/}
              </MetaData>
              <Title>{post?.title}</Title>
              {post?.description && (
                <Description>
                  <Markdown text={post?.description} />
                </Description>
              )}
            </Content>
          </BlogCardWrapper>
        </a>
      </Link>
    </Wrapper>
  );
};
