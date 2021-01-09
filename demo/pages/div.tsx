import React from 'react';
import usePinchZoom from '../../src';

export default function Div() {
  const [containerProps, contentProps] = usePinchZoom<HTMLDivElement, HTMLDivElement>();

  return (
    <section id="div">
      <h1>Anything can be zoomable</h1>
      <div className="touch-area" {...containerProps}>
        <div className="card m-3 shadow-sm" {...contentProps}>
          <div className="card-header">
            <h4 className="my-0 fw-normal">Free</h4>
          </div>
          <div className="card-body">
            <h1 className="card-title pricing-card-title">$0 <small className="text-muted">/ mo</small></h1>
            <ul className="list-unstyled mt-3 mb-4">
              <li>10 users included</li>
              <li>2 GB of storage</li>
              <li>Email support</li>
              <li>Help center access</li>
            </ul>
            <button type="button" className="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
          </div>
        </div>
      </div>
      <div>
        <a href="https://github.com/Noverish/react-use-pinch-zoom/blob/master/demo/pages/div.tsx">
          Source Code
        </a>
      </div>
    </section>
  )
}
