import React from 'react';

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import RobotoSlabMedium from '~/assets/fonts/RobotoSlab-Medium.ttf';
import RobotoSlabRegular from '~/assets/fonts/RobotoSlab-Regular.ttf';
import { RootProvider } from '~/hooks';
import Routes from '~/routes';
import * as theme from '~/styles';

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoSlab-Medium': RobotoSlabMedium,
    'RobotoSlab-Regular': RobotoSlabRegular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.gray._300} />
        <RootProvider>
          <Routes />
        </RootProvider>
      </ThemeProvider>
    </>
  );
}
