import React, { useState } from 'react';
import { Canvas } from 'react-three-fiber';
import styled from 'styled-components';

import Cube from './cube';

const Stats = styled.div`
  position: absolute;
  width: 20rem;
  height: auto;
  background-color: rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
`;

const App = () => {
  const [stats, setStats] = useState('somethinsomethingg');
  return (
    <>
      <Stats>{stats}</Stats>
      <Canvas>
        <Cube size={1} onChange={e => setStats(JSON.stringify(e))} />
      </Canvas>
    </>
  );
};
export default App;
