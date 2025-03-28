import React from 'react';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '@game-trade/config/next/i18next';

const ChatContainer = dynamic(() => import('@/containers/chat'), { ssr: false });

export async function getStaticProps(context: any) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale ?? context.defaultLocale,
        ['chatPage'],
        nextI18NextConfig
      )),
    },
  };
}

const Chat: NextPage = () => <ChatContainer />;

export default Chat;
