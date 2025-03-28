import {
  AboutTitle,
  AboutWrapper,
  LoaderWrapper,
  LinkGameSite,
  SocialNetworks,
  GameDescription,
} from './style';
import React, { useEffect, useState } from 'react';
import { SocialLink } from '@game-trade/lib/codegen-types';
import Link from 'next/link';
import { SocialNetworkIconComponent } from '@game-trade/ui/modifiers/get-social-network-icon';
import { useTranslation } from 'next-i18next';
import { ALIGN, Loader, SIZE } from '@game-trade/ui';
import { GetDescriptionQuery, getDescription } from '@game-trade/lib';

interface IProps {
  gameCode?: string | null;
  social_links?: SocialLink[];
  external_url?: string | null;
  descriptionDefault?: string | null;
}

export const AboutItem = ({ gameCode, descriptionDefault, social_links, external_url }: IProps) => {
  const { t } = useTranslation('gamePage', { keyPrefix: 'translation' });

  const [loadingDescription, setLoadingDescription] = useState(false);
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    if (gameCode) {
      getDescription(gameCode, GetDescriptionQuery.getGameCard)
        .then((r: string) => {
          setDescription(r);
          setLoadingDescription(true);
        })
        .catch((e) => {
          console.log('response', e.message);
          setLoadingDescription(true);
          setDescription(undefined);
        });
    }
  }, [gameCode]);

  if (!external_url && !gameCode && !social_links?.length) return <></>;
  return (
    <AboutWrapper>
      <AboutTitle>{t('about')}</AboutTitle>
      {!loadingDescription && (
        <LoaderWrapper>
          <Loader size={SIZE.BASE} position={ALIGN.CENTER} />
        </LoaderWrapper>
      )}
      {loadingDescription && description && <GameDescription>{description}</GameDescription>}
      {loadingDescription && !description && descriptionDefault && (
        <GameDescription>{descriptionDefault}</GameDescription>
      )}

      <LinkGameSite>
        <Link href={`${external_url}`} passHref={true}>
          <a target="_blank" rel="noreferrer">
            {external_url}
          </a>
        </Link>
      </LinkGameSite>

      {social_links && (
        <SocialNetworks>
          {(social_links as SocialLink[]).map((item) => {
            return (
              <SocialNetworkIconComponent
                key={Math.random() + item.type}
                network={item.type}
                link={item.link}
              />
            );
          })}
        </SocialNetworks>
      )}
    </AboutWrapper>
  );
};
