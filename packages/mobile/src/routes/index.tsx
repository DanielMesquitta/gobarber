import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';

import { useAuth } from '~/hooks';

import PrivateRoutes from './private.routes';
import PublicRoutes from './public.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <AppLoading />;

  return (
    <NavigationContainer>
      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
