import React from 'react';
import usePinchZoom from '../../src';

export default function SizeDiff() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLImageElement>();

  return (
    <section id="size-diff">
      <h1>Container and Content Size are Different</h1>
      <p>You can pinch zoom outside of image</p>
      <div className="touch-area d-flex align-items-center justify-content-center" {...containerProps}>
        <img className="content" src="./lenna-256.png" {...contentProps} />
      </div>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/size-diff.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
