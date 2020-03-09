import { useReducer, useEffect, Reducer, useState, Dispatch } from 'react';

import { PositionNode, invertDirection, Direction } from './PositionNode';
import { CubeMap } from './map';

export enum GameStates {
  MENU,
  START,
  PLAYING,
  LOSE,
  WIN
}

type InitAction = { type: 'INIT'; payload: { map: CubeMap } };
type ResetAction = { type: 'RESET'; payload: { map: CubeMap } };
type ForwardAction = {
  type: 'FORWARD';
};
type LeftAction = { type: 'LEFT' };
type RightAction = { type: 'RIGHT' };
type PlayAction = { type: 'PLAY' };

type Action =
  | ForwardAction
  | LeftAction
  | RightAction
  | InitAction
  | PlayAction
  | ResetAction;

export type State = {
  direction: string;
  snake: PositionNode[];
  emptySpaces: number[];
  food: PositionNode;
  gameState: GameStates;
};

export type GameDispatch = Dispatch<Action>;

// lock 'locks' user input so that the snake can't turn multiple times before moving forward
// let lock = false;
let lock = false;

let _map: CubeMap | null = null;

export const useGameState = (map: CubeMap): [State, GameDispatch] => {
  const [snakeVisible, setSnakeVisible] = useState(true);
  const [state, dispatch] = useReducer<Reducer<State, Action>, any>(
    reducer,
    {
      direction: 'y',
      snake: [map[0]],
      emptySpaces: new Array(map.length - 1).fill(1).map((_, i) => i + 1),
      food: null,
      gameState: GameStates.MENU
    },
    (state: State) => {
      const index =
        state.emptySpaces[Math.floor(Math.random() * state.emptySpaces.length)];

      return {
        ...state,
        food: map[index]
      };
    }
  );

  useEffect(() => {
    // this is probably bad design, idk
    _map = map;
    dispatch({ type: 'RESET', payload: { map } });
  }, [map.length]);

  useEffect(() => {
    window.addEventListener('keydown', move as any);
    return () => {
      window.removeEventListener('keydown', move);
    };
  }, []);

  const move = (e: KeyboardEvent) => {
    switch (e.key.toUpperCase()) {
      case 'D':
      case 'ARROWRIGHT':
        dispatch({ type: 'RIGHT' });
        break;
      case 'A':
      case 'ARROWLEFT':
        dispatch({ type: 'LEFT' });
        break;
      default:
    }
  };

  const returnedState = snakeVisible ? state : { ...state, snake: [] };

  return [returnedState, dispatch];
};

const forwardNode = (
  head: PositionNode,
  direction: string
): [PositionNode, string] => {
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
  const { direction, snake, food } = state;
  const head = snake[0];
  const currentSide = head.direction;
  let newDirection: string;
  let map: CubeMap;
  let gameState = state.gameState;

  switch (action.type) {
    case 'INIT':
      gameState = GameStates.MENU;
    case 'RESET':
      map = action.payload.map;
      const empty = new Array(map.length - 1).fill(1).map((_, i) => i + 1);
      const foodIndex = empty[Math.floor(Math.random() * empty.length)];
      return {
        ...state,
        direction: 'y',
        snake: [map[0]],
        emptySpaces: empty,
        food: map[foodIndex],
        gameState
      };
    case 'PLAY':
      return { ...state, gameState: GameStates.PLAYING };
    case 'FORWARD':
      const [newHead, newDir] = forwardNode(head, direction);
      if (!_map) {
        return state;
      }

      lock = false;
      if (newHead.index === food.index) {
        const newSnake = [newHead, ...snake];
        // need to filter out from all the indexs not the ones already in empty spaces
        const newEmptySpaces = _map.reduce((agg: number[], node) => {
          if (!newSnake.some(s => s.index === node.index)) agg.push(node.index);
          return agg;
        }, []);
        const newFoodIndex =
          newEmptySpaces[Math.floor(Math.random() * newEmptySpaces.length)];
        return {
          ...state,
          direction: newDir,
          snake: newSnake,
          food: _map[newFoodIndex],
          emptySpaces: newEmptySpaces
        };
      }
      const newSnake = [newHead, ...snake.slice(0, -1)];

      if (
        newSnake.some((segment, i) => i > 0 && segment.index === newHead.index)
      ) {
        return { ...state, gameState: GameStates.LOSE };
      }
      return { ...state, direction: newDir, snake: newSnake };

    case 'LEFT':
      if (lock) {
        return state;
      }
      lock = true;
      console.log('left');
      newDirection = turn('left', direction, currentSide);
      return { ...state, direction: newDirection };
    case 'RIGHT':
      if (lock) {
        return state;
      }
      lock = true;
      console.log('right');
      newDirection = turn('right', direction, currentSide);
      return { ...state, direction: newDirection };
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
