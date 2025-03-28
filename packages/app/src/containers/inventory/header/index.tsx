import React from 'react';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { SvgCopy, SvgAvatarPerson } from '@game-trade/icons';
import BgMyAcc from '@root/public/imgs/bg_my_acc.webp';

import {
  HeadBg,
  HeadImage,
  HeadImageBg,
  HeadContent,
  LoginRow,
  WalletRow,
  CopyBox,
  StatusRow,
  WrapperDefaultAvatar,
} from './style';
import { getAvatarSize } from './utils';

interface IProps {
  imageUrl?: string | null;
  email?: string | null;
  nickName?: string;
  isOnline?: boolean | null;
}

export const Header = ({ imageUrl, email, nickName, isOnline }: IProps) => {
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1280px)');

  const onCopy = () => {
    const textarea = document.createElement('textarea');
    textarea.textContent = email as string;
    textarea.style.position = 'fixed';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand('copy');
    } catch (ex) {
      console.warn('Copy to clipboard failed.', ex);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <>
      <HeadBg>
        <Image layout="fill" objectFit="cover" src={BgMyAcc} alt="background my-acc" />
        <HeadImageBg>
          <HeadImage>
            {imageUrl ? (
              <Image
                loader={imageUrl ? () => imageUrl : undefined}
                layout={'intrinsic'}
                objectFit="cover"
                src={imageUrl}
                width={getAvatarSize(isMobile, isTablet)}
                height={getAvatarSize(isMobile, isTablet)}
                alt=""
              />
            ) : (
              <WrapperDefaultAvatar>
                <SvgAvatarPerson
                  width={`${getAvatarSize(isMobile, isTablet)}px`}
                  height={`${getAvatarSize(isMobile, isTablet)}px`}
                />
              </WrapperDefaultAvatar>
            )}
          </HeadImage>
        </HeadImageBg>
      </HeadBg>
      <HeadContent>
        {nickName && <LoginRow>{nickName}</LoginRow>}
        {/* TODO here instead of wallet email? */}
        {email && (
          <WalletRow>
            {email}
            <CopyBox onClick={onCopy}>
              <SvgCopy />
            </CopyBox>
          </WalletRow>
        )}
        {isOnline && <StatusRow>online</StatusRow>}
      </HeadContent>
    </>
  );
};
