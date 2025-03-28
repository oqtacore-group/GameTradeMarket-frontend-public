import React, { useEffect, useState } from 'react';
import RichTextEditor, { EditorValue } from 'react-rte';

import { Container } from './style';

type Props = {
  initial: string;
  setMarkdownValue: (value: string) => void;
};

export const Editor: React.FC<Props> = ({ initial, setMarkdownValue }) => {
  const [value, setValue] = useState<EditorValue>(
    RichTextEditor.createValueFromString(initial, 'markdown')
  );

  useEffect(() => {
    setMarkdownValue(value.toString('markdown'));
  }, [value.toString('markdown')]);

  return (
    <Container>
      <RichTextEditor
        className="rich-editor"
        editorClassName="editor"
        toolbarClassName="toolbar"
        toolbarConfig={{
          display: [
            'INLINE_STYLE_BUTTONS',
            'BLOCK_TYPE_DROPDOWN',
            'BLOCK_TYPE_BUTTONS',
            /*'HISTORY_BUTTONS',*/
          ],
          INLINE_STYLE_BUTTONS: [
            { label: 'Bold', style: 'BOLD', className: 'toolbarConfigBold' },
            { label: 'Italic', style: 'ITALIC', className: 'toolbarConfigITALIC' },
            { label: 'Underline', style: 'UNDERLINE', className: 'toolbarConfigUNDERLINE' },
            {
              label: 'Strikethrough',
              style: 'STRIKETHROUGH',
              className: 'toolbarConfigSTRIKETHROUGH',
            },
          ],
          BLOCK_TYPE_BUTTONS: [
            { label: 'UL', style: 'unordered-list-item', className: 'toolbarConfigUL' },
            { label: 'OL', style: 'ordered-list-item', className: 'toolbarConfigOL' },
          ],
          BLOCK_TYPE_DROPDOWN: [
            { label: 'Normal', style: 'unstyled' },
            { label: 'Large', style: 'header-one' },
            { label: 'Medium', style: 'header-two' },
            { label: 'Small', style: 'header-three' },
          ],
        }}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        value={value}
      />
    </Container>
  );
};

export { Editor as default };
