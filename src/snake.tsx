import React from 'react';
import { Vector3 } from 'three';

import { PositionNode } from './PositionNode';

type Props = {
  body: PositionNode[];
};

export default function Snake({ body }: Props) {
  return (
    <>
      {body.map(node => (
        <SnakeSegment position={node.vector} />
      ))}
    </>
  );
}

const segmentSize = 1 - 0.05;

type SnakeSegmentProps = {
  position: [number, number, number] | Vector3;
};

export const SnakeSegment = (props: SnakeSegmentProps) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry
        attach="geometry"
        args={[segmentSize, segmentSize, segmentSize]}
      />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};
