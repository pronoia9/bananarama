import { useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

function Box({ z }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data, setData] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });

  useFrame((state) => {
    ref.current.position.set(data.x * width, (data.y += 0.1), z);
    if (data.y > height / 1.5) data.y = -height / 1.5;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color='orange' />
    </mesh>
  );
}

function Banana(props) {
  const { scene } = useGLTF('/banana.glb');

  return <primitive object={scene} {...props} />;
}

export default function App({ count = 10 }) {
  return (
    <Canvas>
      {/* {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))} */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <Suspense fallback={null}>
        <Banana scale={0.5} />
        <Environment preset='sunset' />
      </Suspense>
    </Canvas>
  );
}
