import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, a } from 'react-spring/three';
import { Mesh, Vector3 } from 'three';

type Props = {
  children: React.ReactNode;
  distance: number;
};

let prevX = 0,
  prevY = 0;

const UP = new Vector3(0, 1, 0);

export default ({ children, distance }: Props) => {
  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const ref = useRef<Mesh>();

  const dampen = 100;
  const bindDrag = useDrag(
    ({ delta: [dx, dy] }) => {
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

        set({ rotation: [newY, newX, 0] });

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
