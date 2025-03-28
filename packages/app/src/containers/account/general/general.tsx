import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SvgChoseLanguage, SvgCloseOutline, SvgPlus, SvgUploadCloud } from '@game-trade/icons';
import { ControlledField, ALIGN, Loader, SIZE, Button, Input, COLORS } from '@game-trade/ui';
import {
  SocialParams,
  User,
  useUserAccountInfoLazyQuery,
  useUserMutation,
  UserAccountInfoDocument,
  SocialKind,
} from '@game-trade/lib/src/codegen-types';
import { useAuthContext } from '@game-trade/lib';

import { FIELD_FORM, IGeneralFormProps } from '../interfaces';
import { TitleTabPage } from '../style';

import {
  GeneralForm,
  FormBlock,
  FormBlockTitle,
  FormBlockContent,
  Row,
  CustomUrl,
  AddLinks,
  RemoveLinks,
  Plus,
  LinkBlock,
  Select,
  UserImageContainer,
  UploadImage,
  UserImage,
  Upload,
  RichEditorWrapper,
  SocialTitle,
  SocialValue,
} from './style';

import SvgAvatar from '@/core-layout/avatar/avatar-person.svg';
import {
  changeLanguageGlobal,
  ChoseLanguage,
} from '@game-trade/ui/components/languages/chose-language';
import { useTranslation } from 'next-i18next';
const LAMBDA_URL = 'https://rp2wlrh7y3ylivpddqgjn4qimu0ouxyn.lambda-url.us-east-1.on.aws/';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const RichEditor = dynamic(() => import('@game-trade/ui/src/forms/rich-editor'), {
  ssr: false,
});

interface ISocialParamsLocal extends SocialParams {
  edit: boolean;
}

type Form = Partial<{
  [FIELD_FORM.id]: string;
  [FIELD_FORM.image_url]: string;
  [FIELD_FORM.nick_name]: string;
  [FIELD_FORM.custom_url]: string | null;
  [FIELD_FORM.bio]: string | null;
  [FIELD_FORM.locale]: string | null;
  [FIELD_FORM.social]: ISocialParamsLocal[] | null;
}>;

export const GeneralProfileTab = () => {
  const [getUserAccountInfo, { loading, data: user }] = useUserAccountInfoLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    getUserAccountInfo();
  }, []);

  const userData = user && user.me ? ({ ...user.me } as User) : null;

  return (
    <>
      {loading && <Loader position={ALIGN.CENTER} size={SIZE.BIG} />}
      {userData && (
        <GeneralFormComponent userData={userData} getUserAccountInfo={getUserAccountInfo} />
      )}
    </>
  );
};

// async function sendImageToLambda(file: File) {
//   const formData = new FormData();
//   formData.append('image', file);
//   const url = process.env.NEXT_PUBLIC_AWS_API_GATEWAY + '/save-image-to-s3';
//
//   try {
//     return await fetch(url, {
//       method: 'POST',
//       body: formData,
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     }).then((r) => r.text());
//   } catch (e) {
//     console.log('Send Image error', e);
//   }
// }

