import React from 'react';

type Props = {
  size: number;
};

const Cube = ({ size }: Props) => {
  console.log('cube');
  return (
    <group>
      <mesh>
        <boxBufferGeometry
          attach="geometry"
          args={[size, size, size, size, size, size]}
        />
        <meshPhysicalMaterial
          attach="material"
          color="black"
          roughness={0.8}
          clearcoat={0.1}
          reflectivity={0.2}
          metalness={0.3}
          transparent={true}
          opacity={0.7}
          wireframe={true}
        />
      </mesh>
      <mesh>
        <boxBufferGeometry
          attach="geometry"
          args={[size - 1, size - 1, size - 1]}
        />
        <meshPhysicalMaterial
          attach="material"
          color="pink"
          roughness={0.8}
          clearcoat={0.1}
          reflectivity={0.2}
          metalness={0.3}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

export default Cube;
