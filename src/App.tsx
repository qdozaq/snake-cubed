import React, { useState, ChangeEvent, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';

import Game from './game/Game';
import themes from './themes';
import { MenuContainer, MenuButton } from './components/Menu';
import GlobalStyle from './GlobalStyle';
import HowToPage from './howto/HowToPage';
import Settings from './Settings';

const DEFAULT_SIZE = 3;
const DEFAULT_SPEED = 2;

const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-131385998-2', {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
    ReactGA.pageview('/');
  }, []);

  const [size, setSize] = useState(DEFAULT_SIZE);
  const [speed, setSpeed] = useState(DEFAULT_SPEED);

  const [start, setStart] = useState(false);
  const [howTo, setHowTo] = useState(false);

  const toggleStart = () => setStart(!start);
  const toggleHowTo = () => setHowTo(!howTo);

  const handleSize = (e: ChangeEvent<HTMLInputElement>) =>
    setSize(parseInt(e.target.value));
  const handleSpeed = (e: ChangeEvent<HTMLInputElement>) =>
    setSpeed(parseInt(e.target.value));

  return (
    <>
      <ThemeProvider theme={themes.light}>
        <>
          <GlobalStyle />
          <Container inMenu={!start}>
            <Game
              size={size}
              speed={speed}
              start={start}
              toggle={toggleStart}
            />
            <MenuContainer show={!(start || howTo)}>
              <MenuButton onClick={toggleStart} clicked={start}>
                Start
              </MenuButton>
              <MenuButton onClick={toggleHowTo} clicked={howTo}>
                How to play
              </MenuButton>
            </MenuContainer>
            <MenuContainer show={howTo}>
              <HowToPage toggle={toggleHowTo} />
            </MenuContainer>
            {/* <SlidersContainer>
            <span>Size: {size}</span>
            <Slider onChange={handleSize} type='range' min='1' max='20' value={size.toString()} />
            <span>Speed: {speed}</span>
            <Slider onChange={handleSpeed} type='range' min='1' max='20' value={speed.toString()} />
          </SlidersContainer> */}
          </Container>
          <Settings />
        </>
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

const Container = styled.div<{ inMenu: boolean }>`
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) =>
    `radial-gradient(${theme.background.from} 80%, ${theme.background.to})`};
`;
