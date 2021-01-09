import React from 'react';
import usePinchZoom from '../../src';

export default function Default() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  return (
    <section id="default">
      <h1>Default</h1>
      <div className="touch-area d-inline-block" {...containerProps}>
        <img className="content" src="./lenna-256.png" {...contentProps} />
      </div>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/default.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
