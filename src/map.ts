import { Vector3, Euler } from 'three';

import { PositionNode, Direction, invertDirection } from './PositionNode';

export type CubeMap = PositionNode[];

export const buildCubeMap = (size: number): CubeMap => {
  const zSide = buildSide(size, Direction.Z);
  const ySide = buildSide(size, Direction.Y); // 90 deg up on X
  const _zSide = buildSide(size, Direction._Z); // 180 deg on Y
  const _ySide = buildSide(size, Direction._Y); // 90 deg down on X
  const xSide = buildSide(size, Direction.X); // 90 deg right on Y
  const _xSide = buildSide(size, Direction._X); // 90 deg left on Y

  attach(xSide, ySide, _ySide, zSide, _zSide);
  attach(_xSide, ySide, _ySide, zSide, _zSide);
  attach(ySide, _xSide, xSide, _zSide, zSide);
  attach(_ySide, _xSide, xSide, _zSide, zSide);
  attach(zSide, ySide, _ySide, _xSide, xSide);
  attach(_zSide, ySide, _ySide, _xSide, xSide);

  let index = 0;
  const cube = [
    ...zSide,
    ...ySide,
    ..._ySide,
    ...xSide,
    ..._xSide,
    ..._zSide
  ].map(node => {
    node.index = index++;
    return node;
  });

  return cube;
};

const attach = (main: PositionNode[], ...sides: PositionNode[][]) => {
  sides.forEach(side => connectEdge(main, side));
};

const memo = {};

const connectEdge = (node1: PositionNode[], node2: PositionNode[]) => {
  const direction1 = node1[0].direction;
  const direction2 = node2[0].direction;

  // if we've seen this edge combination before just ignore it
  const memoVal = [direction1, direction2].sort().toString();
  if (memo[memoVal]) return;

  memo[memoVal] = true;

  let r1 = relativeCoordsMap[direction1];
  let r2 = relativeCoordsMap[direction2];
  // add the inverted relative coordinates
  r1 = r1.concat(r1.map(invertDirection));
  r2 = r2.concat(r2.map(invertDirection));

  console.log(r1, r2);
  // find the first value that they have shared
  let i = 0;
  while (!r1.includes(r2[i])) i++;

  const sharedDirection = r2[i];

  // go max direction towards side 2 and shared direction
  let tempNode1 = node1[0];
  while (tempNode1[direction2] != undefined) {
    tempNode1 = tempNode1[direction2]!;
  }
  // Additional check to make sure we don't continue to another side
  while (
    tempNode1[sharedDirection] != undefined &&
    tempNode1[sharedDirection].direction == direction1
  ) {
    tempNode1 = tempNode1[sharedDirection]!;
  }

  // go max direction towards side 1 and shared direction
  let tempNode2 = node2[0];
  while (tempNode2[direction1] != undefined) {
    tempNode2 = tempNode2[direction1]!;
  }
  // Additional check to make sure we don't continue to another side
  while (
    tempNode2[sharedDirection] != undefined &&
    tempNode2[sharedDirection].direction == direction2
  ) {
    tempNode2 = tempNode2[sharedDirection]!;
  }

  // follow this direction till we reach undefined
  const endDirection = invertDirection(sharedDirection);

  // while both are not undefined
  // AND neither has gone to a node not on their side
  while (
    tempNode1 != undefined &&
    tempNode2 != undefined &&
    tempNode1.direction == direction1 &&
    tempNode2.direction == direction2
  ) {
    tempNode1[direction2] = tempNode2;
    tempNode2[direction1] = tempNode1;
    tempNode1 = tempNode1[endDirection];
    tempNode2 = tempNode2[endDirection];
  }
  return;
};

const buildSide = (size: number, direction: Direction) => {
  const panel: PositionNode[] = [];
  // the amount the shift each plane to match cube origin
  const shift = (size - 1) * -0.5;
  const perimeter = size / 2;

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      const vec = new Vector3(row, col, perimeter);
      // shift to center
      vec.add(new Vector3(shift, shift, 0));
      // rotate to direction
      const euler = directionToEularMap[direction];
      vec.applyEuler(euler);

      panel.push(new PositionNode(vec, direction, euler));
    }
  }

  const [rx, ry] = relativeCoordsMap[direction];
  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      const current = row + size * col;
      const x = row + 1 + size * col;
      const y = row + size * (col + 1);

      // Link nodes

      if (row + 1 < size) {
        panel[current][rx] = panel[x];
        panel[x][invertDirection(rx)] = panel[current];
      }

      if (col + 1 < size) {
        panel[current][ry] = panel[y];
        panel[y][invertDirection(ry)] = panel[current];
      }
    }
  }

  return panel;
};

// map a direction's plane to it's local [x,y] coordinates
// should probably change to function
const relativeCoordsMap = {
  x: ['_z', 'y'],
  y: ['x', '_z'],
  z: ['x', 'y'],
  _x: ['z', 'y'],
  _y: ['x', 'z'],
  _z: ['_x', 'y']
};

const directionToEularMap = {
  x: new Euler(0, Math.PI / 2, 0),
  y: new Euler(Math.PI / -2, 0, 0),
  z: new Euler(0, 0, 0),
  _x: new Euler(0, Math.PI / -2, 0),
  _y: new Euler(Math.PI / 2, 0, 0),
  _z: new Euler(0, Math.PI, 0)
};
