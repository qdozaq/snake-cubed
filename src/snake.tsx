import React, { useRef, useState, useEffect, useReducer, useMemo } from 'react';
import { Vector3, Euler } from 'three';
import * as three from 'three';

import SnakeSegment from './snakeSegment';
type Props = {
  size: number;
};

const Snake = ({ size }: Props) => {
  // const ref = useRef<three.Mesh>();
  const perimeter = size / 2;
  const front = useMemo(() => makething(size), [size]);
  const [pos, setPos] = useState({ x: 0, y: 0, z: perimeter });
  const [vec, setVec] = useState(new three.Vector3(0, 0, perimeter));
  const [index, setIndex] = useState(0);

  const vector = new three.Vector3(1, 0, 0);
  // console.log(vector);

  const axis = new three.Vector3(0, 1, 0);
  const angle = Math.PI / 2;
  // console.log(pos, pos.x + size * pos.y, front[index]);

  // vector.applyAxisAngle(axis, angle);
  // console.log(vector.round());

  const move = (e: KeyboardEvent) => {
    switch (e.key.toUpperCase()) {
      case 'W':
      case 'ARROWUP':
        // ref.current.translateY(1).position.round();
        // setPos(prev => ({ ...prev, y: prev.y + 1 }));
        // setVec(vec.clone().applyEuler(new three.Euler(0, angle, 0)));
        setIndex(i => mapMove(i, front, 0, 1, size, false));

        break;
      case 'S':
      case 'ARROWDOWN':
        // ref.current.translateY(-1).position.round();
        // setPos(prev => ({ ...prev, y: prev.y - 1 }));
        setIndex(i => mapMove(i, front, 0, -1, size, false));
        break;
      case 'D':
      case 'ARROWRIGHT':
        // ref.current.translateX(1).position.round();
        // setPos(prev => ({ ...prev, x: prev.x + 1 }));
        setIndex(i => mapMove(i, front, 1, 0, size, false));
        break;
      case 'A':
      case 'ARROWLEFT':
        // ref.current.translateX(-1).position.round();
        setIndex(i => mapMove(i, front, -1, 0, size, false));
        break;
      default:
    }
  };

  //init stuff
  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.position.setZ((size - 1) / 2);
  //   }
  // }, []);

  useEffect(() => {
    window.addEventListener('keydown', move as any);
    return () => {
      window.removeEventListener('keydown', move);
    };
  }, []);

  mapMove(index, front, 0, 1, size, true);
  return (
    // <SnakeSegment
    //   // position={[pos.x, pos.y, pos.z]}
    //   position={vec}
    // ></SnakeSegment>
    <>
      <SnakeSegment position={front[index]}></SnakeSegment>
      {/* {front.map((v, i) => (
        <SnakeSegment position={v} key={i} />
      ))} */}
    </>
  );
};

class node {
  // position: [number, number, number];
  // x:node;
  constructor() {}
}

export default Snake;

const makething = (size: number) => {
  const front = buildthing(size, new three.Euler(0, 0, 0));
  const top = buildthing(size, new three.Euler(Math.PI / -2, 0, 0));
  const back = buildthing(size, new three.Euler(Math.PI, 0, 0));
  const bottom = buildthing(size, new three.Euler(Math.PI / 2, 0, 0));
  const right = buildthing(size, new three.Euler(0, Math.PI / 2, 0));
  const left = buildthing(size, new three.Euler(0, Math.PI / -2, 0));
  console.log(front);
  return [...front, ...top, ...back, ...bottom, ...left, ...right];
};

const buildthing = (size: number, direction: three.Euler) => {
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

const mapMove = (
  currentIndex: number,
  map: Vector3[],
  x: number,
  y: number,
  size: number,
  log
): number => {
  const panelSize = size * size;
  const currentPosition = map[currentIndex];

  const currentFace = Math.floor(currentIndex / panelSize);

  const currentRelativeIndex = currentIndex % panelSize;

  let rx = currentRelativeIndex % size;
  let ry = Math.floor(currentRelativeIndex / size);
  // console.log(currentPosition);
  if (log)
    console.log({ currentFace, currentRelativeIndex, currentIndex, rx, ry });

  rx += x;
  ry += y;

  let newRelativeIndex = rx + size * ry;
  let newIndex = newRelativeIndex + currentFace * panelSize;

  if (rx >= size || rx < 0 || ry >= size || ry < 0) {
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

// const yAxisFaces = [0,5,2,4];
// const xAxisFaces = []
const findFace = (current, x, y) => {
  // if(yAxisFaces.includes && x){
  //     if (y > 0) return 1;
  //     if (y < 0) return 3;
  // }

  // if

  switch (current) {
    case 0:
      if (x > 0) return 5; //make enums
      if (x < 0) return 4;
      if (y > 0) return 1;
      if (y < 0) return 3;
    case 1:
      if (x > 0) return 5; //make enums
      if (x < 0) return 4;
      if (y > 0) return 2;
      if (y < 0) return 0;
    case 2:
      if (x > 0) return 4; //make enums
      if (x < 0) return 5;
      if (y > 0) return 3;
      if (y < 0) return 1;
    case 3:
      if (x > 0) return 5; //make enums
      if (x < 0) return 4;
      if (y > 0) return 0;
      if (y < 0) return 2;
    case 4:
      if (x > 0) return 0; //make enums
      if (x < 0) return 2;
      if (y > 0) return 1;
      if (y < 0) return 3;
    case 5:
      if (x > 0) return 2; //make enums
      if (x < 0) return 0;
      if (y > 0) return 1;
      if (y < 0) return 3;
  }
  return 0;
};
