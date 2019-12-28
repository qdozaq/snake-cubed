import React from 'react';

import { ThemeContext } from 'styled-components';

type Props = {
  size: number;
};

const Cube = ({ size }: Props) => {
  const theme = React.useContext(ThemeContext);

  return (
    <group>
      {/* 
      grid box */}
      <mesh castShadow={true}>
        <boxBufferGeometry
          attach="geometry"
          args={[size, size, size, size, size, size]}
        />
        <meshPhysicalMaterial
          attach="material"
          color={theme.cube}
          roughness={0.8}
          clearcoat={0.1}
          reflectivity={0.2}
          metalness={0.3}
          wireframe={true}
        />
      </mesh>
      {/* 
      transparent inner box */}
      <mesh castShadow={true}>
        <boxBufferGeometry
          attach="geometry"
          args={[size - 0.01, size - 0.01, size - 0.01]}
        />
        <meshBasicMaterial
          attach="material"
          color={theme.background}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

export default Cube;
