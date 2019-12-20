import React from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';

import Cube from './Cube';
import Rotation from './Rotation';
import Controller from './Controller';
import SnakeSegment from './snakeSegment';
import Snake from './snake';

import { buildCubeMap } from './map';

const Container = styled.div`
  display: inline-flex;
  height: 100vh;
  width: 100vw;
`;

const SIZE = 5;
const SPEED = 2;

const cubeMap = buildCubeMap(SIZE);

const App = () => {
  return (
    <Container>
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
          <Controller map={cubeMap} speed={SPEED}>
            {state => {
              return <Snake body={state.snake}></Snake>;
            }}
          </Controller>
        </Rotation>
      </Canvas>
    </Container>
  );
};
export default App;
