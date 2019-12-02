import React, { useRef, useEffect, useState } from 'react';
import * as three from 'three';
// import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier';
import { useDrag } from 'react-use-gesture';
import { useSpring, a } from 'react-spring/three';
import Snake from './snake';

type Props = {
  size: number;
};

const Cube = React.memo(({ size }: Props) => {
  const ref = useRef<three.Mesh>();

  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const dampen = 100;
  const bindDrag = useDrag(
    ({ movement: [mx, my], offset: [ox, oy] }) => {
      const [x, y] = [ox / dampen, oy / dampen];

      set({ rotation: [Math.abs(y) <= 1 ? y : Math.sign(y), x, 0] });

      // if (first && ref.current) {
      //   console.log(ref.current.rotation);

      // }
      // set({ rotation: [y, x, 0] })
    },
    { pointerEvents: true }
  );

  return (
    <>
      <a.group {...bindDrag()} rotation={rotation} ref={ref}>
        <Snake size={size} />
        <mesh>
          <boxBufferGeometry
            attach="geometry"
            args={[size, size, size, size, size, size]}
          />
          <meshPhysicalMaterial
            attach="material"
            color="black"
            roughness={0.8}
            clearcoat={0.1}
            reflectivity={0.2}
            metalness={0.3}
            transparent={true}
            opacity={0.7}
            wireframe={true}
          />
        </mesh>
        <mesh
        // geometry={smooth}
        >
          <boxBufferGeometry
            attach="geometry"
            args={[size - 1, size - 1, size - 1]}
          />
          <meshPhysicalMaterial
            attach="material"
            color="pink"
            roughness={0.8}
            clearcoat={0.1}
            reflectivity={0.2}
            metalness={0.3}
            transparent={true}
            opacity={0.7}
          />
        </mesh>
      </a.group>
    </>
  );
});

export default Cube;

function posToQuat(x: number, y: number) {
  return new three.Quaternion().setFromEuler(new three.Euler(y, x, 0, 'XYZ'));
}

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle: number) {
  return angle * (180 / Math.PI);
}
