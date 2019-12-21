import React, { useRef } from 'react';
import { Vector3, Color, Mesh } from 'three';
import { useFrame } from 'react-three-fiber';

type Props = {
  position: Vector3;
};

const FOOD_SIZE = 0.5;
const COLOR = new Color('yellow');

export default function Food({ position }: Props) {
  const ref = useRef<Mesh>();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = ref.current.rotation.x += 0.02;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <boxBufferGeometry
        attach="geometry"
        args={[FOOD_SIZE, FOOD_SIZE, FOOD_SIZE]}
      />
      <meshPhysicalMaterial
        attach="material"
        color="yellow"
        roughness={0.8}
        clearcoat={0.1}
        reflectivity={0.2}
        metalness={0.3}
        emissive={COLOR}
      />
    </mesh>
  );
}
