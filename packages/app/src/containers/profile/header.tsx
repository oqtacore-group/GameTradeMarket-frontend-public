import React, { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@game-trade/ui';
import { SvgCopy, SvgAvatarPerson } from '@game-trade/icons';
import { routes } from '@game-trade/lib';
import { useSendFriendRequestMutation } from '@game-trade/lib/src/codegen-types';

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
  ButtonsList,
  // ButtonWrapper,
  // ButtonContent,
  NameWrapper,
  HeadFlex,
  WrapperDefaultAvatar,
} from './style';
import { getAvatarSize } from './utils';
import { useTranslation } from 'next-i18next';

interface IProps {
  isMe: boolean;
  imageUrl?: string | null;
  email?: string | null;
  userId?: string | null;
  nickName?: string;
  isOnline?: boolean | null;
  isMyFriend?: boolean;
  checkIsMyFriendLoading?: boolean;
  isFriendRequestSent?: boolean;
  checkIsFriendRequestSentLoading?: boolean;
}

export const Header = ({
  imageUrl,
  email,
  nickName,
  isOnline,
  userId,
  isMe,
  isMyFriend,
  checkIsMyFriendLoading,
  isFriendRequestSent,
}: IProps) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'translation.header' });
  const [sendRequest, setSendRequest] = useState(isFriendRequestSent);
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1280px)');

  useEffect(() => {
    setSendRequest(isFriendRequestSent);
  }, [isFriendRequestSent]);

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

  const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleSendFriendRequest = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    await sendFriendRequest({
      variables: {
        recipient: e.currentTarget.dataset.userId!,
      },
    });
    setSendRequest(true);
  }, []);

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
                src={imageUrl}
                objectFit="cover"
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
        {nickName && (
          <LoginRow>
            <NameWrapper>
              <span>{nickName}</span>
            </NameWrapper>

            {!isMe && !checkIsMyFriendLoading && (
              <ButtonsList>
                {isMyFriend ? (
                  <Link href={routes.chat} passHref={true}>
                    <Button appearance="secondary">{t('sendMessage')}</Button>
                  </Link>
                ) : (
                  <>
                    {sendRequest ? (
                      <Button appearance="ghost" style={{ cursor: 'default' }}>
                        {t('request')}
                      </Button>
                    ) : (
                      <Button
                        appearance="secondary"
                        onClick={handleSendFriendRequest}
                        data-user-id={userId}>
                        {t('add')}
                      </Button>
                    )}
                  </>
                )}
              </ButtonsList>
            )}
          </LoginRow>
        )}

        <HeadFlex>
          <div>
            {/* TODO here instead of wallet email? */}
            {email && (
              <WalletRow>
                {email}
                <CopyBox onClick={onCopy}>
                  <SvgCopy />
                </CopyBox>
              </WalletRow>
            )}
            {isOnline && <StatusRow>{t('online')}</StatusRow>}
          </div>
        </HeadFlex>
      </HeadContent>
    </>
  );
};
