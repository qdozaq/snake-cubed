import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Game from './Game';
import themes from './themes';
import { MenuContainer, MenuButton } from './Menu';
import Arrow from './ArrowButton';

const DEFAULT_SIZE = 3;
const DEFAULT_SPEED = 2;

const App = () => {
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [start, setStart] = useState(false);
  const [howTo, setHowTo] = useState(false);

  const toggleStart = () => setStart(!start);
  const toggleHowTo = () => setHowTo(!howTo);

  const handleSize = (e: ChangeEvent<HTMLInputElement>) => setSize(parseInt(e.target.value));
  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) => setSpeed(parseInt(e.target.value));

  return (
    <>
      <ThemeProvider theme={themes.light}>
        <Container inMenu={!start}>
          <Game size={size} speed={speed} start={start} />
          <MenuContainer show={!(start || howTo)}>
            <MenuButton onClick={toggleStart} clicked={start}>Start</MenuButton>
            <MenuButton onClick={toggleHowTo} clicked={howTo}>How to play</MenuButton>
            <MenuButton>Settings</MenuButton>
          </MenuContainer>
          <MenuContainer show={howTo}>
            <HowTo>
              <Arrow onClick={toggleHowTo} />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie, tellus ac volutpat rhoncus, ante turpis lacinia eros, sed fringilla urna risus ac urna. Aenean at lorem sed elit luctus auctor in auctor mauris. Proin tincidunt, tellus eget venenatis interdum, est dolor luctus nunc, eget auctor lorem nisl ac massa. Vestibulum vitae sollicitudin velit, at vehicula purus. Phasellus id pulvinar massa. Vivamus ac nisi lorem. Suspendisse pharetra justo sed eros efficitur, ac viverra justo placerat. Donec imperdiet mauris diam, et rhoncus ante congue at. Sed orci turpis, congue vitae dolor eu, dapibus elementum lorem. Phasellus tristique quam ex. Ut diam eros, tristique vitae egestas eu, ultrices at quam. Maecenas sed ullamcorper neque. Maecenas aliquam nunc sit amet semper molestie. Sed non lectus in quam pulvinar suscipit a ut justo. Sed elementum vestibulum velit et viverra.
            </p>
            </HowTo>
          </MenuContainer>

          {/* <SlidersContainer>
            <span>Size: {size}</span>
            <Slider onChange={handleSize} type='range' min='1' max='20' value={size.toString()} />
            <span>Speed: {speed}</span>
            <Slider onChange={handleSpeed} type='range' min='1' max='20' value={speed.toString()} />
          </SlidersContainer> */}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;

const HowTo = styled.div`
  width: auto;
  margin: 2rem;
  margin-bottom: 0;
  margin-top: 5rem;

  @media only screen and (min-width:800px) {
    width: 50vw;
    margin:0; 
  }
`;

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
