import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SvgSendMessage } from '@game-trade/icons';
import { ControlledField, COLORS } from '@game-trade/ui';
// import { FileUploader } from 'react-drag-drop-files';

// import { fileTypes } from '../../utils';

import { EditorContent, TextareaStyled, Controls, ButtonSendMessage } from './style';
import { useTranslation } from 'next-i18next';

interface IProps {
  exportMessage: (message: string) => void;
}

type Form = Partial<{
  editorMessage: string;
}>;

export const EditorContainer = ({ exportMessage }: IProps) => {
  const { t } = useTranslation('chatPage', { keyPrefix: 'translation' });

  const { handleSubmit, control, watch, reset, formState } = useForm<Form>();
  const editorMessage = watch('editorMessage');

  const handleFormSubmit = async (variables: Form) => {
    exportMessage && exportMessage(variables.editorMessage || '');
    reset({ editorMessage: '' });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ editorMessage: '' });
    }
  }, [formState]);

  // const handleEmoji = () => {};

  // const handleAudio = () => {};

  const handleUserKeyPress = async (event: any) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      await handleFormSubmit({
        editorMessage: event.target.value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <EditorContent>
        <ControlledField name={'editorMessage'} control={control}>
          <TextareaStyled
            maxRows={4}
            aria-label="maximum height"
            onKeyPress={handleUserKeyPress}
            maxLength={2000}
            placeholder={t('typeSomethins') || ''}
          />
        </ControlledField>
        <Controls>
          {/*<SvgEmoji size={18} color={COLORS.gray} onClick={handleEmoji} />*/}
          {/*<FileUploader handleChange={handleChange} name="file" types={fileTypes}>*/}
          {/*  <SvgUploadImage size={18} />*/}
          {/*</FileUploader>*/}
          <ButtonSendMessage type="submit">
            <SvgSendMessage
              size={16}
              color={editorMessage && !!editorMessage?.length ? COLORS.pink : COLORS.grayPurple}
            />
          </ButtonSendMessage>
        </Controls>
      </EditorContent>
    </form>
  );
};
