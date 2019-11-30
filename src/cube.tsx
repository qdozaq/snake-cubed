import React, { useRef, useState, useEffect } from 'react';
import * as three from 'three';
import { useDrag } from 'react-use-gesture';
import { useSpring, a, interpolate } from 'react-spring/three';
import { config } from 'react-spring';
import { on } from 'cluster';

type Props = {
  size: number;
  onChange: (e: any) => void;
};

const Cube = ({ size, onChange }: Props) => {
  const ref = useRef<three.Mesh>();
  const [initialQuat, setInitialQuat] = useState<three.Quaternion>(
    new three.Quaternion()
  );

  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const [{ qx, qy }, setQuat] = useSpring(() => ({
    qx: 0,
    qy: 0
  }));

  const [{ x, y, z, w }, setQuat2] = useSpring(() => ({
    x: 0,
    y: 0,
    z: 0,
    w: 1
  }));

  const dampen = 100;
  const bindDrag = useDrag(
    ({
      offset: [ox, oy],
      first,
      vxvy: [vx, vy],
      xy,
      down,
      delta: [dx, dy],
      initial: [ix, iy],
      movement: [mx, my]
    }) => {
      // set({ rotation: [oy / dampen, ox / dampen, 0] });
      if (first && ref.current) {
        console.log('setting');
        setInitialQuat(ref.current.quaternion);
      }
      setQuat({ qx: mx / dampen, qy: my / dampen });
      onChange({
        ix,
        iy,
        mx,
        my,
        ox,
        oy
      });
      // if (ref.current) {
      //   const deltaRotationQuaternion = new three.Quaternion().setFromEuler(
      //     new three.Euler(toRadians(delta[1]), toRadians(delta[0]), 0, 'XYZ')
      //   );

      //   const cur = ref.current.quaternion.clone();

      //   // deltaRotationQuaternion.multiplyQuaternions(
      //   //   cur,
      //   //   deltaRotationQuaternion
      //   // );

      //   ref.current.quaternion.multiplyQuaternions(
      //     deltaRotationQuaternion,
      //     ref.current.quaternion
      //   );

      //   const test = deltaRotationQuaternion
      //     .multiplyQuaternions(cur, deltaRotationQuaternion)
      //     .equals(ref.current.quaternion);
      //   console.log(test);
      // const q = deltaRotationQuaternion.toArray();
      // ref.current.quaternion.set(q[0], q[1], q[3], q[4]);
      // onChange(q);

      // setQuat2({ x: q[0], y: q[1], z: q[2], w: q[3] });
      // }
      // onChange({
      //   down,
      //   xy,
      //   oy,
      //   ox,
      //   vy,
      //   vx,
      //   props,
      //   cubeRotation:
      //     ref.current && ref.current.rotation.toArray().map(toDegrees),
      //   cubQuate: ref.current && ref.current.quaternion.toArray()
      // });
    },
    { pointerEvents: true }
  );

  return (
    <>
      <a.mesh
        ref={ref}
        {...bindDrag()}
        // quaternion={interpolate(
        //   [x, y, z, w],
        //   (x, y, z, w) => new three.Quaternion(x, y, z, w)
        // )}
        // rotation={rotation}
        quaternion={interpolate([qx, qy], (qx, qy) => {
          const q = posToQuat(qx, qy);
          return initialQuat.slerp(q, 1);
        })}
        // quaternion={interpolate([qx, qy], (qx, qy) => {
        //   onChange({
        //     ref: ref.current && ref.current.quaternion.toArray(),
        //     qx,
        //     qy
        //   });
        //   if (ref.current) {
        //     const temp = new three.Quaternion();
        //     const deltaRotationQuaternion = new three.Quaternion().setFromEuler(
        //       new three.Euler(toRadians(qy), toRadians(qx), 0, 'XYZ')
        //     );

        //     const cur = ref.current.quaternion.clone();
        //     deltaRotationQuaternion.multiplyQuaternions(
        //       deltaRotationQuaternion,
        //       cur
        //     );
        //     three.Quaternion.slerp(cur, deltaRotationQuaternion, temp, 0.2);
        //     return temp;
        //   }
        //   return new three.Quaternion();
        // })}
      >
        <boxBufferGeometry attach="geometry" args={[size, size, size]} />
        <meshNormalMaterial attach="material" />
      </a.mesh>
    </>
  );
};

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
