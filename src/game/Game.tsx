import React, { useState, useContext, useMemo, useEffect } from 'react';
import { Canvas, CanvasProps, useThree } from 'react-three-fiber';
import styled, { ThemeContext } from 'styled-components';

import Cube from './Cube';
import Rotation from './Rotation';
import { useGameState, GameStates } from './useGameState';
import Snake from './Snake';
import Food from './Food';

import { buildCubeMap } from './map';

const Container = styled.div`
  display: inline-flex;
  height: 100vh;
  width: 100vw;
  background-image: ${({ theme }) => `radial-gradient(${theme.background.from} 80%, ${theme.background.to})`};
`;

type GameProps = {
  size: number;
  speed: number;
  start: boolean;
}

const Game = ({ size, speed, start }: GameProps) => {
  const cubeMap = useMemo(() => buildCubeMap(size), [size]);
  // const [gameState, setGameState] = useState<GameStates>(GameStates.PLAYING);
  const { gameState, food, snake } = useGameState(cubeMap, speed);

  return (
    // <Container>
    //   {gameState == GameStates.LOSE && (
    //     <YouLose>
    //       <h1>
    //         YOU
    //         <br />
    //         LOSE
    //       </h1>
    //     </YouLose>
    //   )}
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
      <Rotation distance={size * 1.2} start={start}>
        <Cube size={size} />
        {/* <axesHelper args={[SIZE * 2]}></axesHelper> */}
        <Food position={food.vector} />
        <Snake body={snake} />
      </Rotation>
    </>
    // {/* <Buttons>
    //   <button onClick={left}>left</button>
    //   <button onClick={right}>right</button>
    // </Buttons> */}
    // </Container>
  );
};

export default (props: GameProps) => (
  <CanvasWithProviders camera={{ far: 1000 }} shadowMap>
    <Game {...props}></Game>
  </CanvasWithProviders>
)

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


// Work around for react-three-fiber canvas reconciler mangling providers
function CanvasWithProviders({ children, ...props }: CanvasProps) {
  const theme = useContext(ThemeContext);
  return (
    //@ts-ignore props mismatch
    <Canvas {...props}>
      <ThemeContext.Provider value={theme}>
        {children}
      </ThemeContext.Provider>
    </Canvas>
  )
}