import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';
import { inspect } from 'util';

import Cube from './cube';

const Container = styled.div`
  display: inline-flex;
  height: 100vh;
  width: 100vw;
`;

const Stats = styled.div`
  top: 0;
  width: auto;
  min-width: 20em;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: scroll;
  word-wrap: break-all;
  /* line-height: 0.25rem; */
  color: grey;
`;

const SIZE = 3;
const App = () => {
  const [stats, setStats] = useState('somethinsomethingg');
  return (
    <Container>
      {/* <Stats>
        {stats.split(',').map(line => (
          <p>{line}</p>
        ))}
      </Stats> */}
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
        <Cube size={SIZE} />
      </Canvas>
    </Container>
  );
};
export default App;
