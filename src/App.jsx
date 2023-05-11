import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

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

export default function App({ count = 10 }) {
  return (
    <Canvas>
      {Array.from({ length: count }, (_, i) => (
        <Box key={i} z={-i} />
      ))}
    </Canvas>
  );
}
