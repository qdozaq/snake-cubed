import { createGlobalStyle } from 'styled-components';
import theme from './themes';

export default createGlobalStyle`
  body {
  color: ${props => {
    console.log(props);
    // @ts-ignore
    return props.theme.secondary;
  }};
  }
`;