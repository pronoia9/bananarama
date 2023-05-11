// Author: thesidekick (https://sketchfab.com/thesidekick)
// License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// Model: https://sketchfab.com/3d-models/banana-dda3a1f707a94c52bed79578e120937c

import { Suspense, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { Bananas, Overlay } from './components/';

export default function App() {
  const [speed, setSpeed] = useState(1);

  return (
    <>
      <Suspense fallback={null}>
        <Bananas speed={speed} />
        <FadeIn />
      </Suspense>
      <Overlay />
    </>
  );
}

const fade = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const FadeIn = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #ffd863;
  animation: ${fade} 4s normal forwards ease-in-out;
`;
