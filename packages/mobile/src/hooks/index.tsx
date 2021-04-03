import React from 'react';

import { AuthProvider, useAuth } from './auth';
import useFetch from './fetch';
import { KeyboardProvider, useKeyboard } from './keyboard';

const RootProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <KeyboardProvider>{children}</KeyboardProvider>
  </AuthProvider>
);

export { RootProvider, useAuth, useKeyboard, useFetch };
