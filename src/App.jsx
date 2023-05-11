import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { EffectComposer, DepthOfField } from '@react-three/postprocessing';

export default function App({ count = 100, depth = 80 }) {
  return (
    <Canvas gl={{ alpha: false }} camera={{ near: 0.01, far: 110, fov: 30 }}>
      <color args={['#FFE47D']} attach='background' />

      {/* Lights */}
      {/* <ambientLight intensity={0.2} /> */}
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <Suspense fallback={null}>
        {/* Objects */}
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} pZ={(-i / count) * depth - 20} />
        ))}
        {/* Effects */}
        <EffectComposer>
          <DepthOfField target={[0, 0, depth / 2]} focalLength={0.5} bokehScale={11} height={700} />
        </EffectComposer>
        <Environment preset='sunset' />
      </Suspense>
    </Canvas>
  );
}

function Banana({ pZ }) {
  const { nodes, materials } = useGLTF('/banana.glb');
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, pZ]);

  const [data, setData] = useState({
    pX: THREE.MathUtils.randFloatSpread(2),
    pY: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.position.set(data.pX * width, (data.pY += 0.025), pZ);
    if (data.pY > height) data.pY = -height;
    ref.current.rotation.set((data.rX += 0.001), (data.rY += 0.001), (data.rZ += 0.001));
  });

  return <mesh ref={ref} geometry={nodes.Banana.geometry} material={materials.Skin} material-emissive='orange' />;
}
