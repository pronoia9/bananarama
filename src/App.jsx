import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

function Banana({ z }) {
  const { nodes, materials } = useGLTF('/banana.glb');
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data, setData] = useState({
    pX: THREE.MathUtils.randFloatSpread(2),
    pY: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  useFrame((state) => {
    ref.current.position.set(data.pX * width, (data.pY += 0.05), z);
    if (data.pY > height / 1.5) data.pY = -height / 1.5;
    ref.current.rotation.set((data.rX += 0.01), (data.rY += 0.004), (data.rZ += 0.005));
  });

  return <mesh ref={ref} geometry={nodes.Banana.geometry} material={materials.Skin} material-emissive='orange' />;
}

export default function App({ count = 100 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={null}>
        {Array.from({ length: count }, (_, i) => (
          <Banana key={i} z={-i} />
        ))}
        <Environment preset='sunset' />
      </Suspense>
    </Canvas>
  );
}
