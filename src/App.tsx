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

const App = () => {
  const [stats, setStats] = useState('somethinsomethingg');
  return (
    <Container>
      <Stats>
        {stats.split(',').map(line => (
          <p>{line}</p>
        ))}
      </Stats>
      <Canvas>
        <Cube size={2} onChange={e => setStats(inspect(e))} />
      </Canvas>
    </Container>
  );
};
export default App;
