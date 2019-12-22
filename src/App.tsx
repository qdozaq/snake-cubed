import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';

import Cube from './Cube';
import Rotation from './Rotation';
import Controller from './Controller';
import Snake from './Snake';
import Food from './Food';

import { buildCubeMap } from './map';
import GameStates from './GameStates';

const Container = styled.div`
  display: inline-flex;
  height: 100vh;
  width: 100vw;
`;

const SIZE = 3;
const SPEED = 2;

const cubeMap = buildCubeMap(SIZE);

const App = () => {
  const [gameState, setGameState] = useState<GameStates>(GameStates.PLAYING);
  return (
    <Container>
      {gameState == GameStates.LOSE && (
        <YouLose>
          <h1>
            YOU
            <br />
            LOSE
          </h1>
        </YouLose>
      )}
      <Canvas camera={{ position: [0, 0, SIZE * 2.5], far: 50 }}>
        <ambientLight intensity={1} />
        <spotLight
          intensity={2}
          position={[20, 10, 10]}
          angle={0.2}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <Rotation>
          <Cube size={SIZE} />
          {/* <axesHelper args={[SIZE * 2]}></axesHelper> */}
          <Controller
            map={cubeMap}
            speed={SPEED}
            gameState={gameState}
            setGameState={setGameState}
          >
            {state => {
              return (
                <>
                  <Food position={cubeMap[state.food].vector} />
                  <Snake body={state.snake}></Snake>
                </>
              );
            }}
          </Controller>
        </Rotation>
      </Canvas>
      <Buttons>
        <button onClick={left}>left</button>
        <button onClick={right}>right</button>
      </Buttons>
    </Container>
  );
};
export default App;

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
