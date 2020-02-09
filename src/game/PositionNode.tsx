import { Vector3, Euler } from 'three';

export enum Direction {
  X = 'x',
  Y = 'y',
  Z = 'z',
  // inverses
  _X = '_x',
  _Y = '_y',
  _Z = '_z'
}

export const invertDirection = (d: string) => (d[0] === '_' ? d[1] : '_' + d);

export class PositionNode {
  vector: Vector3;
  // Should probably consolidate these at some point
  direction: Direction;
  euler: Euler;
  index: number = -1;
  x?: PositionNode;
  y?: PositionNode;
  z?: PositionNode;
  _x?: PositionNode;
  _y?: PositionNode;
  _z?: PositionNode;

  constructor(vector: Vector3, direction: Direction, eular: Euler) {
    this.vector = vector;
    this.direction = direction;
    this.euler = eular;
  }
}
