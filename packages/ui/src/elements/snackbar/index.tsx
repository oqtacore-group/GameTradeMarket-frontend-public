import React, { forwardRef, useState, useCallback, useEffect } from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { Grow } from '@mui/material';
// import Snackbar from '@mui/material/Snackbar';
// import IconButton from '@mui/material/IconButton';

import { Text, SvgWrapper } from './style';
import { SvgError } from '@game-trade/icons';
import { COLORS } from '@game-trade/ui';
import { SnackbarProps, useSnackStack } from '@game-trade/lib';

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ISnackbar {
  message: SnackbarProps | undefined;
}

export const SnackbarAlert = forwardRef<HTMLElement, ISnackbar>(({ message }, ref) => {
  const [open, setOpen] = useState(!!message);
  const { removeSnackbarMessage } = useSnackStack();

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      removeSnackbarMessage(message?.key);
    }, 300);
  }, [message?.key, removeSnackbarMessage]);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    close();
  };

  useEffect(() => {
    if (message?.duration !== 0) {
      setTimeout(() => {
        close();
      }, message?.duration || 6000);
    }
  }, [close, message?.duration]);

  return (
    <Grow in={open}>
      <div style={{ position: 'relative' }}>
        <Alert
          variant="filled"
          severity={message?.severity}
          sx={{
            maxWidth: '480px',
            display: 'flex',
            alignItems: 'center',
          }}>
          <Text>{message?.children}</Text>
        </Alert>
        <SvgWrapper>
          <SvgError onClick={handleClose} size={20} color={COLORS.white} />
        </SvgWrapper>
      </div>
    </Grow>
  );
});

// <Snackbar
//   open={open}
//   autoHideDuration={
//     message?.duration === null ? null : message?.duration ? message?.duration : 6000
//   }
//   onClose={handleClose}
//   action={action}
//   anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//   <Alert
//     severity={message?.state}
//     sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
//     <Text>
//       {message?.text}
//       <SvgError onClick={handleClose} size={20} color={COLORS.white} />
//     </Text>
//   </Alert>
// </Snackbar>
