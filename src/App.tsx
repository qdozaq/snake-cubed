import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Game from './Game';
import themes from './themes';

const DEFAULT_SIZE = 3;
const DEFAULT_SPEED = 2;

const App = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [start, setStart] = useState(false);

  const handleSize = (e: ChangeEvent<HTMLInputElement>) => setSize(parseInt(e.target.value));
  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => setSpeed(parseInt(e.target.value));

  return (
    <>
      <ThemeProvider theme={themes.light}>
        <Container inMenu={!start}>
          <Game size={size} speed={speed} start={start}></Game>
          <CSSTransition in={!start} timeout={1500} classNames='menu' unmountOnExit>
            <MenuContainer>
              <MenuButton onClick={() => setStart(true)} clicked={start}>Start</MenuButton>
              <MenuButton>How to play</MenuButton>
              <MenuButton>Settings</MenuButton>
            </MenuContainer>
          </CSSTransition>
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


const curve = `.36,.18,.26,.95`;

const Container = styled.div<{ inMenu: boolean }>`
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) => `radial-gradient(${theme.background.from} 80%, ${theme.background.to})`};

  canvas {
    transition: opacity 1.5s cubic-bezier(${curve}), transform 1.5s cubic-bezier(${curve});
  }

  ${({ inMenu }) => {
    return inMenu && css`
    canvas {
      opacity: .1;
      transform: translateY(-5rem);
    }
    `
  }}
`;


const MenuButton = styled.button<{ clicked?: boolean }>`
  border: none;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  outline: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  transition: color .3s ease-out,
              text-decoration .3s ease-out,
              letter-spacing 1s cubic-bezier(.02,1,.29,.95);
  color: ${({ theme }) => theme.menuButton}; 

  &:focus{
    text-decoration: underline ${({ theme }) => theme.menuButton};
  }

  &:hover {
    color: ${({ theme }) => theme.menuButtonHover};
    text-decoration: underline ${({ theme }) => theme.menuButtonHover};
  }

  ${({ clicked }) => clicked && `letter-spacing: .8rem`}
`;

const MenuContainer = styled.div`
  top:0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  &.menu-exit {
    opacity: 1;
    pointer-events: none;
  }

  &.menu-exit-active{
    opacity: 0;
    transition: opacity 1.5s;
  }
`;