import React, { useState, ChangeEvent } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Game from './Game';
import themes from './themes';
import { MenuContainer, MenuButton } from './Menu';
import Arrow from './ArrowButton';
import DragAnimation from './DragAnimation';
import MoveAnimation from './MoveAnimation';
import GlobalStyle from './GlobalStyle';

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
        <>
          <GlobalStyle />
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
                <h1>How to play</h1>
                <HowToSection>
                  <DragAnimation />
                  <Paragraph>
                    Swipe or drag on the cube to rotate it.
                  </Paragraph>
                </HowToSection>
                <HowToSection reverse>
                  <Paragraph>
                    Use the &larr; &rarr; keys, or <b>A</b> and <b>D</b> to change the direction of the snake. <b>Left</b> and <b>right</b> are tied to the snake's orientation, which is important to keep in mind when figuring out which direction you want to go.
                  </Paragraph>
                  <MoveAnimation />
                </HowToSection>
              </HowTo>
            </MenuContainer>

            {/* <SlidersContainer>
            <span>Size: {size}</span>
            <Slider onChange={handleSize} type='range' min='1' max='20' value={size.toString()} />
            <span>Speed: {speed}</span>
            <Slider onChange={handleSpeed} type='range' min='1' max='20' value={speed.toString()} />
          </SlidersContainer> */}
          </Container>
        </>
      </ThemeProvider>
    </>
  );
};

export default App;

const HowToSection = styled.section<{ reverse?: boolean }>`
  display: flex;
  justify-content: center;
  @media only screen and (max-width:38rem) {
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
    align-items: center;
  }
`;

const Paragraph = styled.p`
  margin: 1rem;
  width: 100%;
  font-size: 1.2rem;
`;


const HowTo = styled.div`
  width: 35rem;
  margin:0; 
  overflow-y: auto;

  @media only screen and (max-width:38rem) {
    width: auto;
    margin: 0 2rem;
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
