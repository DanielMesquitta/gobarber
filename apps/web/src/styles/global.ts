import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    &, &:focus {
      outline: 0;
    }
  }

  html {
    min-height: 100%;
    hyphens: auto;
    word-wrap: break-word;
    overflow-x: hidden;
    position: relative;
    scroll-behavior: smooth;
    font-size: 62.5%; //1 rem = 10px; 10px/16px = 62.5%

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 56.25%; //1 rem = 9px
    }

    @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 50%; //1 rem = 8px
    }
  }

  body {
    overflow-x: hidden;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-font-smoothing: antialiased !important;
    background: ${({ theme }) => theme.colors.gray._400};
  }

  body, input, textarea, button, a, a:visited {
    font-size: ${({ theme }) => theme.typography.size.p};
    font-family: ${({ theme }) => theme.typography.family};
    color: ${({ theme }) => theme.colors.gray._000};
  }

  input, textarea, button {
    border: 0;
    background-color: transparent;
  }

  a, a:visited, button {
    text-decoration: none;
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6, strong, b {
    font-weight: ${({ theme }) => theme.typography.weight.bold}
  }
`;

export default GlobalStyle;
