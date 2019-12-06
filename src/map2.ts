import { Vector3, Euler } from 'three';
export const makething = (size: number) => {
  // const front = buildthing(size, new Euler(0, 0, 0));
  // const top = buildthing(size, new Euler(Math.PI / -2, 0, 0)); // 90 deg up on X
  // const back = buildthing(size, new Euler(0, Math.PI, 0)); // 180 deg on Y
  // const bottom = buildthing(size, new Euler(Math.PI / 2, 0, 0)); // 90 deg down on X
  // const right = buildthing(size, new Euler(0, Math.PI / 2, 0)); // 90 deg right on Y
  // const left = buildthing(size, new Euler(0, Math.PI / -2, 0)); // 90 deg left on Y

  const zSide = buildthingNode(size, Direction.Z);
  const ySide = buildthingNode(size, Direction.Y); // 90 deg up on X
  const _zSide = buildthingNode(size, Direction._Z); // 180 deg on Y
  const _ySide = buildthingNode(size, Direction._Y); // 90 deg down on X
  const xSide = buildthingNode(size, Direction.X); // 90 deg right on Y
  const _xSide = buildthingNode(size, Direction._X); // 90 deg left on Y

  attach(xSide, ySide, _ySide, zSide, _zSide);
  attach(_xSide, ySide, _ySide, zSide, _zSide);
  attach(ySide, _xSide, xSide, _zSide, zSide);
  attach(_ySide, _xSide, xSide, _zSide, zSide);
  attach(zSide, ySide, _ySide, _xSide, xSide);
  attach(_zSide, ySide, _ySide, _xSide, xSide);

  return [...zSide, ...ySide, ..._ySide, ...xSide, ..._xSide, ..._zSide].map(
    (node, i) => {
      node.index = i;
      return node;
    }
  );

  // const frontNodes = front.map((v) => new Node(v));
  // const topNodes = top.map((v) => new Node(v));
  // const backNodes = back.map((v) => new Node(v));
  // const bottomNodes = bottom.map((v) => new Node(v));
  // const rightNodes = right.map((v) => new Node(v));
  // const leftNodes = left.map((v) => new Node(v));

  //attach these somehow?
  // front can be calculated with the current scheme

  // attach(frontNodes, topNodes, Direction.Y, Direction.Z);

  // return [...front, ...top, ...back, ...bottom, ...left, ...right];
};

const attach = (main: Node[], ...sides: Node[][]) => {
  sides.forEach(side => connectEdge(main, side));
  // const mainDirection = main[0].direction;
  // // direction other planes should be looking
  // // const nonMainConnectingEdge = invertDirection(mainDirection);
  // const [rx, ry] = relativeCoordsMap[mainDirection];
  // const _rx = invertDirection(rx);

  // let i = 0;
  // // find node that does not have _z value and _x value aka top left for main
  // while (!top[i][mainDirection] && top[i][_rx]) {
  //   i++;
  // }
  // let topEdge = top[i];
  // let col = size - 1; // start top left
  // let row = 0;
  // const index = row + size * col;
  // let mainTopEdge = main[index];

  // i = 0;
  // while (i < size) {
  //   mainTopEdge[ry] = topEdge;
  //   topEdge[mainDirection] = mainTopEdge;
  //   // move in main plane's x direction
  //   mainTopEdge = mainTopEdge[rx];
  //   topEdge = topEdge[rx];
  //   i++;
  // }
};

//face cant connect to it self and cant connect to it's inverted face
// given a face that points Y face should go up until Y is undefined
// Y face should point toward the other face until undefined
// how to find matching corner? just pick one?
// satisfy condition - direction != side1 direction or side2 direction and niether of their inverts

// conectEdge(node1, node2, direction, size)?

const memo = {};
const connectEdge = (node1: Node[], node2: Node[]) => {
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
  // the direction we want to connect in
  // const connection1 = invertDirection(direction1);
  // const connection2 = invertDirection(direction2);

  // these should terminate at the same time
  while (tempNode1 != undefined && tempNode2 != undefined) {
    tempNode1[direction2] = tempNode2;
    tempNode2[direction1] = tempNode1;
    tempNode1 = tempNode1[endDirection];
    tempNode2 = tempNode2[endDirection];
  }
  return;
};

// just find the nodes and connect in given direction?

