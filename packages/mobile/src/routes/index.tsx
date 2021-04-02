import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { SignIn, SignUp } from '~/pages';
import { colors } from '~/styles';

const { Navigator, Screen } = createStackNavigator();

const PublicRoutes: React.FC = () => (
  <NavigationContainer>
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.gray._300 },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUp" component={SignUp} />
    </Navigator>
  </NavigationContainer>
);

export default PublicRoutes;
