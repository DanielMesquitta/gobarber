import * as styles from '~/styles';

const { GlobalContainer: _, ...theme } = styles;

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    colors: typeof theme.colors;
  }
}
