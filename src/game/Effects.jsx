// import React, { useRef, useMemo, useEffect } from 'react';
// import { useThree, extend, useFrame } from 'react-three-fiber';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
// import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
// import { Vector2 } from 'three';

// extend({ EffectComposer, UnrealBloomPass, ShaderPass, RenderPass, SSAOPass });

// export default () => {
//   const composer = useRef();
//   const { scene, gl, size, camera } = useThree();
//   const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);

//   useEffect(() => composer.current.setSize(size.width, size.height), [size]);
//   useFrame(() => composer.current.render(), 1);

//   return (
//     <effectComposer ref={composer} args={[gl]}>
//       <renderPass attachArray="passes" scene={scene} camera={camera} />
//       <sSAOPass
//         attachArray="passes"
//         args={[scene, camera]}
//         kernelRadius={0.6}
//         maxDistance={0.03}
//       />
//       <unrealBloomPass attachArray="passes" args={[aspect, 1, 1, 0.6]} />
//       <shaderPass
//         attachArray="passes"
//         args={[FXAAShader]}
//         material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
//         renderToScreen
//       />
//     </effectComposer>
//   );
// };
