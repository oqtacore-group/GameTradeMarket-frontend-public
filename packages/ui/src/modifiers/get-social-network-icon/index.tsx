import React from 'react';
import Link from 'next/link';
import {
  SvgDiscord,
  SvgFacebook,
  SvgGithub,
  SvgInstagram,
  SvgMail,
  SvgMedium,
  SvgReddit,
  SvgTelegram,
  SvgTiktok,
  SvgTwitter,
  SvgYoutube,
} from '@game-trade/icons';
import { Item } from './style';

export enum SOCIAL_NETWORKS {
  Discord = 'DISCORD',
  Twitter = 'TWITTER',
  Web = 'WEB',
  Instagram = 'INSTAGRAM',
  Youtube = 'YOUTUBE',
  Telegram = 'TELEGRAM',
  Mail = 'MAIL',
  Reddit = 'REDDIT',
  Github = 'GITHUB',
  Facebook = 'FACEBOOK',
  TikTok = 'TIKTOK',
  Medium = 'MEDIUM',
}

export const SocialNetworkIconComponent = ({
  network,
  link,
}: {
  network: string;
  link: string;
}) => {
  const getIcon = (code: string) => {
    switch (code.toUpperCase()) {
      case SOCIAL_NETWORKS.Twitter:
        return <SvgTwitter />;
      case SOCIAL_NETWORKS.Discord:
        return <SvgDiscord />;
      case SOCIAL_NETWORKS.Telegram:
        return <SvgTelegram />;
      case SOCIAL_NETWORKS.Youtube:
        return <SvgYoutube />;
      case SOCIAL_NETWORKS.Instagram:
        return <SvgInstagram />;
      case SOCIAL_NETWORKS.Mail:
        return <SvgMail />;
      case SOCIAL_NETWORKS.Reddit:
        return <SvgReddit />;
      case SOCIAL_NETWORKS.Github:
        return <SvgGithub />;
      case SOCIAL_NETWORKS.Facebook:
        return <SvgFacebook />;
      case SOCIAL_NETWORKS.TikTok:
        return <SvgTiktok />;
      case SOCIAL_NETWORKS.Medium:
        return <SvgMedium />;
      default:
        return <></>;
    }
  };

  return (
    <Link key={network} href={{ pathname: link }} passHref={true}>
      <Item target="_blank" rel="noreferrer">
        {getIcon(network)}
      </Item>
    </Link>
  );
};
