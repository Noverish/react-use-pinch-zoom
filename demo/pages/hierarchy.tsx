import React from 'react';
import usePinchZoom from '../../src';
import './hierarchy.css';

export default function Hierarchy() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();
  
  return (
    <section id="hierarchy">
      <h1>Hierarchy</h1>
      <p>Touch Area and Content do not need to be a direct parent-child relationship.</p>
      <div className="touch-area" {...containerProps}>
        <div>
          <div>
            <img className="content" src="./lenna-256.png" {...contentProps} />
          </div>
        </div>
      </div>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/hierarchy.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
