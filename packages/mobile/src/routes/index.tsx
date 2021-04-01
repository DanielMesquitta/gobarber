import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '~/pages';

const { Navigator, Screen } = createStackNavigator();

const Router: React.FC = () => (
  <NavigationContainer>
    <Navigator>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  </NavigationContainer>
);

export default Router;
