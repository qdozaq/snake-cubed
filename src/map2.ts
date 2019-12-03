import { Vector3, Euler } from 'three';
export const makething = (size: number) => {

  const front = buildthing(size, new Euler(0, 0, 0));
  const top = buildthing(size, new Euler(Math.PI / -2, 0, 0)); // 90 deg up on X
  const back = buildthing(size, new Euler(0, Math.PI, 0)); // 180 deg on Y
  const bottom = buildthing(size, new Euler(Math.PI / 2, 0, 0)); // 90 deg down on X
  const right = buildthing(size, new Euler(0, Math.PI / 2, 0)); // 90 deg right on Y
  const left = buildthing(size, new Euler(0, Math.PI / -2, 0)); // 90 deg left on Y

  let index = 0;
  const frontNodes = front.map((v) => new Node(v, index++));
  const topNodes = top.map((v) => new Node(v, index++));
  const backNodes = back.map((v) => new Node(v, index++));
  const bottomNodes = bottom.map((v) => new Node(v, index++));
  const rightNodes = right.map((v) => new Node(v, index++));
  const leftNodes = left.map((v) => new Node(v, index++));

  //attach these somehow?
  // front can be calculated with the current scheme




  // attach(frontNodes, topNodes, Direction.Y, Direction.Z);


  return [...front, ...top, ...back, ...bottom, ...left, ...right];
};

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
  X = 1,
  Y = 2,
  Z = 3,
  // inverses
  X_ = -1,
  Y_ = -2,
  Z_ = -3
}

// const yAxisFaces = [0,5,2,4];
// const xAxisFaces = []
const findFace = (
  current: Face,
  x,
  y,
): Face => {

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
  index: number;
  x: number = -1;
  x_: number = -1;
  y: number = -1;
  y_: number = -1;
  z: number = -1;
  z_: number = -1;

  constructor(vector: Vector3, index: number = 0) {
    this.vector = vector;
    this.index = index;
  }
}





function blah(size: number) {
  const array = [];
  _blah(new Node(new Vector3(0, 0, 0)), array, 0, size);
}

function _blah(node: Node, array, index, size) {

}