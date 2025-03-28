import React from 'react';
import { Button } from '@game-trade/ui';

import { Notification } from './style';

interface IProps {
  onClose: () => void;
  message: string;
}

export function NotificationModal(props: IProps) {
  const { message, onClose } = props;

  return (
    <Notification>
      <span>{message}</span>
      <br />
      <Button appearance="secondary" onClick={onClose} style={{ width: '200px' }}>
        Back
      </Button>
    </Notification>
  );
}
