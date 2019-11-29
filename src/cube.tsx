import React, { useRef, useState, useEffect } from 'react';
import * as three from 'three';
import { useFrame } from 'react-three-fiber';

type Props = {
  size: number;
  onChange: (e: any) => void;
};

const Cube = ({ size, onChange }: Props) => {
  const [point, setPoint] = useState<three.Vector3>();
  const [click, setClick] = useState(false);
  const ref = useRef<three.Mesh>();

  // useFrame(() => {
  //   if (ref.current && point) {
  //     // ref.current.rotation.x = ref.current.rotation.y += 0.01;
  //     ref.current.rotation.x += point.x;
  //     ref.current.rotation.y += point.y;
  //     ref.current.rotation.z += point.z;
  //     // onChange(ref.current.rotation);
  //     onChange(point);
  //   }
  // });

  const thing = 10;

  useEffect(() => {
    if (ref.current && point && click) {
      // ref.current.rotation.x = ref.current.rotation.y += 0.01;
      // ref.current.rotation.x += point.x / thing;
      // ref.current.rotation.y += point.y / thing;
      // ref.current.rotation.z += point.z / thing;
      // onChange(ref.current.rotation);
      onChange(point);
      const deltaRotationQuaternion = new three.Quaternion().setFromEuler(
        new three.Euler(
          toRadians(point.y * 1),
          toRadians(point.x * 1),
          0,
          'XYZ'
        )
      );

      ref.current.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        ref.current.quaternion
      );
    }
  }, [point]);

  return (
    <mesh
      ref={ref}
      onPointerMove={e => {
        // onChange(e.point);
        setPoint(e.point);
      }}
      onPointerDown={() => {
        !click && setClick(true);
      }}
      onPointerUp={() => {
        click && setClick(false);
      }}
    >
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};

export default Cube;

function toRadians(angle: number) {
  return angle * (Math.PI / 180);
}
