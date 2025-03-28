import { useState, useContext, createContext } from 'react';

export type SnackbarProps = {
  key?: number | string;
  children?: React.ReactElement | string;
  duration?: number;
  severity?: 'success' | 'info' | 'warning' | 'error';
  position?: {
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'right' | 'center';
  };
  onClose?: () => void;
};

export type SnackStackContextProps = {
  snackbarMessages: SnackbarProps[];
  setSnackbarMessages: (messages: SnackbarProps[]) => void;
  addSnackbarMessage: (message: SnackbarProps[], reset?: boolean) => void;
  removeSnackbarMessage: (key: SnackbarProps['key']) => void;
  resetSnackbarMessage: () => void;
};

const SnackStackContext = createContext<SnackStackContextProps>({} as SnackStackContextProps);

export const SnackStackProvider: React.FC<any> = ({ children }) => {
  const [snackbarMessages, setSnackbarMessages] = useState<SnackbarProps[]>([]);

  const addSnackbarMessage = (messages: SnackbarProps[], reset?: boolean) => {
    const _messages: SnackbarProps[] = [];
    let rest: SnackbarProps[] = [];
    messages.map((item) => {
      const key = item.key || Date.now();
      if (snackbarMessages.find((message) => message.key === key)) {
        return;
      }
      rest = snackbarMessages.length < 3 ? snackbarMessages : snackbarMessages.slice(0, -1);
      _messages.push({ ...item, key });
    });

    if (reset) {
      setSnackbarMessages([..._messages]);
    } else {
      setSnackbarMessages([..._messages, ...rest]);
    }
  };

  const removeSnackbarMessage = (key: SnackbarProps['key']) => {
    setSnackbarMessages((prev) => prev.filter((message) => message.key !== key));
  };

  const resetSnackbarMessage = () => {
    setSnackbarMessages([]);
  };

  return (
    <SnackStackContext.Provider
      value={{
        snackbarMessages,
        setSnackbarMessages,
        addSnackbarMessage,
        removeSnackbarMessage,
        resetSnackbarMessage,
      }}>
      {children}
    </SnackStackContext.Provider>
  );
};

export const useSnackStack = () => useContext(SnackStackContext);
