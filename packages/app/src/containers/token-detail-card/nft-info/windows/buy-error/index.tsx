import React from 'react';
import { Modal } from '@game-trade/ui';
import * as Style from './style';

interface IProps {
  onClose(): any;
  content: string;
}

export function BuyError({ onClose, content: _CONTENT }: IProps) {
  return (
    <Modal onClose={onClose} hasHeader={false} isPadding={false} size={560}>
      <Style.ModalContent>
        {_CONTENT}
        <Style.ModalButton onClick={onClose}>Ok</Style.ModalButton>
      </Style.ModalContent>
    </Modal>
  );
}
