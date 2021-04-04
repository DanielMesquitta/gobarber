import React, { createContext, useContext, useState, useCallback } from 'react';

import { v4 as uuid } from 'uuid';

import { ToastContainer } from '~/components';

import { ToastContextState, ToastMessage, ToastProviderProps } from './types';

const ToastContext = createContext<ToastContextState>({} as ToastContextState);

const ToastProvider: React.FC<ToastProviderProps> = ({
  toastTimeout = 3000,
  children,
  ...rest
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  }, []);

  const addToast = useCallback(
    ({ title, description, type }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();
      setMessages((prevMessages) => [
        ...prevMessages,
        { id, title, description, type },
      ]);
      setTimeout(() => removeToast(id), toastTimeout);
      return id;
    },
    [removeToast, toastTimeout]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }} {...rest}>
      {children}
      <ToastContainer {...{ messages }} />
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export { ToastProvider, useToast };