const buildthingNode = (size: number, direction: Direction) => {
  const panel: Node[] = [];
  // the amount the shift each plane to match cube origin
  const shift = (size - 1) * -0.5;
  const perimeter = size / 2;

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      const vec = new Vector3(row, col, perimeter);
      // shift to center
      vec.add(new Vector3(shift, shift, 0));
      // rotate to direction
      vec.applyEuler(directionToEularMap[direction]);

      panel.push(new Node(vec, direction));
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

const thing = 0;

const invertDirection = (d: string) => (d[0] === '_' ? d[1] : '_' + d);

const buildthing = (size: number, direction: Euler) => {
  const panel: Vector3[] = [];
  // the amount the shift each plane to match cube origin
  const shift = (size - 1) * -0.5;
  const perimeter = size / 2;

  for (let col = 0; col < size; col++) {
    for (let row = 0; row < size; row++) {
      const vec = new Vector3(row, col, perimeter);
      // shift to center
      vec.add(new Vector3(shift, shift, 0));
      // rotate
      vec.applyEuler(direction);
      panel.push(vec);
      // panel[col][row] = vec;
    }
  }

  return panel;
};

export const mapMove = (
  currentIndex: number,
  map: Vector3[],
  x: number,
  y: number,
  size: number,
  direction: Direction,
  log
): number => {
  const panelSize = size * size;
  const currentPosition = map[currentIndex];

  const currentFace = Math.floor(currentIndex / panelSize);

  const currentRelativeIndex = currentIndex % panelSize;

  let rx = currentRelativeIndex % size;
  let ry = Math.floor(currentRelativeIndex / size);
  // console.log(currentPosition);

  console.log({ currentFace, currentRelativeIndex, currentIndex, rx, ry });
  // relative coordinates
  rx += x;
  ry += y;

  let newRelativeIndex = rx + size * ry;
  let newIndex = newRelativeIndex + currentFace * panelSize;

  if (rx >= size || rx < 0 || ry >= size || ry < 0) {
    // TODO: need to figure out how to interpret the new direction and find the correct index on the new face
    const newFace = findFace(currentFace, x, y);
    if (x) {
      rx = rx < 0 ? rx + size : rx - size;
    }
    if (y) {
      ry = ry < 0 ? ry + size : ry - size;
    }

    newRelativeIndex = rx + size * ry;
    newIndex = newRelativeIndex + newFace * panelSize;
  }

  return newIndex;
};

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

enum Face {
  FRONT = 0,
  TOP = 1,
  BACK = 2,
  BOTTOM = 3,
  LEFT = 4,
  RIGHT = 5
}

// clamp version
// enum Face {
//   FRONT = 0,
//   TOP = 1,
//   BACK = 2,
//   LEFT = 3,
//   BOTTOM = 4,
//   RIGHT = 5
// }

export enum Direction {
  X = 'x',
  Y = 'y',
  Z = 'z',
  // inverses
  _X = '_x',
  _Y = '_y',
  _Z = '_z'
}

const directionToEularMap = {
  x: new Euler(0, Math.PI / 2, 0),
  y: new Euler(Math.PI / -2, 0, 0),
  z: new Euler(0, 0, 0),
  _x: new Euler(0, Math.PI / -2, 0),
  _y: new Euler(Math.PI / 2, 0, 0),
  _z: new Euler(0, Math.PI, 0)
};

// const yAxisFaces = [0,5,2,4];
// const xAxisFaces = []
const findFace = (current: Face, x, y): Face => {
  switch (current) {
    case Face.FRONT:
      if (x > 0) return Face.RIGHT;
      if (x < 0) return Face.LEFT;
      if (y > 0) return Face.TOP;
      if (y < 0) return Face.BOTTOM;
    case Face.TOP:
      if (x > 0) return Face.RIGHT;
      if (x < 0) return Face.LEFT;
      if (y > 0) return Face.BACK;
      if (y < 0) return Face.FRONT;
    case Face.BACK:
      if (x > 0) return Face.LEFT;
      if (x < 0) return Face.RIGHT;
      if (y > 0) return Face.TOP;
      if (y < 0) return Face.BOTTOM;
    case Face.BOTTOM:
      if (x > 0) return Face.RIGHT;
      if (x < 0) return Face.LEFT;
      if (y > 0) return Face.FRONT;
      if (y < 0) return Face.BACK;
    case Face.LEFT:
      if (x > 0) return Face.FRONT;
      if (x < 0) return Face.BACK;
      if (y > 0) return Face.TOP;
      if (y < 0) return Face.BOTTOM;
    case Face.RIGHT:
      if (x > 0) return Face.BACK;
      if (x < 0) return Face.FRONT;
      if (y > 0) return Face.TOP;
      if (y < 0) return Face.BOTTOM;
  }
  return 0;
};

class Node {
  vector: Vector3;
  direction: Direction;
  index: number = -1;
  x?: Node;
  y?: Node;
  z?: Node;
  _x?: Node;
  _y?: Node;
  _z?: Node;

  constructor(vector: Vector3, direction: Direction) {
    this.vector = vector;
    this.direction = direction;
  }
}
