import * as styles from '~/styles';

const { GlobalStyle: _, ...theme } = styles;

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: typeof theme.colors;
  }
}
