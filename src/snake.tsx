import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useMemo,
  forwardRef
} from 'react';
import { Vector3, Euler } from 'three';
import * as three from 'three';

import { useFrame } from 'react-three-fiber';

import SnakeSegment from './snakeSegment';
import { mapMove, makething, Direction, invertDirection } from './map2';
import { RecyclerViewBackedScrollViewComponent } from 'react-native';
type Props = {
  size: number;
};

let time = 0;
const Snake = ({ size }: Props) => {
  // const ref = useRef<three.Mesh>();
  const perimeter = size / 2;
  const front = useMemo(() => makething(size), [size]);
  // const [pos, setPos] = useState({ x: 0, y: 0, z: perimeter });
  const [vec, setVec] = useState(new three.Vector3(0, 0, perimeter));
  const [pos, setPos] = useState({
    index: 0,
    direction: Direction.Y as string
  });

  const forward = () => {
    setPos(({ index, direction }) => {
      const currentNode = front[index];
      if (
        currentNode[direction] &&
        currentNode[direction].direction != currentNode.direction
      ) {
        const newIndex: number = currentNode[direction].index;
        const newDirection = invertDirection(currentNode.direction);
        return { index: newIndex, direction: newDirection };
      }
      if (currentNode[direction]) {
        return { index: currentNode[direction].index, direction };
      }
      // this shouldnt happen
      return { index, direction };
    });
  };

  useFrame((_, delta) => {
    time += delta;

    if (time > 0.5) {
      forward();
      time = 0;
    }
    // console.log(delta);
    // forward();
  });

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
        // setIndex(i => front[i].y.index);
        break;
      case 'S':
      case 'ARROWDOWN':
        //@ts-ignore trust me, i'm a programmer
        // setIndex(i => front[i]._y.index);
        break;
      case 'D':
      case 'ARROWRIGHT':
        //@ts-ignore trust me, i'm a programmer
        // setIndex(i => front[i].x.index);
        console.log('right');
        setPos(({ index, direction }) => {
          const currentSide = front[index].direction;
          const newDirection = turn('right', direction, currentSide);
          console.log({ index, direction, newDirection });
          return { index, direction: newDirection };
        });
        break;
      case 'A':
      case 'ARROWLEFT':
        //@ts-ignore trust me, i'm a programmer
        // setIndex(i => front[i]._x.index);
        console.log('left');
        setPos(({ index, direction }) => {
          const currentSide = front[index].direction;
          const newDirection = turn('left', direction, currentSide);
          console.log({ index, direction, newDirection });
          return { index, direction: newDirection };
        });
        break;
      case 'Q':
        // ref.current.translateX(-1).position.round();
        // setIndex(i => mapMove(i, front, -1, 0, size, Direction.Z, false));
        //@ts-ignore trust me, i'm a programmer
        // setIndex(i => front[i].z.index);
        break;
      case 'E':
        // ref.current.translateX(-1).position.round();
        // setIndex(i => mapMove(i, front, -1, 0, size, Direction.Z_, false));
        //@ts-ignore trust me, i'm a programmer
        // setIndex(i => front[i]._z.index);
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
      <SnakeSegment position={front[pos.index].vector}></SnakeSegment>
      {/* {front.map((node, i) => (
        <SnakeSegment position={node.vector} key={i} />
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

const xAxis = ['y', '_z', '_y', 'z'];
const yAxis = ['z', '_x', '_z', 'x'];
const zAxis = ['y', 'x', '_y', '_x'];

const wrap = (array: any[], i: number) => {
  // return array[i % array.length];
  if (i >= array.length) return array[i - array.length];
  if (i < 0) return array[array.length + i];
  return array[i];
};

const turnHelper = (
  axis: string[],
  direction: Direction | string,
  turn: 'left' | 'right',
  additive: number
) => {
  const i = axis.indexOf(direction);
  return turn == 'right' ? wrap(axis, i + additive) : wrap(axis, i - additive);
};

/**
 * Returns a new direction given your current direction and turn
 * @param turn
 * @param direction
 * @param side
 * @returns Direction
 */
const turn = (
  turn: 'left' | 'right',
  direction: Direction | string,
  side: Direction
) => {
  const { X, Y, Z, _X, _Y, _Z } = Direction;

  // for positive directions moving right on the axis equates to adding 1
  let turnAdditive = 1;
  switch (side) {
    case _X:
      turnAdditive = -1;
    case X:
      return turnHelper(xAxis, direction, turn, turnAdditive);
    case _Y:
      turnAdditive = -1;
    case Y:
      return turnHelper(yAxis, direction, turn, turnAdditive);
    case _Z:
      turnAdditive = -1;
    case Z:
      return turnHelper(zAxis, direction, turn, turnAdditive);
    default:
      return direction;
  }
};
