import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Canvas, useFrame, CanvasProps } from 'react-three-fiber';
import styled, { ThemeContext } from 'styled-components';
import ReactGA from 'react-ga';

import { MenuContainer, MenuButton } from '../components/Menu';
import FoodIcon from '../components/FoodIcon';
import Paragraph from '../components/Paragraph';
import Cube from './Cube';
import Rotation from './Rotation';
import { useGameState, GameStates, State, GameDispatch } from './useGameState';
import Snake from './Snake';
import Food from './Food';

import { buildCubeMap } from './map';

type GameProps = {
  size: number;
  speed: number;
  start: boolean;
  toggle: VoidFunction;
}

type GamePropsWithState = GameProps & {
  state: State;
  dispatch: GameDispatch;
}

let time = 0;

const Game = ({ size, speed, start, toggle, state, dispatch }: GamePropsWithState) => {
  const [snakeVisible, setSnakeVisible] = useState(true);
  const { snake, food } = state;

  useFrame((_, delta) => {
    time += delta;

    switch (state.gameState) {
      case GameStates.MENU:
      case GameStates.PLAYING:
        if (speed > 0 && time > 1 / speed) {
          dispatch({ type: 'FORWARD' });
          time = 0;
        }

        if (!snakeVisible) setSnakeVisible(true);
        break;
      case GameStates.LOSE:
        if (time > 0.5) {
          setSnakeVisible(val => !val);
          time = 0;
        }
        break;
      case GameStates.WIN:
        break;
      default:
    }

  });

  return (
    <>
      <ambientLight intensity={1} />
      <spotLight
        intensity={0.3}
        position={[12, 50, 12]}
        angle={1}
        penumbra={1}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        castShadow
      />
      <MobileButton left={false} onClick={() => dispatch({ type: 'RIGHT' })} />
      <MobileButton left={true} onClick={() => dispatch({ type: 'LEFT' })} />

      <Rotation distance={size * 1.2} state={state.gameState}>
        <Cube size={size} />
        {/* <axesHelper args={[SIZE * 2]}></axesHelper> */}
        <Food position={food.vector} />
        <Snake body={snakeVisible ? snake : []} />
      </Rotation>
    </>
  );
};

type MobileButtonProps = {
  onClick: VoidFunction;
  left: boolean;
}

const buttonPanelSize = 40;

const MobileButton = ({ onClick, left }: MobileButtonProps) => {
  const [pressed, setPressed] = useState(false);

  const handleDown = e => {
    if (e.pointerType === 'touch') {
      setPressed(true);
      onClick();
    }
  }

  const handleUp = () => setPressed(false);

  return (
    <mesh
      position={[left ? -buttonPanelSize / 2 : buttonPanelSize / 2, 0, -20]}
      onPointerDown={handleDown}
      onPointerUp={handleUp}
      onPointerOut={handleUp}
    >
      <planeBufferGeometry attach="geometry" args={[buttonPanelSize, buttonPanelSize]} />
      <meshBasicMaterial
        color='white'
        transparent={true}
        opacity={pressed ? .2 : 0}
        attach="material"
      />
    </mesh>
  )
}

export default function GameWrapper(props: GameProps) {
  const theme = useContext(ThemeContext);

  const cubeMap = useMemo(() => buildCubeMap(props.size), [props.size]);
  const [state, dispatch] = useGameState(cubeMap);

  useEffect(() => {
    if (props.start) {
      ReactGA.event({ category: 'Engagement', action: 'Clicked Start' });
      dispatch({ type: 'PLAY' });
    }
  }, [props.start]);

  const handleClick = () => {
    dispatch({ type: 'INIT', payload: { map: cubeMap } });
    props.toggle();
  }

  return (
    <>
      <CanvasStyled
        camera={{ far: 1000 }}
        shadowMap
        menu={state.gameState === GameStates.MENU ? 1 : 0}
        faded={state.gameState !== GameStates.PLAYING ? 1 : 0}
      >
        <ThemeContext.Provider value={theme}>
          <Game state={state} dispatch={dispatch} {...props} />
        </ThemeContext.Provider>
      </CanvasStyled>
      <MenuContainer show={state.gameState === GameStates.LOSE}>
        <Paragraph>
          <FoodIcon /> : {state.snake.length}
        </Paragraph>
        <MenuButton onClick={handleClick} clicked={!props.start}>Ok</MenuButton>
      </MenuContainer>
    </>
  )
}

const curve = `.36,.18,.26,.95`;

type CanvasStyledProps = CanvasProps & { faded: number, menu: number }

const CanvasStyled = styled(Canvas) <CanvasStyledProps>`
  canvas {
    transition: opacity 1.5s cubic-bezier(${curve}), transform 1.5s cubic-bezier(${curve});
    ${({ faded }) => faded && 'opacity: .1'};
    ${({ menu }) => menu && 'transform: translateY(-5rem)'};
  }
`