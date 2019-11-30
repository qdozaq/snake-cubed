import React, { useRef, useEffect, useState } from 'react';
import * as three from 'three';
import { SubdivisionModifier } from 'three/examples/jsm/modifiers/SubdivisionModifier';
import { useDrag } from 'react-use-gesture';
import { useSpring, a, } from 'react-spring/three';

type Props = {
  size: number;
  onChange: (e: any) => void;
};


const modifier = new SubdivisionModifier(2);
const segments = 3;
const cubeGeometry = new three.BoxBufferGeometry(1, 1, 1, segments, segments, segments);
// const smooth = cubeGeometry;
const smooth = modifier.modify(cubeGeometry);

const Cube = ({ size, onChange }: Props) => {
  const ref = useRef<three.Mesh>();
  const [snakePos, setSnakePos] = useState({ x: 0, y: 0, z: size / 2 })
  const snakeRef = useRef<three.Mesh>();

  // set scall on init
  useEffect(() => {
    smooth.scale(size, size, size);
  }, []);

  const move = (e: KeyboardEvent) => {
    console.log(e.key);
    if (snakeRef.current) {
      switch (e.key.toUpperCase()) {
        case 'W':
        case 'ARROWUP':
          setSnakePos(prev => ({ ...prev, y: prev.y + 1 }))
          break;
        case 'S':
        case 'ARROWDOWN':
          setSnakePos(prev => ({ ...prev, y: prev.y - 1 }))
          break;
        case 'D':
        case 'ARROWRIGHT':
          setSnakePos(prev => ({ ...prev, x: prev.x + 1 }))
          break;
        case 'A':
        case 'ARROWLEFT':
          setSnakePos(prev => ({ ...prev, x: prev.x - 1 }))
          break;
        default:
      }

    }
  }

  useEffect(() => {
    window.addEventListener("keydown", move as any);
    return () => { window.removeEventListener("keydown", move) };
  });

  const [{ rotation }, set] = useSpring(() => ({
    rotation: [0, 0, 0]
  }));

  const dampen = 100;
  const bindDrag = useDrag(
    ({
      offset: [ox, oy],
    }) => {
      const [x, y] = [ox / dampen, oy / dampen];
      onChange({ x, y });
      set({ rotation: [Math.abs(y) <= 1 ? y : Math.sign(y), x, 0] });
    },
    { pointerEvents: true }
  );

  const snakeSegmentSize = (size / 3) - .05;
  return (
    <>
      <a.group
        ref={ref}
        {...bindDrag()}
        rotation={rotation}
      >
        <mesh ref={snakeRef}
          position={[snakePos.x, snakePos.y, snakePos.z]}
        >
          <boxBufferGeometry attach="geometry" args={[snakeSegmentSize, snakeSegmentSize, snakeSegmentSize]} />
          <meshNormalMaterial attach="material" />
        </mesh>
        <mesh>
          <boxBufferGeometry attach="geometry" args={[size, size, size, segments, segments, segments]} />
          <meshPhysicalMaterial attach="material"
            color="black"
            roughness={.8}
            clearcoat={.1}
            reflectivity={.2}
            metalness={.3}
            transparent={true}
            opacity={.7}
            wireframe={true}
          />
        </mesh>
        <mesh
        // geometry={smooth}
        >
          <boxBufferGeometry attach="geometry" args={[size - .1, size - .1, size - .1]} />
          <meshPhysicalMaterial attach="material"
            color="pink"
            roughness={.8}
            clearcoat={.1}
            reflectivity={.2}
            metalness={.3}
            transparent={true}
            opacity={.7}
          />
        </mesh>
      </a.group>
    </>
  )
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
