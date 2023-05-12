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
      <Speed>
        <input type='range' min='0' max='10' value={speed} step='1' onChange={(e) => set(e.target.value)} />
      </Speed>
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

const Speed = styled.div`
  position: absolute;
  bottom: 50%;
  right: 5vw;
  font-weight: 400;
  line-height: 1em;
  letter-spacing: -0.01em;
  font-size: 12px;
  transform: rotate(90deg) translate3d(50%, 0, 0);
  transform-origin: 100% 50%;
  color: 'black';
`;
