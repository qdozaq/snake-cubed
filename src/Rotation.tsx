import React from 'react';
import { useDrag } from 'react-use-gesture';
import { useSpring, a } from 'react-spring/three';

type Props = {
  children: React.ReactNode;
};

export default ({ children }: Props) => {
  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const dampen = 100;
  const bindDrag = useDrag(
    ({ movement: [mx, my], offset: [ox, oy], down, ...rest }) => {
      const [x, y] = [ox / dampen, oy / dampen];
      set({ rotation: [Math.abs(y) <= 1 ? y : Math.sign(y), x, 0] });
    },
    { pointerEvents: true }
  );

  return (
    <a.group {...bindDrag()} rotation={rotation}>
      {children}
    </a.group>
  );
};
