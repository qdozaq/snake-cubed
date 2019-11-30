import React, { useRef, useState, useEffect } from 'react';
import * as three from 'three';
import { useDrag } from 'react-use-gesture';
import { useSpring, a, interpolate } from 'react-spring/three';

type Props = {
  size: number;
  onChange: (e: any) => void;
};

const Cube = ({ size, onChange }: Props) => {
  const ref = useRef<three.Mesh>();

  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const [{ qx, qy }, setQuat] = useSpring(() => ({
    qx: 0,
    qy: 0
  }));

  const dampen = 100;
  const bindDrag = useDrag(
    ({ offset: [ox, oy], last, vxvy: [vx, vy], xy, down, delta, ...props }) => {
      set({ rotation: [oy / dampen, ox / dampen, 0] });

      // setQuat({ qx: delta[0], qy: delta[1] });

      // if (ref.current) {
      //   var deltaRotationQuaternion = new three.Quaternion().setFromEuler(
      //     new three.Euler(
      //       toRadians(delta[1] * 1),
      //       toRadians(delta[0] * 1),
      //       0,
      //       'XYZ'
      //     )
      //   );

      //   ref.current.quaternion.multiplyQuaternions(
      //     deltaRotationQuaternion,
      //     ref.current.quaternion
      //   );
      // }

      onChange({
        down,
        xy,
        oy,
        ox,
        vy,
        vx,
        props,
        cubeRotation:
          ref.current && ref.current.rotation.toArray().map(toDegrees)
      });
    },
    { pointerEvents: true }
  );

  return (
    <a.mesh
      ref={ref}
      {...bindDrag()}
      rotation={rotation}
      // quaternion={interpolate([qx, qy], (qx, qy) => {
      //   if (ref.current) {
      //     var deltaRotationQuaternion = new three.Quaternion().setFromEuler(
      //       new three.Euler(toRadians(qy * 1), toRadians(qx * 1), 0, 'XYZ')
      //     );
      //     return deltaRotationQuaternion.multiplyQuaternions(
      //       deltaRotationQuaternion,
      //       ref.current.quaternion
      //     );
      //   }
      //   return new three.Quaternion();
      // })}
    >
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  );
};

export default Cube;

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle: number) {
  return angle * (180 / Math.PI);
}
