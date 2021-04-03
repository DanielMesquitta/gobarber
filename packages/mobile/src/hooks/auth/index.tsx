import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '~/services';
import { getFromStorage, removeFromStorage, store } from '~/utils';

import { AuthContextState, SignInResponse } from './types';

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider: React.FC = ({ children, ...rest }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFromStorage<SignInResponse>('auth');
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { data } = await api.post<SignInResponse>('/sessions', {
      email,
      password,
    });
    setUser(data.user);
    await store('auth', data);
    return data;
  }, []);

  const signOut = useCallback(async () => {
    await removeFromStorage('auth');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }} {...rest}>
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
