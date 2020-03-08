import React, { useContext, useMemo } from 'react';

import { ThemeContext } from 'styled-components';
import { Vector3, CylinderBufferGeometry, BackSide } from 'three';

import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';

type Props = {
  size: number;
};

const Cube = React.memo(({ size }: Props) => {
  const theme = useContext(ThemeContext);

  return (
    <group>
      <Grid size={size} color={theme.secondary}></Grid>
      {/* 
      transparent inner box */}
      <mesh>
        <boxBufferGeometry
          attach="geometry"
          args={[size - 0.05, size - 0.05, size - 0.05]}
        />
        <meshBasicMaterial
          attach="material"
          color={theme.background.from}
          transparent={true}
          opacity={0.5}
          side={BackSide}
        />
      </mesh>
    </group>
  );
});

type GridProps = Props & { color: string };

const Grid = ({ size, color }: GridProps) => {
  const gridGeometry = useMemo(() => createGrid(size), [size]);
  return (
    <mesh geometry={gridGeometry}>
      <meshPhysicalMaterial
        attach="material"
        color={color}
        roughness={0.8}
        clearcoat={0.1}
        reflectivity={0.2}
        metalness={0.3}
      />
    </mesh>
  );
};

const lineThickness = 0.02;
const radialSegments = 3;

// Grid is created by generating a single side and copy to all the other sides of the cube
// All sides are then merged together into one geometry for simplicity and performance
const createGrid = (size: number) => {
  const lines: any = [];

  const start = new Vector3(size / 2, 0, size / 2);

  for (let i = 0; i <= size; i++) {
    const line = new CylinderBufferGeometry(
      lineThickness,
      lineThickness,
      size,
      radialSegments
    );
    line.translate(start.x, start.y, start.z);
    const rotate = line.clone().rotateZ(Math.PI / 2);
    lines.push(line, rotate);
    start.add(new Vector3(-1, 0, 0));
  }

  const gridSide = BufferGeometryUtils.mergeBufferGeometries(lines, false);

  const back = gridSide.clone().rotateY(Math.PI);
  const bottom = gridSide.clone().rotateX(Math.PI / 2);
  const top = bottom.clone().translate(0, size, 0);
  const right = gridSide.clone().rotateY(Math.PI / 2);
  const left = right.clone().translate(-size, 0, 0);

  const grid = BufferGeometryUtils.mergeBufferGeometries(
    [gridSide, bottom, top, left, right, back],
    false
  );
  return grid;
};

export default Cube;
