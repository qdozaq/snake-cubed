import React from 'react';
import { ThemeProvider } from 'styled-components';

import Game from './Game';
import themes from './themes';

const App = () => {
  return (
    <ThemeProvider theme={themes.light}>
      <Game></Game>
    </ThemeProvider>
  );
};

export default App;
