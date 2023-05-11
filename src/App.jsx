// Author: thesidekick (https://sketchfab.com/thesidekick)
// License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
// Model: https://sketchfab.com/3d-models/banana-dda3a1f707a94c52bed79578e120937c

import { Suspense, useState } from 'react';

import { Bananas, Overlay } from './components/';

export default function App() {
  const [speed, setSpeed] = useState(1);

  return (
    <>
      <Suspense fallback={null}>
        <Bananas speed={speed} />
      </Suspense>
      <Overlay />
    </>
  );
}
