import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, Detailed, Stage } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { MathUtils } from 'three';

export default function Bananas({ speed = 1, count = 100, depth = 80 }) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    <Canvas gl={{ alpha: false, antialias: false }} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
      <color args={['#FBE195']} attach='background' />

      {/* Lights */}
      {/* <ambientLight intensity={0.2} /> */}
      <pointLight position={[10, 20, 10]} penumbra={1} intensity={3} color='orange' />

      {/* Objects */}
      {Array.from({ length: count }, (_, i) => (
        <Banana key={i} index={i} pZ={(-i / count) * depth - 20} speed={speed} />
      ))}

      {/* Effects */}
      <EffectComposer multisampling={0}>
        <DepthOfField target={[0, 0, depth / 2]} focalLength={0.4} bokehScale={14} height={700} />
      </EffectComposer>

      {/* <Environment preset='sunset' /> */}
      <Stage environment={{ files: 'venice_sunset_1k.hdr' }} center />
    </Canvas>
  );
}

function Banana({ index, pZ, speed }) {
  const ref = useRef();
  const { viewport, camera } = useThree(); // getCurrentViewport is a helper that calculates the size of the viewport
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, pZ]);
  const { nodes, materials } = useGLTF('/banana.glb');

  // Local component state, it is safe to mutate because it's fixed data
  const [data] = useState({
    pX: MathUtils.randFloatSpread(2),
    pY: MathUtils.randFloatSpread(height * 2), // Randomly distributing the objects along the vertical. This gives us a random value between -1 and 1, we will multiply it with the viewport width
    spin: MathUtils.randFloat(8, 12), // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    rX: Math.random() * Math.PI, // Some random rotations, Math.PI represents 360 degrees in radian
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state, delta) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // Delta is the time between this frame and the previous, can use it to be independent of the screens refresh rate
    ref.current.position.set(data.pX * width, (data.pY += delta * speed), pZ);

    // Rotate the object around
    ref.current.rotation.set(
      (data.rX += delta / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += delta / data.spin)
    );

    // If they're too far up, set them back to the bottom
    if (data.pY > height * (index === 0 ? 4 : 1)) data.pY = -(height * (index === 0 ? 4 : 1));
  });

  // Using drei's detailed is a nice trick to reduce the vertex count because
  // Don't need high resolution for objects in the distance. Model contains 3 decimated meshes
  return (
    <Detailed ref={ref} distances={[0, 65, 80]}>
      <mesh geometry={nodes.banana_high.geometry} material={materials.skin} material-emissive='#ff9f00' />
      <mesh geometry={nodes.banana_mid.geometry} material={materials.skin} material-emissive='#ff9f00' />
      <mesh geometry={nodes.banana_low.geometry} material={materials.skin} material-emissive='#ff9f00' />
    </Detailed>
  );
}
