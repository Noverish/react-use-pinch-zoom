import React from 'react';
import usePinchZoom from '../../src';

export default function Default() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>({
    maxZoomScale: 2.0,
    minZoomScale: 0.5,
  });
  
  return (
    <section id="zoom-scale">
      <h1>ZoomScale Option</h1>
      <h3>(max: 2x, min: 0.5x)</h3>
      <div className="touch-area d-inline-block" {...containerProps}>
        <img className="content" src="./lenna-256.png" {...contentProps} />
      </div>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/zoom-scale.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
