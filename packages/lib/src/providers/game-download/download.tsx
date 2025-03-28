import React from 'react';
import { ModalHeader, ModalContent, Title, DonwloadLinksWrapper, DownloadLink } from './style';
import Link from 'next/link';
import { SvgWindows, SvgIos, SvgMacOs, SvgWeb, SvgAndroid } from '@game-trade/icons';
import { useGameDownloadsContext } from '@game-trade/lib';
import { APP_KIND, TAppLink } from '@game-trade/app/src/containers/game-detail-card/interfaces';

export const Download = () => {
  const { tempData } = useGameDownloadsContext();
  const { app_links } = tempData;

  const getIconDownload = (type: string) => {
    switch (type) {
      case APP_KIND.Ios:
        return <SvgIos />;
      case APP_KIND.Mac:
        return <SvgMacOs />;
      case APP_KIND.Android:
        return <SvgAndroid />;
      case APP_KIND.Windows:
        return <SvgWindows />;
      case APP_KIND.Web:
        return <SvgWeb />;
      default:
        return <SvgWeb />;
    }
  };

  return (
    <ModalContent>
      <ModalHeader>
        <Title>Play it on</Title>
      </ModalHeader>
      <DonwloadLinksWrapper>
        {app_links.map((item: TAppLink) => {
          return (
            <DownloadLink key={item.link}>
              <Link href={item.link} passHref={true}>
                <a target="_blank" rel="noreferrer">
                  {getIconDownload(item.type)}
                </a>
              </Link>
            </DownloadLink>
          );
        })}
      </DonwloadLinksWrapper>
    </ModalContent>
  );
};
