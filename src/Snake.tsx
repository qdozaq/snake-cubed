import React from 'react';
import { Vector3, Euler, BoxBufferGeometry } from 'three';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier';

import { PositionNode } from './PositionNode';
const modifier = new SubdivisionModifier(2);
const segments = 3;
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

type Props = {
  body: PositionNode[];
};

export default function Snake({ body }: Props) {
  return (
    <>
      {body.map(node => (
        <SnakeSegment position={node.vector} rotation={node.euler} />
      ))}
    </>
  );
}

type SnakeSegmentProps = {
  position: [number, number, number] | Vector3;
  rotation: Euler;
};

export const SnakeSegment = (props: SnakeSegmentProps) => {
  return (
    <mesh {...props} castShadow={true} geometry={smooth}>
      {/* <boxBufferGeometry
        attach="geometry"
        args={[segmentSize, segmentSize, 0.5]}
      /> */}
      <meshPhysicalMaterial attach="material" color="#966BC2" />
    </mesh>
  );
};
