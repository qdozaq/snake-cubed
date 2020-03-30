import React, { useState, ChangeEvent, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ReactGA from 'react-ga';

import Game from './game/Game';
import themes from './themes';
import { MenuContainer, MenuButton } from './components/Menu';
import GlobalStyle from './GlobalStyle';
import HowToPage from './HowToPage';
import Settings from './Settings';
import useStateWithStorage from './hooks/useStateWithStorage';

const DEFAULT_SIZE = 3;
const DEFAULT_SPEED = 2;

const App = () => {
  useEffect(() => {
    ReactGA.initialize('UA-131385998-3', {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    });
    ReactGA.pageview('/');
  }, []);

  const [size, setSize] = useStateWithStorage('size', DEFAULT_SIZE);
  const [speed, setSpeed] = useStateWithStorage('speed', DEFAULT_SPEED);
  const [theme, setTheme] = useStateWithStorage('theme', false);

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
      <ThemeProvider theme={theme ? themes.dark : themes.light}>
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
          </Container>
          <Settings
            toggleTheme={setTheme}
            size={size}
            handleSize={handleSize}
            speed={speed}
            handleSpeed={handleSpeed}
          />
        </>
      </ThemeProvider>
    </>
  );
};

export default App;

const Container = styled.div<{ inMenu: boolean }>`
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) =>
    `radial-gradient(${theme.background.from} 80%, ${theme.background.to})`};
`;
