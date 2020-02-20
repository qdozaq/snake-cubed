import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, a } from 'react-spring/three';
import { Mesh, Vector3 } from 'three';
import { GameStates } from './useGameState';

type Props = {
  children: React.ReactNode;
  distance: number;
  state: GameStates;
};

let prevX = 0,
  prevY = 0;

const UP = new Vector3(0, 1, 0);

export default ({ children, distance, state }: Props) => {
  const [{ rotation }, set] = useSpring(() => ({
    rotation: [Math.PI / 4, Math.PI / 4 - Math.PI, 0]
  }));
  const ref = useRef<Mesh>();

  useEffect(() => {
    switch (state) {
      case GameStates.MENU:
        prevX = 0;
        prevY = 0;
        set({ rotation: [Math.PI / 4, Math.PI / 4 - Math.PI, 0], config: { mass: 5, tension: 40 } });
        break;
      case GameStates.PLAYING:
        set({ rotation: [0, 0, 0], config: { mass: 5, tension: 40 } });
        break;
      default:
    }
  }, [state]);


  const dampen = 100;
  const bindDrag = useDrag(
    ({ delta: [dx, dy], event }) => {
      event?.stopPropagation()
      const [x, y] = [dx / dampen, dy / dampen];

      if (ref.current) {
        // Calculate what direction the top of the cube is facing
        // and find the dot product with the world up axis
        // equals weather or not our objects are pointing up or down
        const pointingUp =
          UP.clone()
            .applyEuler(ref.current.rotation)
            .dot(UP) >= 0;

        const newX = pointingUp ? prevX + x : prevX - x;
        const newY = prevY + y;

        set({ rotation: [newY, newX, 0], config: { mass: 1, tension: 170, firction: 26 } });

        prevX = newX;
        prevY = newY;
      }
    },
    { pointerEvents: true }
  );

  return (
    <a.group {...bindDrag()} rotation={rotation} position={[0, 0, -distance]} ref={ref}>
      {children}
    </a.group>
  );
};