const GeneralFormComponent = ({ userData, getUserAccountInfo }: IGeneralFormProps) => {
  const { t } = useTranslation('accountPage', { keyPrefix: 'translation' });

  const { getUserInfoAction } = useAuthContext();
  const router = useRouter();

  const [newUserImage, setNewUserImage] = useState<string>();
  const [isUploadImage, setUploadImage] = useState<boolean>(false);

  const [showCustomURLDuplicateErr, setShowCustomURLDuplicateErr] = useState<boolean>(false);

  const [updateAccountInfo, { loading: isUpdatingLoader }] = useUserMutation({
    fetchPolicy: 'no-cache',
    refetchQueries: [
      {
        query: UserAccountInfoDocument,
        fetchPolicy: 'no-cache',
      },
    ],
  });

  const socials =
    userData && userData.social
      ? userData.social.map(({ kind, value }) => ({
          kind,
          value,
        }))
      : [];

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { dirtyFields },
  } = useForm<Form>({
    defaultValues: {
      [FIELD_FORM.nick_name]: userData.nick_name,
      [FIELD_FORM.custom_url]: userData.custom_url,
      [FIELD_FORM.locale]: userData.locale,
      [FIELD_FORM.bio]: userData.bio,
      [FIELD_FORM.social]: socials,
    },
  });

  useEffect(() => {
    reset({
      ...userData,
      [FIELD_FORM.image_url]: userData.image_url || '',
      social: socials,
    });
  }, [userData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: FIELD_FORM.social,
  });

  const handleFormSubmit = async (variables: Form) => {
    const formattedVariables = {
      ...variables,
      social: variables?.social?.map((item) => {
        return { kind: item?.kind, value: item.value };
      }),
    };
    try {
      setShowCustomURLDuplicateErr(false);

      await updateAccountInfo({
        variables: Object.fromEntries(
          Object.entries(formattedVariables).filter(([_, v]) => v != null)
        ),
        fetchPolicy: 'no-cache',
      });

      getUserAccountInfo();

      getUserInfoAction();
      console.log('variables', variables);
      if (variables?.locale) {
        changeLanguageGlobal(variables.locale as string, router);
      }
    } catch (err) {
      setShowCustomURLDuplicateErr(true);
    }
  };

  const handleAddLink = () => {
    append({
      kind:
        !socials.length || socials.find((item) => item.kind !== 'WEB')
          ? SocialKind['Web']
          : socials.find((item) => item.kind === 'TWITTER')
          ? SocialKind['Twitter']
          : SocialKind['Discord'] || null,
      value: '',
      edit: true,
    });
  };

  const handleRemoveLink = (index: number) => {
    remove(index);
  };

  const handleChangeBio = (bio: string) => {
    // if (/^[A-Za-z]/.test(bio))
    setValue(FIELD_FORM.bio, bio, { shouldDirty: true });
  };

  const handleChangeLocal = (lang: string) => {
    console.log('lang', lang);
    setValue(FIELD_FORM.locale, lang, { shouldDirty: true });
  };

  const handleUploadImage = async (event: any) => {
    const fileInput = event.target;
    if (!fileInput.files) return console.warn('Select a file');

    const file = fileInput.files[0];

    try {
      setUploadImage(true);
      if (file) {
        const reader = new FileReader();
        reader.onload = async function (event) {
          const imageData = event?.target?.result;
          const response = await fetch(LAMBDA_URL, {
            method: 'POST',
            body: JSON.stringify({ body: imageData }),
          });
          const result = await response.json();
          if (imageData) setNewUserImage(String(imageData));
          setValue(FIELD_FORM.image_url, result.imageUrl, { shouldDirty: true });
        };
        reader.readAsDataURL(file);
      }

      setUploadImage(false);
    } catch (e) {
      console.log('e', e);
      setUploadImage(false);
    }
  };

  const avatarImageUrl = newUserImage || userData?.image_url;
  const isDirtyField = !Object.keys(dirtyFields).length;
  const watchAllFields = watch();
  const handleContentLink =
    watchAllFields.social && watchAllFields.social.find((item) => item.value === '' || !item.kind);

  return (
    <>
      <TitleTabPage>
        <span>{t('general')}</span>
      </TitleTabPage>

      <GeneralForm onSubmit={handleSubmit(handleFormSubmit)}>
        <FormBlock>
          <UserImageContainer>
            <UploadImage>
              <UserImage isUpdatingLoader={isUploadImage}>
                {isUploadImage && <Loader position={ALIGN.CENTER} size={SIZE.MINI} />}
                {avatarImageUrl && (
                  <Image
                    loader={() => avatarImageUrl}
                    src={avatarImageUrl}
                    quality={65}
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                )}
                {!avatarImageUrl && <SvgAvatar />}
              </UserImage>

              <Upload htmlFor={FIELD_FORM.image_url}>
                <SvgUploadCloud size={24} />
                {t('upload')}
              </Upload>

              <input
                id={FIELD_FORM.image_url}
                type="file"
                hidden={true}
                accept="image/png, image/jpeg, image/jpg, image/webp"
                onChange={handleUploadImage}
                multiple={false}
              />
              <input type="text" hidden={true} {...register(FIELD_FORM.image_url)} />
            </UploadImage>

            <FormBlock>
              <FormBlock>
                <FormBlockTitle htmlFor={FIELD_FORM.nick_name}>{t('name')}</FormBlockTitle>

                <FormBlockContent>
                  <ControlledField
                    name={FIELD_FORM.nick_name}
                    control={control}
                    rules={{
                      required: t('required'),
                      minLength: 3,
                      maxLength: 50,
                    }}>
                    <Input id={FIELD_FORM.nick_name} type="text" color={COLORS.white} />
                  </ControlledField>
                </FormBlockContent>
              </FormBlock>

              <FormBlock>
                <FormBlockTitle>{t('customUrl')}</FormBlockTitle>

                <FormBlockContent>
                  <Row justifyContent={'center'} direction={'row'}>
                    <CustomUrl htmlFor={FIELD_FORM.custom_url}>gametrade.market/user/</CustomUrl>

                    <ControlledField name={FIELD_FORM.custom_url} control={control}>
                      <Input id={FIELD_FORM.custom_url} type="text" color={COLORS.white} />
                    </ControlledField>
                  </Row>
                </FormBlockContent>

                {showCustomURLDuplicateErr && (
                  <p style={{ color: 'red', marginTop: '5px' }}>{t('errorUrl')}</p>
                )}
              </FormBlock>
            </FormBlock>
          </UserImageContainer>
        </FormBlock>

        <FormBlock>
          <FormBlockTitle htmlFor={FIELD_FORM.bio}>{t('bio')}</FormBlockTitle>

          <FormBlockContent>
            <RichEditorWrapper>
              <ControlledField name={FIELD_FORM.bio} control={control}>
                <RichEditor initial={userData?.bio || ''} setMarkdownValue={handleChangeBio} />
              </ControlledField>
            </RichEditorWrapper>
          </FormBlockContent>
        </FormBlock>

        <FormBlock>
          <FormBlockTitle htmlFor="custom_links">{t('links')}</FormBlockTitle>

          <FormBlockContent>
            {fields.map((item, index) => (
              <LinkBlock key={item.id}>
                <RemoveLinks onClick={() => handleRemoveLink(index)}>
                  <SvgCloseOutline size={20} color={COLORS.blue} />
                </RemoveLinks>

                {!item.edit && <SocialTitle>{item.kind}</SocialTitle>}

                {item.edit && (
                  <Select {...register(`${FIELD_FORM.social}.${index}.kind`)}>
                    <option
                      value="DISCORD"
                      disabled={Boolean(fields.find((f) => f.kind === 'DISCORD'))}>
                      {t('Discord')}
                    </option>
                    <option
                      value="TWITTER"
                      disabled={Boolean(fields.find((f) => f.kind === 'TWITTER'))}>
                      {t('Twitter')}
                    </option>
                    <option
                      value="WEB"
                      disabled={Boolean(fields.find((f) => f.kind === 'WEB' && !f.edit))}>
                      {t('Web')}
                    </option>
                  </Select>
                )}

                {!item.edit && (
                  <SocialValue>
                    <a rel="noreferrer" target="_blank" href={item.value}>
                      {item.value}
                    </a>
                  </SocialValue>
                )}

                {item.edit && (
                  <Input
                    placeholder=""
                    type="text"
                    color={COLORS.white}
                    {...register(`${FIELD_FORM.social}.${index}.value`)}
                  />
                )}
              </LinkBlock>
            ))}

            {fields && fields.length <= 2 && (
              <AddLinks onClick={handleAddLink}>
                <Plus>
                  <SvgPlus size={15} color={COLORS.blue} />
                </Plus>{' '}
                {t('addLinks')}
              </AddLinks>
            )}
          </FormBlockContent>
        </FormBlock>

        <FormBlock>
          <FormBlockTitle htmlFor={FIELD_FORM.locale}>
            {t('chooseLanguage')} <SvgChoseLanguage color={COLORS.pink} />
          </FormBlockTitle>

          <FormBlockContent>
            <ControlledField name={FIELD_FORM.locale} control={control}>
              <ChoseLanguage setLocaleValue={handleChangeLocal} />
            </ControlledField>
          </FormBlockContent>
        </FormBlock>

        <FormBlock>
          <Button
            type="submit"
            dimension="m"
            disabled={!!handleContentLink || isDirtyField}
            isLoader={isUpdatingLoader}
            style={{ width: '159px' }}>
            {t('save')}
          </Button>
        </FormBlock>
      </GeneralForm>
    </>
  );
};
