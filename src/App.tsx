import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Game from './Game';
import themes from './themes';

const DEFAULT_SIZE = 3;
const DEFAULT_SPEED = 2;

const App = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const handleSize = (e: ChangeEvent<HTMLInputElement>) => setSize(parseInt(e.target.value));
  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => setSpeed(parseInt(e.target.value));

  return (
    <ThemeProvider theme={themes.light}>
      <Game size={size} speed={speed}></Game>
      <SlidersContainer>
        <span>Size: {size}</span>
        <Slider onChange={handleSize} type='range' min='1' max='20' value={size.toString()} />
        <span>Speed: {speed}</span>
        <Slider onChange={handleSpeed} type='range' min='1' max='20' value={speed.toString()} />
      </SlidersContainer>
    </ThemeProvider>
  );
};

export default App;

const Slider = styled.input`
width: 100%
`;

const SlidersContainer = styled.div`
  position: absolute;
  top: 0;
  width: 15rem;
`;