import React, { useCallback, useState } from 'react';
import usePinchZoom, { Transform } from '../../src';

export default function OnTransform() {
  const [transform, setTransform] = useState({
    zoomFactor: 1.0,
    translate: {
      x: 0.0,
      y: 0.0
    }
  } as Transform);

  const onTransform = useCallback((transform: Transform) => {
    setTransform(transform);
  }, []);

  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>({
    onTransform: onTransform
  });
  
  return (
    <section id="on-transform">
      <h1>Transform Callback</h1>
      <div className="touch-area d-inline-block" {...containerProps}>
        <img className="content" src="./lenna-256.png" {...contentProps} />
      </div>
      <p>zoomScale: {transform.zoomFactor}</p>
      <p>translate: (x: {transform.translate.x}, y: {transform.translate.y})</p>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/on-transform.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
