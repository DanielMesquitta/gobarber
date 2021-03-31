import React from 'react';

import { AuthProvider, useAuth } from './auth';
import useFetch from './fetch';
import { ToastProvider, useToast } from './toast';
import { ToastProviderProps } from './toast/types';

type Props = ToastProviderProps;

const RootProvider: React.FC<Props> = ({ children, toastTimeout }) => (
  <AuthProvider>
    <ToastProvider {...{ toastTimeout }}>{children}</ToastProvider>
  </AuthProvider>
);

export { RootProvider, useAuth, useToast, useFetch };
