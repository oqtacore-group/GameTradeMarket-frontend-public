import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
// import rehypeSanitize from 'rehype-sanitize'; ++
// import rehypeStringify from 'rehype-stringify'; ++
import rehypeReact from 'rehype-react';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkEmbedder from '@remark-embedder/core';

import React, {
  useEffect,
  useState,
  createElement,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { Ul, H2, Img, Paragraph } from './style';
import { MDLink } from './link';

const IframeTransformer = {
  name: 'embedly iframe',
  // shouldTransform can also be async
  shouldTransform(url: string) {
    const { host } = new URL(url);

    return ['cdn.embedly.com', 'https://cdn.embedly.com/'].includes(host);
  },
  // getHTML can also be async
  getHTML(url: string) {
    const iframeUrl = url.replace('/s/', '/embed/');
    const twiiter = /twitter/g.test(url);
    const soundcloud = /soundcloud/g.test(url);

    const style = twiiter
      ? 'width: 100%; min-height: 600px;'
      : soundcloud
      ? 'width: 100%; height: 200px;'
      : 'width: 100%; height: 350px;';

    return `<iframe
              style="${style} margin-top: 15px"
              allowTransparency="true"
              scrolling="no"
              frameBorder="0"
              src="${iframeUrl}"
            />`;
  },
};

export const Markdown = ({ text }: { text: string }) => {
  const [content, setContent] =
    useState<ReactElement<unknown, string | JSXElementConstructor<any>>>();
  // const [content, setContent] = useState<any>();

  useEffect(() => {
    unified()
      .use(remarkEmbedder, {
        transformers: [IframeTransformer],
      })
      .use(remarkBreaks)
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkUnwrapImages)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeReact, {
        createElement: createElement,
        components: {
          a: MDLink,
          p: Paragraph,
          ul: Ul,
          img: Img,
          h1: H2,
        },
      })
      .use(rehypeRaw)
      // .use(rehypeSanitize)
      // .use(rehypeStringify, { allowDangerousHtml: true })
      .process(text)
      .then((file) => {
        setContent(file?.result);
      });
  }, [text]);

  if (!content) return <></>;
  return content;
};
