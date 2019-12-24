import React from 'react';

type Props = {
  size: number;
};

const Cube = ({ size }: Props) => {
  console.log('cube');
  return (
    <group>
      <mesh castShadow={true}>
        <boxBufferGeometry
          attach="geometry"
          args={[size, size, size, size, size, size]}
        />
        <meshPhysicalMaterial
          attach="material"
          color="#241229"
          roughness={0.8}
          clearcoat={0.1}
          reflectivity={0.2}
          metalness={0.3}
          // transparent={true}
          // opacity={0.}
          wireframe={true}
        />
      </mesh>
      <mesh castShadow={true}>
        <boxBufferGeometry
          attach="geometry"
          args={[size - 0.01, size - 0.01, size - 0.01]}
        />
        <meshBasicMaterial
          attach="material"
          color="#ff80ae"
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

export default Cube;
