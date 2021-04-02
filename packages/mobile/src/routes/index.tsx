import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/pages';
import { colors } from '~/styles';

const { Navigator, Screen } = createStackNavigator();

const PublicRoutes: React.FC = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.gray._300 },
      }}
      initialRouteName="SignUp"
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  </NavigationContainer>
);

export default PublicRoutes;
