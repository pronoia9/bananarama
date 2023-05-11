import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';
import { MathUtils } from 'three';

export default function Bananas({ speed = 1, count = 100, depth = 80 }) {
  return (
    // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
    <Canvas gl={{ alpha: false, antialias: false }} camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
      <color args={['#FFE47D']} attach='background' />

      {/* Lights */}
      {/* <ambientLight intensity={0.2} /> */}
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <Suspense fallback={null}>
        {/* Objects */}
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} index={i} pZ={(-i / count) * depth - 20} speed={speed} />
        ))}

        {/* Effects */}
        <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, depth / 2]} focalLength={0.4} bokehScale={14} height={700} />
        </EffectComposer>

        <Environment preset='sunset' />
      </Suspense>
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
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    ref.current.position.set(data.pX * width, (data.pY += 0.025), pZ);
    if (data.pY > height) data.pY = -height;
    ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001));
  });

  return <mesh ref={ref} geometry={nodes.Banana.geometry} material={materials.Skin} material-emissive='orange' />;
}
