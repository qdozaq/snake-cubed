import { Vector3, Euler } from 'three';
export const makething = (size: number) => {
  // Imagine 2 rectangles each one size x size*3
  // Each forms and a "[" shape so that when both go together we have a whole box
  // first half on same "plane". Index 0 to (size^2 * 3)-1
  const front = buildthing(size, new Euler(0, 0, 0));
  const top = buildthing(size, new Euler(Math.PI / -2, 0, 0));
  const back = buildthing(size, new Euler(Math.PI, 0, 0));
  const part1 = [...front, ...top, ...back];

  // const left = buildthing(size, new three.Euler(0, 0, 0));
  // const bottom = buildthing(size, new three.Euler(Math.PI / -2, 0, 0));
  // const right = buildthing(size, new three.Euler(Math.PI, 0, 0));

  // second half reflection of part1 "plane". Index (size^2 * 3) to (size^2 * 6)-1
  // with half turn on Y and full turn on X to place in the right position
  const part2 = part1.map(v => v.clone().applyEuler(new Euler(0, Math.PI / -2, 0)).applyEuler(new Euler(Math.PI, 0, 0)));
  return [...part1, ...part2];


  // const front = buildthing(size, new three.Euler(0, 0, 0));
  // const top = buildthing(size, new three.Euler(Math.PI / -2, 0, 0));
  // const back = buildthing(size, new three.Euler(0, Math.PI, 0));
  // const bottom = buildthing(size, new three.Euler(Math.PI / 2, 0, 0));
  // const right = buildthing(size, new three.Euler(0, Math.PI / 2, 0));
  // const left = buildthing(size, new three.Euler(0, Math.PI / -2, 0));

  console.log(front);
  // return [...front, ...top, ...back, ...bottom, ...left, ...right];
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
    const [newFace, newDirection] = findFace(currentFace, x, y, direction);
    switch (newDirection) {
      case Direction.Y_:
    }
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

// enum Face {
//   FRONT = 0,
//   TOP = 1,
//   BACK = 2,
//   BOTTOM = 3,
//   LEFT = 4,
//   RIGHT = 5
// }

// clamp version
enum Face {
  FRONT = 0,
  TOP = 1,
  BACK = 2,
  LEFT = 3,
  BOTTOM = 4,
  RIGHT = 5
}

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
  direction: Direction
): [Face, Direction] => {
  // if(yAxisFaces.includes && x){
  //     if (y > 0) return Face.TOP;
  //     if (y < 0) return 3;
  // }

  // if

  let newFace = -1;
  switch (current) {
    case Face.FRONT:
      switch (direction) {
        case Direction.X:
          newFace = Face.RIGHT;
          break;
        case Direction.X_:
          newFace = Face.LEFT;
          break;
        case Direction.Y:
          newFace = Face.TOP;
          break;
        case Direction.Y_:
          newFace = Face.BOTTOM;
          break;
      }
      return [newFace, Direction.Z_];
    // if (x > 0) return [Face.RIGHT, Direction.Z_];
    // if (x < 0) return [Face.LEFT, Direction.Z_];
    // if (y > 0) return [Face.TOP, Direction.Z_];
    // if (y < 0) return [Face.BOTTOM, Direction.Z_];
    case Face.TOP:
      switch (direction) {
        case Direction.Z:
        case Direction.Z_:
        case Direction.X:
        case Direction.X_:
          return [Face.LEFT, Direction.Y_]; //tuple newface, newdirection
      }
    // if (x > 0) return Face.RIGHT;
    // if (x < 0) return Face.LEFT;
    // if (y > 0) return Face.BACK;
    // if (y < 0) return Face.FRONT;
    // case Face.BACK:
    //   if (x > 0) return Face.LEFT;
    //   if (x < 0) return Face.RIGHT;
    //   if (y > 0) return Face.TOP;
    //   if (y < 0) return Face.BOTTOM;
    // case Face.BOTTOM:
    //   if (x > 0) return Face.RIGHT;
    //   if (x < 0) return Face.LEFT;
    //   if (y > 0) return Face.FRONT;
    //   if (y < 0) return Face.BACK;
    // case Face.LEFT:
    //   if (x > 0) return Face.FRONT;
    //   if (x < 0) return Face.BACK;
    //   if (y > 0) return Face.TOP;
    //   if (y < 0) return Face.BOTTOM;
    // case Face.RIGHT:
    //   if (x > 0) return Face.BACK;
    //   if (x < 0) return Face.FRONT;
    //   if (y > 0) return Face.TOP;
    //   if (y < 0) return Face.BOTTOM;
  }
  // return 0;
  return [0, 0];
};