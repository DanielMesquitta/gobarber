/* eslint-disable global-require */
import React from 'react';
import { View } from 'react-native';

import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import Routes from '~/routes';
import * as theme from '~/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return <View />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.gray._300} />
        <Routes />
      </ThemeProvider>
    </>
  );
}
