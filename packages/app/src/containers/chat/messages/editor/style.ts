import styled from 'styled-components';
import { rgba } from 'polished';
import { TextareaAutosize } from '@mui/base';
import { COLORS } from '@game-trade/ui';

export const EditorContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100px;
  align-items: center;
  margin: 0 0 0 10px;

  svg {
    cursor: pointer;
  }
`;

export const TextareaStyled = styled(TextareaAutosize)`
  border: 1px solid ${rgba(COLORS.black90, 0.7)};
  width: 100%;
  background-color: ${rgba(15, 9, 18, 0.2)};
  color: ${COLORS.white};
  padding: 10px 18px;
  outline: ${COLORS.blue};
  resize: none;

  textarea {
    resize: none;
  }

  :focus,
  :hover {
    border: 1px solid ${COLORS.blue};
  }
`;

export const ButtonSendMessage = styled.button`
  border: 0 none;
  background: transparent;
  outline: none;
  margin: 0;
  padding: 0;

  :focus,
  :hover {
    border: 0 none;
    background: transparent;
  }
`;
