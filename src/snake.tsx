import React, { useRef, useState, useEffect, useReducer, useMemo } from 'react';
import { Vector3, Euler } from 'three';
import * as three from 'three';

import SnakeSegment from './snakeSegment';
import { mapMove, makething, Direction } from './map2';
type Props = {
  size: number;
};

const Snake = ({ size }: Props) => {
  // const ref = useRef<three.Mesh>();
  const perimeter = size / 2;
  const front = useMemo(() => makething(size), [size]);
  console.log(front);
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
        //@ts-ignore trust me, i'm a programmer
        setIndex(i => front[i].y.index);
        break;
      case 'S':
      case 'ARROWDOWN':
        //@ts-ignore trust me, i'm a programmer
        setIndex(i => front[i]._y.index);
        break;
      case 'D':
      case 'ARROWRIGHT':
        //@ts-ignore trust me, i'm a programmer
        setIndex(i => front[i].x.index);
        break;
      case 'A':
      case 'ARROWLEFT':
        //@ts-ignore trust me, i'm a programmer
        setIndex(i => front[i]._x.index);
        break;
      case 'Q':
        // ref.current.translateX(-1).position.round();
        // setIndex(i => mapMove(i, front, -1, 0, size, Direction.Z, false));
        break;
      case 'E':
        // ref.current.translateX(-1).position.round();
        // setIndex(i => mapMove(i, front, -1, 0, size, Direction.Z_, false));
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

  return (
    // <SnakeSegment
    //   // position={[pos.x, pos.y, pos.z]}
    //   position={vec}
    // ></SnakeSegment>
    <>
      <SnakeSegment position={front[index].vector}></SnakeSegment>
      {/* {front.map((node, i) => (
        <SnakeSegment position={node.vector} key={i} />
      ))} */}
    </>
  );
};

class node {
  // position: [number, number, number];
  // x:node;
  constructor() { }
}

export default Snake;

