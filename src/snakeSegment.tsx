import React from 'react';
import { Vector3 } from 'three';


type Props = {
  position: [number, number, number] | Vector3;
}

const segmentSize = 1 - .05;

export const SnakeSegment = (props: Props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[segmentSize, segmentSize, segmentSize]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

export class SnakeSegmentObject {
  position: Vector3;
  constructor(position: Vector3) {
    this.position = position;
  }
}

export default SnakeSegment;