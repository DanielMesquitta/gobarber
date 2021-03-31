import React, { createContext, useCallback, useContext, useState } from 'react';

import { api } from '~/services';
import { setCookie, removeCookie } from '~/utils';

import { AuthContextState, SignInResponse } from './types';

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children, ...rest }) => {
  const [user, setUser] = useState(null);

  const signIn = useCallback(async ({ email, password }) => {
    const { data } = await api.post<SignInResponse>('/sessions', {
      email,
      password,
    });
    setCookie('auth', data);
    setUser(data.user);
    return data;
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    removeCookie('auth');
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }} {...rest}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within a AuthProvider');
  return context;
};

export { AuthProvider, useAuth };
