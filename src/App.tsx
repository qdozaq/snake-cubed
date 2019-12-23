import React, { useRef } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

function Thing() {
  const ref = useRef<Mesh>();
  //@ts-ignore
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));
  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

const App = () => {
  return (
    <>
      <h1>why</h1>
      <Canvas>
        <Thing />
      </Canvas>
    </>
  );
};
export default App;
