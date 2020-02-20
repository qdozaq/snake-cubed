import React, { useState, useContext, useMemo, useEffect, ReactNode } from 'react';
import { Canvas, useFrame, CanvasProps } from 'react-three-fiber';
import styled, { ThemeContext } from 'styled-components';

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
      <Rotation distance={size * 1.2} start={start} state={state.gameState}>
        <Cube size={size} />
        {/* <axesHelper args={[SIZE * 2]}></axesHelper> */}
        <Food position={food.vector} />
        <Snake body={snakeVisible ? snake : []} />
      </Rotation>
    </>
  );
};

// const Plane = ({ size }: { size: number }) => (
//   <mesh
//     rotation={[-Math.PI / 2, 0, 0]}
//     position={[0, -size * 1.5, 5]}
//     receiveShadow={true}
//   >
//     <planeBufferGeometry attach="geometry" args={[20, 20]} />
//     <meshStandardMaterial
//       color='pink'
//       attach="material"
//       side={DoubleSide}
//       roughness={0}
//     />
//   </mesh>
// );

const YouLose = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 10vw;
  text-align: center;
  color: pink;
`;

const Buttons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100vw;
  bottom: 2rem;
  button {
    width: 100%;
    height: 2rem;
  }
`;

const left = () => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
};

const right = () => {
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));
};

export default function GameWrapper(props: GameProps) {
  const theme = useContext(ThemeContext);

  const cubeMap = useMemo(() => buildCubeMap(props.size), [props.size]);
  const [state, dispatch] = useGameState(cubeMap);

  useEffect(() => {
    if (props.start) {
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