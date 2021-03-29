import React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import * as styles from '~/styles';

const { GlobalStyle, ...theme } = styles;

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>GoBarber</title>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;1,400;1,500&display=swap"
        rel="stylesheet"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
