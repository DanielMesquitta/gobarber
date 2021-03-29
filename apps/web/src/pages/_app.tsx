import React from 'react';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import * as styles from '~/styles';

const { GlobalStyle, ...theme } = styles;

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
