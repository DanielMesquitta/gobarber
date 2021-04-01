import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';

import Router from '~/routes';
import * as styles from '~/styles';

const { GlobalContainer, ...theme } = styles;

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor={theme.colors.gray._300} />
        <GlobalContainer>
          <Router />
        </GlobalContainer>
      </ThemeProvider>
    </>
  );
}
