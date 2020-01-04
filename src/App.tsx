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
    <>
      <ThemeProvider theme={themes.light}>
        <Container>
          <Game size={size} speed={speed}></Game>
          {/* <Menu /> */}
          <SlidersContainer>
            <span>Size: {size}</span>
            <Slider onChange={handleSize} type='range' min='1' max='20' value={size.toString()} />
            <span>Speed: {speed}</span>
            <Slider onChange={handleSpeed} type='range' min='1' max='20' value={speed.toString()} />
          </SlidersContainer>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;

const Slider = styled.input`
  width: 100%;
`;

const SlidersContainer = styled.div`
  position: absolute;
  top: 0;
  width: 15rem;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) => `radial-gradient(${theme.background.from} 80%, ${theme.background.to})`};
`;

const Menu = () => {
  return (
    <MenuContainer>
      <MenuButton>Start</MenuButton>
      <MenuButton>How to play</MenuButton>
      <MenuButton>Settings</MenuButton>
    </MenuContainer>
  );
}

const MenuContainer = styled.div`
  top:0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  /* background: ${({ theme }) => theme.background.from + 'B0'}; 80 = 50% alpha */
`;

const MenuButton = styled.button`
  border: none;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  outline: none;

  transition: color .3s ease-out,
              text-decoration .3s ease-out,
              letter-spacing .3s cubic-bezier(.02,1,.29,.95);
  color: ${({ theme }) => theme.menuButton}; 

  &:focus{
    text-decoration: underline ${({ theme }) => theme.menuButton};
  }

  &:hover {
    color: ${({ theme }) => theme.menuButtonHover};
    text-decoration: underline ${({ theme }) => theme.menuButtonHover};
  }

  &:active {
    letter-spacing: .6rem;
  }

`;