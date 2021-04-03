import React from 'react';

import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import { Dashboard } from '~/pages';
import { colors } from '~/styles';

const { Navigator, Screen } = createStackNavigator();

const PublicRoutes: React.FC = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.gray._300 },
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Screen name="Dashboard" component={Dashboard} />
  </Navigator>
);

export default PublicRoutes;
