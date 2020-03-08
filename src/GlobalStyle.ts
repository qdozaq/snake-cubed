import { createGlobalStyle } from 'styled-components';
import theme from './themes';

export default createGlobalStyle`
  body {
  height: 100vh;
  color: ${props => {
    // @ts-ignore
    return props.theme.secondary;
  }};
  }

  body,
  #root {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100vw;
    height: 100%;
    padding: 0;
    overflow: hidden;
    overscroll-behavior: none;
    touch-action: none;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;
