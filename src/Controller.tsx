import React, {
  useReducer,
  useEffect,
  ReactNode,
  Reducer,
  useState
} from 'react';
import { useFrame } from 'react-three-fiber';

import { PositionNode, invertDirection, Direction } from './PositionNode';
import { CubeMap } from './map';

type Action = 'FORWARD' | 'LEFT' | 'RIGHT' | 'ADD';

export type State = {
  head: PositionNode;
  direction: string;
  snake: PositionNode[];
};

type Props = {
  map: CubeMap;
  speed: number;
  children: (state: State) => ReactNode;
};

let time = 0;

export default ({ map, speed, children }: Props) => {
  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, {
    head: map[0],
    direction: 'y',
    snake: [map[0]]
  });

  // const [snake, setSnake] = useState<PositionNode[]>([]);

  useFrame((_, delta) => {
    time += delta;

    if (speed > 0 && time > 1 / speed) {
      dispatch('FORWARD');
      time = 0;
    }
  });

  const move = (e: KeyboardEvent) => {
    switch (e.key.toUpperCase()) {
      case 'D':
      case 'ARROWRIGHT':
        dispatch('RIGHT');
        break;
      case 'A':
      case 'ARROWLEFT':
        dispatch('LEFT');
        break;
      case ' ':
        dispatch('ADD');
        break;
      default:
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', move as any);
    return () => {
      window.removeEventListener('keydown', move);
    };
  }, []);

  return <>{children(state)}</>;
};

const forwardNode = (head: PositionNode, direction: string) => {
  // check if going over edge and change direction accordingly
  if (head[direction] && head[direction].direction !== head.direction) {
    const newNode = head[direction];
    const newDirection = invertDirection(head.direction);
    return [newNode, newDirection];
  }

  if (!head[direction]) {
    console.log('uh oh');
    console.log({ head, direction });
    return [head, direction];
  }
  // continue forward
  return [head[direction], direction];
};

const reducer = (state: State, action: Action) => {
  const { head, direction, snake } = state;
  const currentSide = head.direction;
  let newDirection: string;

  switch (action) {
    case 'FORWARD':
      const [newHead, newDir] = forwardNode(head, direction);
      const newSnake = [newHead, ...snake.slice(0, -1)];
      return { head: newHead, direction: newDir, snake: newSnake };
    case 'LEFT':
      console.log('left');
      newDirection = turn('left', direction, currentSide);
      return { head, snake, direction: newDirection };
    case 'RIGHT':
      console.log('right');
      newDirection = turn('right', direction, currentSide);
      return { head, snake, direction: newDirection };
    case 'ADD':
      const [newHead2, newDir2] = forwardNode(head, direction);
      const newSnake2 = [newHead2, ...snake];
      return { head: newHead2, direction: newDir2, snake: newSnake2 };
    default:
      console.log('big error');
      console.log({ state });
      return state;
  }
};

const xAxis = ['y', '_z', '_y', 'z'];
const yAxis = ['z', '_x', '_z', 'x'];
const zAxis = ['y', 'x', '_y', '_x'];

const wrap = (array: any[], i: number) => {
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
  return turn === 'right' ? wrap(axis, i + additive) : wrap(axis, i - additive);
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
