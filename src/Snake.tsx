import React, { useContext } from 'react';
import { Vector3, Euler, BoxBufferGeometry, Color } from 'three';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier';
import { ThemeContext } from 'styled-components';

import { PositionNode } from './PositionNode';
const modifier = new SubdivisionModifier(1);
const segments = 4;
const segmentSize = 1 - 0.05;
const cubeGeometry = new BoxBufferGeometry(
  segmentSize,
  segmentSize,
  0.5,
  segments,
  segments,
  2
);
// const smooth = cubeGeometry;
const smooth = modifier.modify(cubeGeometry);

const randomColor = () => '#' + ((Math.random() * 0xffffff) << 0).toString(16);

const startColor = new Color('#ab3');

type Props = {
  body: PositionNode[];
};

const colorMemo = {};

export default function Snake({ body }: Props) {
  return (
    <>
      {body.map((node, i) => (
        <SnakeSegment
          position={node.vector}
          rotation={node.euler}
          index={i}
          key={i}
        />
      ))}
    </>
  );
}

type SnakeSegmentProps = {
  position: [number, number, number] | Vector3;
  rotation: Euler;
  index: number;
};

export const SnakeSegment = ({ index, ...props }: SnakeSegmentProps) => {
  const theme = useContext(ThemeContext);
  if (!colorMemo[index]) colorMemo[index] = randomColor();

  return (
    <mesh {...props} geometry={smooth}>
      {/* <boxBufferGeometry
        attach="geometry"
        args={[segmentSize, segmentSize, 0.5]}
      /> */}
      <meshPhysicalMaterial
        attach="material"
        color={theme.snake}
        roughness={1}
      />
    </mesh>
  );
};
