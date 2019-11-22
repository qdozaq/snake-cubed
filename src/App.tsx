import React, { useRef } from "react";
import THREE from "three";
import { Canvas, useFrame } from "react-three-fiber";

function Thing() {
  const ref = useRef<THREE.Mesh>();
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = ref.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={ref}
      onClick={e => console.log("click")}
      onPointerOver={e => console.log("hover")}
      onPointerOut={e => console.log("unhover")}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

const App = () => (
  <Canvas>
    <Thing></Thing>
  </Canvas>
);

export default App;
